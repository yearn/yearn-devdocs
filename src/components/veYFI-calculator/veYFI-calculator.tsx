import React, { useState, useContext, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../shadcn/tabs/tabs'
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '../shadcn/select/select'
import Input from '../shadcn/input/input'
import { PublicClientContext } from '../../context/PublicClientContext'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../shadcn/card/card'
import styles from '../../css/veYFI-calc.module.css'
import { Button } from '../shadcn/button/button'
import VeYFILockCalculator from './VeYFILockCalculator'
// import SelectLiquidLockerCard from './SelectLiquidLockerCard'
import SelectLiquidLockerCard from './SelectLiquidLockerCard'
import {
  calculateBoost,
  findDynamicRangeForDeposit,
  generateLinearData,
  findDynamicRangeForVeYFI,
  generateSinglePoint,
} from './calculations'
import {
  fetchVeYFISupply,
  fetchAllGaugeData,
  fetchTokenPrice,
  fetchLiquidLockerVeYFIBalance,
} from './fetch'
import BoostChart from './BoostChart'
import YearnLoader from '../misc/YearnLoader'
import { LiquidLockerContracts } from '../../ethereum/constants'

type GaugeData = {
  name: string
  address: string
  totalAssets: number
  symbol: string
  underlyingVaultAddress: string
}

export type BoostCalculationResult = {
  veYFI: number
  value: number
  valueUsd: number
  boost: number
}

const VeYFICalculator: React.FC = () => {
  const publicClient = useContext(PublicClientContext)
  const { siteConfig } = useDocusaurusContext()
  const { yDaemon } = siteConfig.customFields as {
    yDaemon: string
    yPriceMagic: string
  }

  const [veYfiTotalSupply, setVeYfiTotalSupply] = useState<number>(0)
  const [gaugeData, setGaugeData] = useState<GaugeData[]>([])
  const [veYFIAmount, setVeYFIAmount] = useState<number | string>('')
  const [selectedVault, setSelectedVault] = useState<string>('')
  const [chartedVaultName, setChartedVaultName] = useState<string>('')
  const [selectedVaultSharePrice, setSelectedVaultSharePrice] = useState<
    number | undefined
  >(undefined)
  const [depositAmount, setDepositAmount] = useState<number | string>('')
  const [depositAmountInUSD, setDepositAmountInUSD] = useState<number | string>(
    ''
  )

  const [calculatedBoost, setCalculatedBoost] =
    useState<BoostCalculationResult>({
      veYFI: 0,
      value: 0,
      valueUsd: 0,
      boost: 0,
    })
  const [showChart1, setShowChart1] = useState<boolean>(false)
  const [showChart2, setShowChart2] = useState<boolean>(false)
  const [chart1DataShares, setChart1DataShares] = useState<any[]>([])
  const [chart1DataUSD, setChart1DataUSD] = useState<any[]>([])
  const [chart2Data, setChart2Data] = useState<any[]>([])
  const [isUSDInput, setIsUSDInput] = useState(true)
  const [isUSDChart, setIsUSDChart] = useState(true)
  const [useVeYfiCalculator, setUseVeYfiCalculator] = useState(false)
  const [veYFIFromLock, setVeYFIFromLock] = useState(0)
  const [liquidLockerBalances, setLiquidLockerBalances] = useState<
    Record<string, number>
  >({})
  const [useLiquidLocker, setUseLiquidLocker] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const supply = await fetchVeYFISupply(publicClient)
      setVeYfiTotalSupply(supply || 0)
      console.log(`veYfiTotalSupply: ${supply}`)
      const gauges = await fetchAllGaugeData(publicClient)
      setGaugeData(Array.isArray(gauges) ? gauges : [])
      const fetchedLiquidLockerBalances = await fetchLiquidLockerVeYFIBalance(
        publicClient,
        LiquidLockerContracts
      )
      setLiquidLockerBalances(fetchedLiquidLockerBalances || {})
      console.log(fetchedLiquidLockerBalances)
      setIsDataFetched(true)
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
    setShowChart1(false)
    setShowChart2(false)
  }

  const handleDepositAmountInSharesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value
    if (val === '') {
      setDepositAmount('')
      return
    }
    if (!isNaN(Number(val))) {
      const depositAmountInDollars = selectedVaultSharePrice
        ? selectedVaultSharePrice * Number(val)
        : 0
      setDepositAmountInUSD(depositAmountInDollars)
      setDepositAmount(Number(val))
    }
    setShowChart1(false)
    setShowChart2(false)
  }

  const handleDepositAmountInUSDChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('---- in handleDepositAmountInUSDChange ----')
    const val = e.target.value
    if (val === '') {
      setDepositAmount('')
      return
    }
    if (!isNaN(Number(val))) {
      setDepositAmountInUSD(Number(val))
      console.log(`selectedVaultSharePrice: ${selectedVaultSharePrice}`)
      const depositAmountInShares = selectedVaultSharePrice
        ? Number(val) / selectedVaultSharePrice
        : 0
      console.log(`depositAmountInShares: ${depositAmountInShares}`)
      setDepositAmount(depositAmountInShares)
    }
    setShowChart1(false)
    setShowChart2(false)
    console.log('---- out handleDepositAmountInUSDChange ----')
  }

  const handleCheckboxChange1 = () => {
    setIsUSDInput(!isUSDInput)
  }
  const handleCheckboxChange2 = () => {
    setIsUSDChart(!isUSDChart)
  }
  const handleVeYfiCheckboxChange1 = () => {
    setVeYFIAmount(veYFIFromLock)
    setUseLiquidLocker(false)
    setUseVeYfiCalculator(!useVeYfiCalculator)
  }
  const handleVeYfiCheckboxChange2 = () => {
    setUseVeYfiCalculator(false)
    setVeYFIAmount(0)
    setUseLiquidLocker(!useLiquidLocker)
  }

  const handleVaultChange = async (vaultName: string) => {
    setSelectedVault(vaultName)
    const selectedGauge = gaugeData.find((gauge) => gauge.name === vaultName)
    if (selectedGauge) {
      const tokenPriceData = await fetchTokenPrice(
        yDaemon,
        selectedGauge.underlyingVaultAddress
      )
      console.log(tokenPriceData)
      const underlyingPrice = tokenPriceData?.tvl.price
      console.log('underlyingPrice: ', underlyingPrice)
      const pricePerShare = tokenPriceData?.apr.pricePerShare.today
      console.log('pricePerShare: ', pricePerShare)
      const vaultSharePrice = pricePerShare * underlyingPrice
      setSelectedVaultSharePrice(vaultSharePrice)
    }
    setShowChart1(false)
    setShowChart2(false)
    setDepositAmountInUSD('')
    setDepositAmount('')
  }

  const handleCalculateButton1Click = () => {
    const totalDeposited =
      gaugeData.find((g) => g.name === selectedVault)?.totalAssets || 0
    console.log(`totalDeposited in ${selectedVault} Gauge: , ${totalDeposited}`)
    const depositVal = Number(depositAmount) || 0
    const veYFIVal = useVeYfiCalculator
      ? Number(veYFIFromLock) || 0
      : Number(veYFIAmount) || 0
    console.log(`veYFIVal: ${veYFIVal}`)
    console.log(`selectedVaultSharePrice: ${selectedVaultSharePrice}`)
    // get the boost value for a range of deposit amounts
    const calcFunc = (amountDepositedInGauge: number) =>
      calculateBoost(
        veYFIVal,
        veYfiTotalSupply,
        totalDeposited,
        amountDepositedInGauge
      )
    const newRange = findDynamicRangeForDeposit(calcFunc)
    const dataShares = generateLinearData(
      newRange.start,
      newRange.end,
      500,
      calcFunc,
      'amountDepositedInGauge'
    )
    const dataUSD = dataShares.map((entry) => ({
      ...entry,
      amountDepositedInGauge:
        entry.amountDepositedInGauge * (selectedVaultSharePrice ?? 0),
    }))
    // get the boost for the entered deposit amount
    console.log('depositAmountInUSD: ', depositAmountInUSD)
    console.log('selectedVaultSharePrice: ', selectedVaultSharePrice)
    console.log('Deposit Amount in Shares: ', depositVal)
    const specificBoost = calculateBoost(
      veYFIVal,
      veYfiTotalSupply,
      totalDeposited,
      Number(depositAmountInUSD) / (selectedVaultSharePrice ?? 0)
    )
    console.log(`specificBoost: ${specificBoost}`)
    const specificBoostDataPoint = generateSinglePoint(depositVal, calcFunc)
    console.log(`specificBoostDataPoint: ${specificBoostDataPoint}`)
    const specificBoostDataPointUSD =
      (specificBoostDataPoint?.value ?? 0) * (selectedVaultSharePrice ?? 0)
    console.log(`specificBoostDataPointUSD: ${specificBoostDataPointUSD}`)
    setCalculatedBoost({
      veYFI: veYFIVal,
      value: specificBoostDataPoint?.value || 0,
      valueUsd: specificBoostDataPointUSD,
      boost: specificBoost,
    })
    setChart1DataShares(dataShares)
    setChart1DataUSD(dataUSD)
    setChartedVaultName(selectedVault)
    setShowChart1(true)
  }

  const handleCalculateButton2Click = () => {
    const totalDeposited =
      gaugeData.find((g) => g.name === selectedVault)?.totalAssets || 0
    const depositVal = Number(depositAmount) || 0
    const calcFunc = (veYfiVar: number) =>
      calculateBoost(veYfiVar, veYfiTotalSupply, totalDeposited, depositVal)
    const newRange = findDynamicRangeForVeYFI(calcFunc)
    const data = generateLinearData(
      newRange.start,
      newRange.end,
      500,
      calcFunc,
      'veYFIVar'
    )
    setChart2Data(data)
    setChartedVaultName(selectedVault)
    setShowChart2(true)
  }

  return !isDataFetched ? (
    <YearnLoader />
  ) : (
    <div style={{ width: '900px' }}>
      <Tabs defaultValue="tab1">
        <TabsList aria-label="VeYFI Calculator Tabs">
          <TabsTrigger value="tab1">Calculate from veYFI</TabsTrigger>
          <TabsTrigger value="tab2">Calculate from Gauge Deposit</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost From veYFI Amount</CardTitle>
              <CardDescription>
                Pick Gauge and enter a veYFI amount to see your boost.{' '}
                <a
                  href="https://docs.yearn.fi/contributing/governance/veYFI-comp-summary#yield-boosts-on-vault-deposits"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More info
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                <div style={{ flexDirection: 'column', width: '100%' }}>
                  {/* <Label>Select Gauge</Label> */}
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
                  {/* <Label>Enter Amount of veYFI</Label> */}
                  <Input
                    type="number"
                    value={useVeYfiCalculator ? veYFIFromLock : veYFIAmount}
                    onChange={handleVeYFIChange}
                    placeholder="Enter amount of veYFI"
                    disabled={useVeYfiCalculator || useLiquidLocker}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'top',
                      gap: '1rem',
                      height: '2rem',
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={useVeYfiCalculator}
                        onChange={handleVeYfiCheckboxChange1}
                      />
                      <label>use veYFI calculator</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={useLiquidLocker}
                        onChange={handleVeYfiCheckboxChange2}
                      />
                      <label>use Liquid Locker</label>
                    </div>
                  </div>
                  {useLiquidLocker && (
                    <div
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        // position: 'relative',
                      }}
                    >
                      <SelectLiquidLockerCard
                        liquidLockerBalances={liquidLockerBalances}
                        setVeYFIAmount={setVeYFIAmount}
                        setUseLiquidLocker={setUseLiquidLocker}
                      />
                    </div>
                  )}
                  <Input
                    type="number"
                    value={depositAmountInUSD}
                    onChange={handleDepositAmountInUSDChange}
                    placeholder="(Optional) Enter deposit amount in USD"
                    style={{ marginTop: '0.5rem', width: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className={styles.CardFooter}>
              <Button
                onClick={handleCalculateButton1Click}
                disabled={
                  !selectedVault ||
                  (useVeYfiCalculator
                    ? isNaN(Number(veYFIFromLock)) || !veYFIFromLock
                    : isNaN(Number(veYFIAmount)) || !veYFIAmount)
                }
              >
                Calculate
              </Button>
            </CardFooter>
            {showChart1 && (
              <div style={{ paddingBottom: '1rem' }}>
                {isUSDChart ? (
                  <BoostChart
                    gaugeName={chartedVaultName}
                    data={chart1DataUSD}
                    specificBoost={calculatedBoost}
                    xVar="Amount Deposited in Gauge (USD)"
                    dataKey="amountDepositedInGauge"
                  />
                ) : (
                  <BoostChart
                    gaugeName={chartedVaultName}
                    data={chart1DataShares}
                    specificBoost={calculatedBoost}
                    xVar="Amount Deposited in Gauge (Shares)"
                    dataKey="amountDepositedInGauge"
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    height: '2rem',
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={isUSDChart}
                      onChange={handleCheckboxChange2}
                    />
                    <label>in USD</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={!isUSDChart}
                      onChange={handleCheckboxChange2}
                    />
                    <label>in Vault Shares</label>
                  </div>
                </div>
              </div>
            )}
          </Card>
          <VeYFILockCalculator
            onVeYFIChange={(newVeYFI) => setVeYFIFromLock(newVeYFI)}
          />
        </TabsContent>
        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Determine Boost From Deposit Amount</CardTitle>
              <CardDescription>
                Pick Gauge and enter the amount you want to deposit{' '}
                <a
                  href="https://docs.yearn.fi/contributing/governance/veYFI-comp-summary#yield-boosts-on-vault-deposits"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More info
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.CardContent}>
              <div className={styles.inputElements}>
                <div
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  {/* <Label>Select Gauge</Label> */}
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
                <div
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    // marginTop: '-2rem',
                  }}
                >
                  {isUSDInput ? (
                    <Input
                      type="number"
                      value={depositAmountInUSD}
                      onChange={handleDepositAmountInUSDChange}
                      placeholder="Enter amount to deposit in USD"
                    />
                  ) : (
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={handleDepositAmountInSharesChange}
                      placeholder="Enter amount to deposit in Vault shares"
                    />
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '1rem',
                      height: '2rem',
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={isUSDInput}
                        onChange={handleCheckboxChange1}
                      />
                      <label>in USD</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={!isUSDInput}
                        onChange={handleCheckboxChange1}
                      />
                      <label>in Vault Shares</label>
                    </div>
                  </div>
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
                  gaugeName={chartedVaultName}
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
