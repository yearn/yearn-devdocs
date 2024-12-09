import React, { useState, useContext, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './shadcn/tabs/tabs'
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from './shadcn/select/select'
import Input from './shadcn/input/input'
import { veYfiGauges, yfiContracts } from '../ethereum/constants'
import * as ABIs from '../ethereum/ABIs'
import { getAddress, getContract, formatEther, formatUnits } from 'viem'
import { PublicClientContext } from '../context/PublicClientContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './shadcn/card/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import styles from '../css/veYFI-calc.module.css'
import Label from './shadcn/label/label'
import { Button } from './shadcn/button/button'

type GaugeData = {
  name: string
  address: string
  totalAssets: number
}

// ------------------------ Helper Functions ------------------------

async function fetchVeYFISupply(publicClient: any) {
  if (!publicClient) return 0
  const contract = getContract({
    address: getAddress(yfiContracts.veYfiAddress),
    abi: ABIs.yfiTokenABI,
    client: publicClient,
  })
  // @ts-ignore: Ignore TypeScript error for totalAssets
  const supply = await contract.read.totalSupply().catch(() => undefined)
  return supply ? Number(formatEther(supply)) : 0
}

async function fetchAllGaugeData(publicClient: any) {
  if (!publicClient) return []
  const gaugeDataPromises = veYfiGauges.map(async (gauge) => {
    const contract = getContract({
      address: getAddress(gauge.address),
      abi: ABIs.yGaugeV2ABI,
      client: publicClient,
    })
    // @ts-ignore: Ignore TypeScript error for totalAssets
    const totalAssets = await contract.read.totalAssets().catch(() => undefined)
    return {
      name: gauge.name,
      address: gauge.address,
      totalAssets: totalAssets
        ? Number(formatUnits(totalAssets, gauge.underlyingDecimals))
        : 0,
    }
  })
  return Promise.all(gaugeDataPromises)
}

function calculateBoostFromDeposit(
  veYFIAmount: number,
  veYfiTotalSupply: number,
  totalDeposited: number,
  amountDepositedInGauge: number
) {
  const veRatio = veYfiTotalSupply ? veYFIAmount / veYfiTotalSupply : 0
  const boost =
    1 + veRatio * 9 + (totalDeposited * veRatio * 9) / amountDepositedInGauge
  return Math.min(Math.max(boost, 1), 10)
}

function calculateBoostFromVeYFI(
  veYFIAmount: number,
  veYfiTotalSupply: number,
  totalDeposited: number,
  depositAmount: number
) {
  const veRatio = veYfiTotalSupply ? veYFIAmount / veYfiTotalSupply : 0
  const boost = 1 + veRatio * 9 + (totalDeposited * veRatio * 9) / depositAmount
  return Math.min(boost, 10)
}

function findDynamicRangeForDeposit(calcFunc: (x: number) => number): {
  start: number
  end: number
} {
  let amountDeposited = 0.01
  const incrementFactor = 1.2
  let lastBoost = 10
  const start = 0
  let end = amountDeposited

  const minStepSize = 1e-6
  const minBoostChange = 0.05

  while (true) {
    const boost = calcFunc(amountDeposited)
    if (boost <= 1.1) {
      end = amountDeposited

      break
    }
    const boostChange = Math.abs(boost - lastBoost)
    if (boost < 10 && boostChange < minBoostChange) {
      end = amountDeposited
      break
    }
    lastBoost = boost
    amountDeposited *= incrementFactor

    if (amountDeposited - end < minStepSize) {
      end = amountDeposited
      break
    }
  }

  return { start, end }
}

function generateLinearData(
  start: number,
  end: number,
  points: number,
  calcFunc: (x: number) => number,
  xKey: string
) {
  const step = (end - start) / (points - 1)
  const data: { [key: string]: number; boost: number }[] = []
  for (let i = 0; i < points; i++) {
    const xVal = start + i * step
    const boost = calcFunc(xVal)
    if (!isNaN(boost) && isFinite(boost)) {
      data.push({ [xKey]: parseFloat(xVal.toFixed(5)), boost })
    }
  }
  return data
}

function findDynamicRangeForVeYFI(calcFunc: (x: number) => number): {
  start: number
  end: number
} {
  let veYFIVal = 0.001
  const stepFactor = 1.2
  let maxBoostVeYFI: number | null = null

  for (let i = 0; i < 1000; i++) {
    const boost = calcFunc(veYFIVal)
    if (boost >= 10 && maxBoostVeYFI === null) {
      maxBoostVeYFI = veYFIVal
    }
    if (boost <= 1.5 && maxBoostVeYFI !== null) break
    veYFIVal *= stepFactor
  }

  if (maxBoostVeYFI === null) maxBoostVeYFI = veYFIVal
  return { start: 0.01, end: maxBoostVeYFI * 1.3 }
}

// ------------------------ Main Component ------------------------

const VeYFICalculator: React.FC = () => {
  const publicClient = useContext(PublicClientContext)
  const [veYfiTotalSupply, setVeYfiTotalSupply] = useState<number>(0)
  const [gaugeData, setGaugeData] = useState<GaugeData[]>([])
  const [veYFIAmount, setVeYFIAmount] = useState<number | string>('')
  const [selectedVault, setSelectedVault] = useState<string>('')
  const [depositAmount, setDepositAmount] = useState<number | string>('')
  const [showChart1, setShowChart1] = useState<boolean>(false)
  const [showChart2, setShowChart2] = useState<boolean>(false)
  const [chart1Data, setChart1Data] = useState<any[]>([])
  const [chart2Data, setChart2Data] = useState<any[]>([])

  const totalDeposited =
    gaugeData.find((g) => g.name === selectedVault)?.totalAssets || 0

  useEffect(() => {
    const fetchData = async () => {
      const supply = await fetchVeYFISupply(publicClient)
      setVeYfiTotalSupply(supply || 0)

      const gauges = await fetchAllGaugeData(publicClient)
      setGaugeData(Array.isArray(gauges) ? gauges : [])
    }
    fetchData()
  }, [publicClient])

  const handleVeYFIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') {
      setVeYFIAmount('')
      return
    }
    if (!isNaN(Number(val)) && Number(val) <= veYfiTotalSupply) {
      setVeYFIAmount(Number(val))
    }
  }

  const handleDepositAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value
    if (val === '') {
      setDepositAmount('')
      return
    }
    if (!isNaN(Number(val))) {
      setDepositAmount(Number(val))
    }
  }

  const handleCalculateButton1Click = () => {
    const veYFIVal = Number(veYFIAmount) || 0
    const calcFunc = (amountDepositedInGauge: number) =>
      calculateBoostFromDeposit(
        veYFIVal,
        veYfiTotalSupply,
        totalDeposited,
        amountDepositedInGauge
      )

    const newRange = findDynamicRangeForDeposit(calcFunc)
    const data = generateLinearData(
      newRange.start,
      newRange.end,
      500,
      calcFunc,
      'amountDepositedInGauge'
    )
    setChart1Data(data)
    setShowChart1(true)
  }

  const handleCalculateButton2Click = () => {
    const depositVal = Number(depositAmount) || 0
    const calcFunc = (veYfiVar: number) =>
      calculateBoostFromVeYFI(
        veYfiVar,
        veYfiTotalSupply,
        totalDeposited,
        depositVal
      )

    const newRange = findDynamicRangeForVeYFI(calcFunc)
    const data = generateLinearData(
      newRange.start,
      newRange.end,
      500,
      calcFunc,
      'veYFIVar'
    )
    setChart2Data(data)
    setShowChart2(true)
  }

  const BoostChart = ({
    data,
    xVar,
    dataKey,
  }: {
    data: any[]
    xVar: string
    dataKey: string
  }) => {
    const xValues = data.map((d) => d[dataKey])
    const maxX = Math.max(...xValues)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--chart-grid-color))"
          />
          <XAxis
            dataKey={dataKey}
            label={{ value: xVar, position: 'insideBottom', offset: -10 }}
            type="number"
            domain={[0, 'dataMax']}
            tickCount={10}
            tickFormatter={(tick) => {
              if (maxX <= 5) return tick.toFixed(2)
              if (maxX <= 10) return tick.toFixed(1)
              return Math.round(tick).toLocaleString()
            }}
          />
          <YAxis
            dataKey="boost"
            label={{
              value: 'Boost',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
            }}
            type="number"
            tickCount={12}
            domain={[0, 12]}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="boost"
            stroke="var(--ifm-color-primary)"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div style={{ width: '800px' }}>
      <Tabs defaultValue="tab1">
        <TabsList aria-label="VeYFI Calculator Tabs">
          <TabsTrigger value="tab1">Calculate from veYFI</TabsTrigger>
          <TabsTrigger value="tab2">Calculate from Gauge Deposit</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost by entered veYFI</CardTitle>
              <CardDescription>
                Pick Gauge and enter a veYFI amount to see your boost
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* <Label>Select Gauge</Label> */}
                  <Select
                    value={selectedVault}
                    onValueChange={setSelectedVault}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gauge" />
                    </SelectTrigger>
                    <SelectContent>
                      {gaugeData.map((vault) => (
                        <SelectItem key={vault.name} value={vault.name}>
                          {vault.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* <Label>Enter Amount of veYFI</Label> */}
                  <Input
                    type="number"
                    value={veYFIAmount}
                    onChange={handleVeYFIChange}
                    placeholder="Enter amount of veYFI"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className={styles.CardFooter}>
              <Button
                onClick={handleCalculateButton1Click}
                disabled={
                  !selectedVault || isNaN(Number(veYFIAmount)) || !veYFIAmount
                }
              >
                Calculate
              </Button>
            </CardFooter>
            {showChart1 && (
              <div style={{ paddingBottom: '1rem' }}>
                <BoostChart
                  data={chart1Data}
                  xVar="Amount Deposited in Gauge"
                  dataKey="amountDepositedInGauge"
                />
              </div>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost From Deposit Amount</CardTitle>
              <CardDescription>
                Pick Gauge and enter the amount you want to deposit
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* <Label>Select Gauge</Label> */}
                  <Select
                    value={selectedVault}
                    onValueChange={setSelectedVault}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gauge" />
                    </SelectTrigger>
                    <SelectContent>
                      {gaugeData.map((vault) => (
                        <SelectItem key={vault.name} value={vault.name}>
                          {vault.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* <Label>Enter Amount to Deposit</Label> */}
                  <Input
                    type="number"
                    value={depositAmount}
                    onChange={handleDepositAmountChange}
                    placeholder="Enter amount to deposit"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className={styles.CardFooter}>
              <Button
                onClick={handleCalculateButton2Click}
                disabled={
                  !selectedVault ||
                  isNaN(Number(depositAmount)) ||
                  !depositAmount
                }
              >
                Calculate
              </Button>
            </CardFooter>
            {showChart2 && (
              <div style={{ paddingBottom: '1rem' }}>
                <BoostChart
                  data={chart2Data}
                  xVar="veYFI Amount"
                  dataKey="veYFIVar"
                />
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default VeYFICalculator
