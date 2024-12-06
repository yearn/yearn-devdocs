import React, { useState, useContext, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './shadcn/tabs/tabs'
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './shadcn/select/select'
import Input from './shadcn/input/input'
// import { Chart } from 'some-chart-library'; // Replace with the actual chart library
// import { ContractDataContext } from '../context/ContractDataContext'
import { veYfiGauges, yfiContracts } from '../ethereum/constants'
import * as ABIs from '../ethereum/ABIs'
import { getAddress, getContract, formatEther, formatUnits } from 'viem'
import { PublicClientContext } from '../context/PublicClientContext'
import { VeYfiGauge } from '../ethereum/types'
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

type gaugeData = {
  name: string
  address: string
  totalAssets: number
}

const VeYFICalculator: React.FC = () => {
  // const data = useContext(ContractDataContext)
  const publicClient = useContext(PublicClientContext)
  // State for the amount of veYFI owned
  const [veyfiTotalSupply, setVeyfiTotalSupply] = useState<number>(0)
  const [gaugeData, setGaugeData] = useState<gaugeData[]>([])
  const [veYFIAmount, setVeYFIAmount] = useState<number>(0)
  // State for the selected vault
  const [selectedVault, setSelectedVault] = useState<string>('')
  const [depositAmount, setDepositAmount] = useState<number>(0)
  const [isUnderlying, setIsUnderlying] = useState<boolean>(true)
  const [withVeYfichartData, setWithVeYfiChartData] = useState<
    { amountDepositedInGauge: number; boost: number }[]
  >([])
  const [showChart1, setShowChart1] = useState<boolean>(false)
  const [showChart2, setShowChart2] = useState<boolean>(false)

  const fetchVeYfiSupply = async (yfiContracts) => {
    if (publicClient) {
      const contract = getContract({
        address: getAddress(yfiContracts.veYfiAddress),
        abi: ABIs.yfiTokenABI,
        client: publicClient,
      })
      const veYFITotalSupply = await contract.read.totalSupply().catch(() => {
        console.warn('veYFITotalSupply not found')
        return undefined
      })
      let formattedVeYFITotalSupply = 0
      if (veYFITotalSupply) {
        formattedVeYFITotalSupply = Number(formatEther(veYFITotalSupply))
      }
      return formattedVeYFITotalSupply
    }
  }

  const fetchGaugeData = async (veYfiGauges) => {
    if (publicClient) {
      const gaugeDataPromises = veYfiGauges.map(async (gauge) => {
        const contract = getContract({
          address: getAddress(gauge.address),
          abi: ABIs.yGaugeV2ABI,
          client: publicClient,
        })
        const totalAssets = await contract.read.totalAssets().catch(() => {
          console.warn(`totalAssets not found for gauge ${gauge.name}`)
          return undefined
        })
        return {
          name: gauge.name,
          address: gauge.address,
          totalAssets: totalAssets
            ? Number(formatUnits(totalAssets, gauge.underlyingDecimals))
            : 0,
        }
      })

      const resolvedGaugeData = await Promise.all(gaugeDataPromises)
      return resolvedGaugeData
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const formattedVeYFITotalSupply = await fetchVeYfiSupply(yfiContracts)
      setVeyfiTotalSupply(formattedVeYFITotalSupply || 0)
      console.log('veYFITotalSupply', formattedVeYFITotalSupply)

      const resolvedGaugeData = await fetchGaugeData(veYfiGauges)
      setGaugeData(Array.isArray(resolvedGaugeData) ? resolvedGaugeData : []) // Ensure resolvedGaugeData is an array
      console.log('gaugeData', resolvedGaugeData)
    }
    fetchData()
  }, [publicClient])

  // Handle change in veYFI amount input
  const handleVeYFIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeYFIAmount(Number(e.target.value))
  }

  // Handle change in selected vault
  const handleVaultChange = (value: string) => {
    // Modified to accept string value
    setSelectedVault(value) // Updated to use value directly
  }

  // Handle change in deposit amount input
  const handleDepositAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepositAmount(Number(e.target.value))
  }

  // Fetch data based on the selected vault
  //   const pricePerShare = getPricePerShare(selectedVault);
  const totalDeposited =
    gaugeData.find((gauge) => gauge.name === selectedVault)?.totalAssets || 0

  const calculateBoost1 = (amountDepositedVar: number): number => {
    const term1 = 1
    const term2 = (veYFIAmount / veyfiTotalSupply) * 9
    const term3 =
      (totalDeposited * (veYFIAmount / veyfiTotalSupply) * 9) /
      amountDepositedVar
    const boost = term1 + term2 + term3
    return Math.min(Math.max(boost, 1), 10) // Clamp Boost between 1 and 10
  }

  const calculateBoost2 = (veYFIAmount: number): number => {
    const term1 = 1
    const term2 = (veYFIAmount / veyfiTotalSupply) * 9
    const term3 =
      (totalDeposited * (veYFIAmount / veyfiTotalSupply) * 9) / depositAmount
    const boost = term1 + term2 + term3
    return Math.min(boost, 10) // Clamp Boost to a maximum of 10
  }

  // Dynamically determine the range
  const findDynamicRange1 = (): { start: number; end: number } => {
    let amountDepositedInGauge = 0.01
    const incrementFactor = 1.2
    let lastBoost = 10
    let start = 0
    let end = amountDepositedInGauge

    while (true) {
      const boost = calculateBoost1(amountDepositedInGauge)
      console.log('boost', boost)
      //   if (boost < 10 && lastBoost === 10) start = amountDepositedInGauge
      if (boost <= 1.5) {
        end = amountDepositedInGauge
        break
      }
      lastBoost = boost
      amountDepositedInGauge *= incrementFactor
    }

    return { start, end }
  }

  // Dynamically determine the range
  const findDynamicRange2 = (): { start: number; end: number } => {
    console.warn('enter findDynamicRange2')
    let veYFIVar = 0.01
    const incrementFactor = 1.2
    let lastBoost = 10
    let start = 0
    let end = veYFIVar

    while (true) {
      console.warn('veYFIVarinFDR2', veYFIVar)
      const boost = calculateBoost2(veYFIVar)
      //   if (boost < 10 && lastBoost === 10) start = amountDepositedInGauge
      if (boost <= 1.5) {
        end = veYFIVar
        break
      }
      lastBoost = boost
      console.log('lastBoost', lastBoost)
      veYFIVar *= incrementFactor
    }
    console.log('start', start, 'end', end)
    return { start, end }
  }

  const findScaledDynamicRange = (
    stepFactor: number = 1.2,
    maxIterations: number = 1000,
    scalePastMax: number = 0.3
  ): { start: number; end: number } => {
    let veYFIAmount = 0.01 // Starting point
    let rangeStart = 0.01 // Initial x-axis minimum
    let maxBoostVeYFI: number | null = null // To find veYFIAmount where Boost reaches 10

    for (let i = 0; i < maxIterations; i++) {
      const boost = calculateBoost2(veYFIAmount)

      if (boost >= 10 && maxBoostVeYFI === null) {
        maxBoostVeYFI = veYFIAmount // Capture veYFIAmount where Boost hits 10
      }

      if (boost <= 1.5 && maxBoostVeYFI !== null) {
        break
      }

      veYFIAmount *= stepFactor
    }

    // If max Boost wasn't found, set range to a reasonable default
    if (maxBoostVeYFI === null) {
      maxBoostVeYFI = veYFIAmount
    }

    const rangeEnd = maxBoostVeYFI * (1 + scalePastMax) // Scale past max Boost point

    return { start: rangeStart, end: rangeEnd }
  }

  // Generate resampled linear data
  const generateLinearData1 = (
    start: number,
    end: number,
    points: number = 500
  ): { amountDepositedInGauge: number; boost: number }[] => {
    const step = (end - start) / (points - 1)
    const data: { amountDepositedInGauge: number; boost: number }[] = []
    for (let i = 0; i < points; i++) {
      const amountDepositedInGauge = (start + i * step).toFixed(2) // Truncate to 2 decimals
      data.push({
        amountDepositedInGauge: parseFloat(amountDepositedInGauge), // Convert back to number
        boost: calculateBoost1(parseFloat(amountDepositedInGauge)), // Ensure correct type for calculation
      })
    }
    return data
  }

  // Generate resampled linear data
  const generateLinearData2 = (
    start: number,
    end: number,
    points: number = 500
  ): { veYFIVar: number; boost: number }[] => {
    const step = (end - start) / (points - 1)
    const data: { veYFIVar: number; boost: number }[] = []
    for (let i = 0; i < points; i++) {
      const veYFIVar = start + i * step
      const boost = calculateBoost2(veYFIVar)
      data.push({ veYFIVar, boost })
    }

    return data
  }

  const [range1, setRange1] = useState({ start: 0, end: 0 })
  const [range2, setRange2] = useState({ start: 0, end: 0 })
  const [chart1Data, setChart1Data] = useState(
    generateLinearData1(range1.start, range1.end)
  )
  const [chart2Data, setChart2Data] = useState(
    generateLinearData2(range2.start, range2.end)
  )

  const handleCalculateButton1Click = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log('clicked!')
    const newRange = findDynamicRange1()
    setRange1(newRange)
    setChart1Data(generateLinearData1(newRange.start, newRange.end))
    setShowChart1(true)
  }
  const handleCalculateButton2Click = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log('clicked!')
    const newRange = findScaledDynamicRange()
    console.log('newRange', newRange)
    setRange2(newRange)
    setChart2Data(generateLinearData2(newRange.start, newRange.end))
    setShowChart2(true)
  }

  const BoostChart = ({ data, xVar }) => {
    return (
      <>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xVar}
              label={{
                value: xVar, // Modified to use xVar directly
                position: 'insideBottom',
                offset: -10,
              }}
              tickFormatter={(tick) => Math.round(tick).toString()} // Ensure the formatter returns a string
            />
            <YAxis
              dataKey="boost"
              label={{ value: 'Boost', angle: -90, position: 'insideLeft' }}
              domain={[0, 12]}
              tickCount={10}
            />
            <Tooltip />
            <Line type="monotone" dataKey="boost" stroke="black" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  }

  // Function to calculate VeYFIBalance for Mode 1
  const calculateVeYFIBalance = (
    boost: number,
    amountDepositedInGauge: number
  ) => {
    const veYFITotalSupply = veyfiTotalSupply
    const totalCurrentlyInGauge = totalDeposited
    const VeYFIBalance =
      ((amountDepositedInGauge * (boost - 1)) /
        (9 * (totalCurrentlyInGauge + amountDepositedInGauge))) *
      veYFITotalSupply
    return VeYFIBalance
  }

  // Generate data for the chart
  const chartData = /* Generate chart data based on calculations */ []

  // Generate data for Mode 1 chart
  const mode1ChartData =
    /* Generate chart data for Mode 1 based on calculations */ []

  return (
    <div style={{ width: '800px' }}>
      <Tabs defaultValue="tab1">
        {/* Modified Tabs component to use Radix UI syntax */}
        <TabsList aria-label="VeYFI Calculator Tabs">
          <TabsTrigger value="tab1">Calculate from veYFI</TabsTrigger>
          <TabsTrigger value="tab2">Calculate from Gauge Deposit</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost by entered veYFI</CardTitle>
              <CardDescription>
                Pick Gauge and enter a veYFI amount to see how much you can
                boost
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                {/* Tab 1 Content */}
                {/* Vault selector dropdown */}
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  <Label>Select Gauge</Label>
                  <Select
                    value={selectedVault}
                    onValueChange={handleVaultChange}
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
                  {/* Input field for amount of veYFI with tooltip */}
                  {/* <Tooltip content="veYFI is timelocked YFI and decays over time"> */}
                  <Label>Enter Amount of veYFI</Label>
                  <Input
                    type="number"
                    value={veYFIAmount}
                    onChange={handleVeYFIChange}
                    placeholder="Enter amount of veYFI"
                  />
                </div>
                {/* </Tooltip> */}
              </div>
            </CardContent>
            <CardFooter className={styles.CardFooter}>
              {/* <Button variant="outline">clear</Button> */}
              <Button onClick={handleCalculateButton1Click}>Calculate</Button>
            </CardFooter>
          </Card>
          {showChart1 && (
            <div style={{ paddingBottom: '1rem' }}>
              <BoostChart data={chart1Data} xVar="amountDepositedInGauge" />{' '}
            </div>
          )}
          {/* <div
            style={{
              width: '700px',
              height: '500px',
              backgroundColor: 'grey',
              margin: 'auto',
              marginTop: '2rem',
            }}
          >
            <p>{selectedVault}</p>
            <p>{veYFIAmount}</p>
            <p>
              `Boost = 1 + ({veYFIAmount} / {veyfiTotalSupply}) * 9 + (
              {totalDeposited} * ({veYFIAmount} / {veyfiTotalSupply}) * 9) /
              amountDepositedInGauge `
            </p>
            <p>{JSON.stringify(chart1Data)}</p>
          </div> */}
        </TabsContent>
        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost From Deposit Amount</CardTitle>
              <CardDescription>
                Pick Gauge and enter the amount you want to deposit in the Gauge
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                {/* 1. Choose asset to deposit */}
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  <Label>Select Gauge</Label>

                  <Select
                    value={selectedVault}
                    onValueChange={handleVaultChange}
                  >
                    {/* Changed onChange to onValueChange */}
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
                {/* Display price per share and total deposited */}
                {/* <p>Price per Share: {pricePerShare}</p> */}
                {/* <p>Total Deposited in Gauge: {totalDeposited}</p> */}
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* 2. Choose amount to deposit */}
                  <Label>Enter Amount you want to Deposit</Label>
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
              {/* <Button variant="outline">clear</Button> */}
              <Button onClick={handleCalculateButton2Click}>Calculate</Button>
            </CardFooter>
          </Card>
          {showChart2 && (
            <div style={{ paddingBottom: '1rem' }}>
              <BoostChart data={chart2Data} xVar="veYFIVar" />
            </div>
          )}
          {/* <div
            style={{
              width: '700px',
              height: '500px',
              backgroundColor: 'grey',
              margin: 'auto',
              marginTop: '2rem',
            }}
          >
            <p>Selected Vault: {selectedVault}</p>
            <p>deposit Amount: {depositAmount}</p>
            <p>
              `Boost = 1 + (veYFIAmount / {veyfiTotalSupply}) * 9 + (
              {totalDeposited} * ({veYFIAmount} / {veyfiTotalSupply}) * 9) /
              {depositAmount} `
            </p>
            <p>{JSON.stringify(chart2Data)}</p>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default VeYFICalculator

/**
 * veYFI Calculator
 * component that calculates the amount of YFI needed based on current boost or deposit
 *
 * 

# determine user share of veYFI
UserVeYFIShare =  VeYFIBalance / VeYFITotalSupply

# Determine boostable balance above 10% of deposit
BoostableBalance = 
(AmountDepositedInGauge /10) + (TotalDepositedInTheGauge * UserVeYFIShare  * 0.9)

# take the less of amount deposited in gauge and boostable balance
BoostedBalance = min(AmountDeposited, BoostableBalance)

# get the boost by multiplying by 10 and dividing by amount deposited in gauge.
Boost = 10 * BoostedBalance / AmountDepositedInGauge

```
 * make call to get veYFI total supply (will be provided by context provider)
 * calculator should have a few modes:
    * Mode 1:
    * 1. choose asset to deposit
        * 1.1. show list of vaults as selector (from constants file)
        * 1.2. get price per share of vault (from context provider)
        * 1.3. get total amount deposited in gauge (from context provider)
    * 2. choose amount to deposit
        * 2.1. show input field for amount with option to set in shares or underlying asset
        * 2.2. if underlying, convert to shares
    * 3. get range of veYFI needed to boost 1x to 10x and show as chart
        * 3.1. chart should have veYFI on x-axis and boost on y-axis
     
    const VeYFIBalance = (((Boost * AmountDepositedInGauge)/10 - (AmountDepositedInGauge / 10)) / ((TotalCurrentlyInTheGauge + AmountDepositedInGauge) * 0.9)) * VeYFITotalSupply;
    
    equation for chart:
    const VeYFIBalance = ((AmountDepositedInGauge * (Boost - 1)) / (9 * (TotalCurrentlyInTheGauge + AmountDepositedInGauge))) * VeYFITotalSupply; 

 * Or mode 2: 
    * 1. enter the amount of veYFI owned
        * 1.1. show input field for amount of veYFI
        * 1.2. tooltip to remind that veYFI is timelocked YFI and decays over time 
    * 2. enter asset to boost
    *   * 2.1. show list of vaults as selector (from constants file)
        * 2.2. get price per share of vault (from context provider)
        * 2.3. get total amount deposited in gauge (from context provider)
    * 3. show boost level chart for asset amounts
        * 3.1. chart should have value deposited on x-axis and boost on y-axis 
    
    (Boost * AmountDepositedInGauge)/10 = (AmountDepositedInGauge /10) + ((TotalCurrentlyInTheGauge + AmountDepositedInGauge) * (VeYFIBalance / VeYFITotalSupply)  * 0.9)
    
    equation for chart:
    const Boost = 1 + (VeYFIBalance / VeYFITotalSupply) * 9 + (TotalCurrentlyInTheGauge * (VeYFIBalance / VeYFITotalSupply) * 9) / AmountDepositedInGauge; 
      
 */
