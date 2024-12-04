import React, { useState, useContext, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './shadcn/tabs/tabs'
import {   Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton, } from './shadcn/select/select'
import  Input from './shadcn/input/input'
// import { Chart } from 'some-chart-library'; // Replace with the actual chart library
// import { ContractDataContext } from '../context/ContractDataContext'
import { veYfiGauges, yfiContracts } from '../ethereum/constants';
import * as ABIs from '../ethereum/ABIs'
import { getAddress, getContract, formatEther } from 'viem'
import { PublicClientContext } from '../context/PublicClientContext'

const VeYFICalculator: React.FC = () => {
    // const data = useContext(ContractDataContext)
    const publicClient = useContext(PublicClientContext)
    // State for the amount of veYFI owned
    const [veyfiTotalSupply, setVeyfiTotalSupply] = useState<number>(0);
  const [veYFIAmount, setVeYFIAmount] = useState<number>(0);
  // State for the selected vault
  const [selectedVault, setSelectedVault] = useState<string>('');

  // State for amount to deposit (Mode 1)
  const [depositAmount, setDepositAmount] = useState<number>(0);
    const [isUnderlying, setIsUnderlying] = useState<boolean>(true);
    
    useEffect(() => {
        if (publicClient) { 
            const contract = getContract({
                address: getAddress(yfiContracts.veYfiAddress),
                abi: ABIs.yfiTokenABI,
                client: publicClient, 
            });
            const veYFITotalSupply = await contract.read.totalSupply().catch(() => {
                console.warn('veYFITotalSupply not found');
                return undefined;
            }); 
            if (veYFITotalSupply) {
                const formattedVeYFITotalSupply = Number(formatEther(veYFITotalSupply)); 
                setVeyfiTotalSupply(formattedVeYFITotalSupply);
            }
        }

        /** 
         * for each entry in veYfiGauges, get the address and name.
         * for each address, create a new contract with the address and the ABIs.yGaugeV2ABI ABI.
         * Then do a batched call for the contracts calling totalAssets() for each contract
         * */
    }, [publicClient])

    // Context to get price per share and total deposited

  const { getPricePerShare, getTotalDeposited } = useContext(VaultContext);

  // Handle change in veYFI amount input
  const handleVeYFIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeYFIAmount(Number(e.target.value));
  };

  // Handle change in selected vault
  const handleVaultChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVault(e.target.value);
  };

  // Handle change in deposit amount input
  const handleDepositAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(Number(e.target.value));
  };

  // Fetch data based on the selected vault
  const pricePerShare = getPricePerShare(selectedVault);
  const totalDeposited = getTotalDeposited(selectedVault);

  // Function to calculate Boost based on the equation
  const calculateBoost = (amountDepositedInGauge: number) => {
    const veYFITotalSupply = /* Fetch veYFITotalSupply from a data source */;
    const VeYFIBalance = veYFIAmount;
    // Boost calculation equation
    const Boost =
      1 +
      ((VeYFIBalance / veYFITotalSupply) * 9) +
      ((totalDeposited * (VeYFIBalance / veYFITotalSupply) * 9) / amountDepositedInGauge);
    return Boost;
  };

  // Function to calculate VeYFIBalance for Mode 1
  const calculateVeYFIBalance = (boost: number, amountDepositedInGauge: number) => {
    const veYFITotalSupply = /* Fetch veYFITotalSupply from a data source */;
    const totalCurrentlyInGauge = totalDeposited;
    const VeYFIBalance =
      ((amountDepositedInGauge * (boost - 1)) /
        (9 * (totalCurrentlyInGauge + amountDepositedInGauge))) *
      veYFITotalSupply;
    return VeYFIBalance;
  };

  // Generate data for the chart
  const chartData = /* Generate chart data based on calculations */ [];

  // Generate data for Mode 1 chart
  const mode1ChartData = /* Generate chart data for Mode 1 based on calculations */ [];

  return (
    <Tabs defaultValue="tab1">
      {/* Modified Tabs component to use Radix UI syntax */}
      <TabsList aria-label="VeYFI Calculator Tabs">
        <TabsTrigger value="tab1">Calculate from veYFI</TabsTrigger>
        <TabsTrigger value="tab2">Calculate from Gauge Deposit</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        {/* Tab 1 Content */}
        {/* Input field for amount of veYFI with tooltip */}
        {/* <Tooltip content="veYFI is timelocked YFI and decays over time"> */}
          <Input
            type="number"
            value={veYFIAmount}
            onChange={handleVeYFIChange}
            placeholder="Enter amount of veYFI"
          />
        {/* </Tooltip> */}

        {/* Vault selector dropdown */}
              <Select value={selectedVault} onChange={handleVaultChange}>
                  <SelectTrigger>
                        <SelectValue placeholder ="Select Gauge" />
                  </SelectTrigger>
                    <SelectContent>
          {vaults.map((vault) => (
            <SelectItem key={vault.id} value={vault.id}>
              {vault.name}
            </SelectItem>
          ))}
                  </SelectContent>
                </Select>

        {/* Chart displaying the Boost vs. Value Deposited */}
        <Chart data={chartData} />
      </TabsContent>
      <TabsContent value="tab2">
        {/* Tab 2 Content - Mode 1 Calculator */}
        {/* 1. Choose asset to deposit */}
              <Select value={selectedVault} onChange={handleVaultChange}>
                    <SelectTrigger>
                        <SelectValue placeholder ="Select Gauge" />
                  </SelectTrigger>
                  <SelectContent>
          {vaults.map((vault) => (
            <SelectItem key={vault.id} value={vault.id}>
              {vault.name}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>

        {/* Display price per share and total deposited */}
        <p>Price per Share: {pricePerShare}</p>
        <p>Total Deposited in Gauge: {totalDeposited}</p>

        {/* 2. Choose amount to deposit */}
        <Input
          type="number"
          value={depositAmount}
          onChange={handleDepositAmountChange}
          placeholder="Enter amount to deposit"
        />
        {/* Option to set in shares or underlying asset */}
        <label>
          <Input
            type="checkbox"
            checked={isUnderlying}
            onChange={(e) => setIsUnderlying(e.target.checked)}
          />
          Underlying Asset
        </label>

        {/* If underlying, convert to shares */}
        {isUnderlying ? (
          <p>Equivalent Shares: {depositAmount / pricePerShare}</p>
        ) : (
          <p>Underlying Amount: {depositAmount * pricePerShare}</p>
        )}

        {/* 3. Get range of veYFI needed to boost 1x to 10x and show as chart */}
        <Chart data={mode1ChartData} />
      </TabsContent>
    </Tabs>
  );
};

export default VeYFICalculator;


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
