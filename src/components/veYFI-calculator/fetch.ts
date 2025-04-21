import { getAddress, getContract, formatEther, formatUnits } from 'viem'
import * as ABIs from '../../ethereum/ABIs'
import {
  veYfiGauges,
  yfiContracts,
  type LiquidLockerContractsType,
} from '../../ethereum/constants'

export async function fetchVeYFISupply(publicClient: any) {
  if (!publicClient) {
    console.error('No public client')
    return 0
  }
  const contract = getContract({
    address: getAddress(yfiContracts.veYfiAddress),
    abi: ABIs.veyfiABI,
    client: publicClient,
  })
  // @ts-ignore
  const supply = await contract.read.totalSupply().catch(() => undefined)
  return supply ? Number(formatEther(supply)) : 0
}

export async function fetchLiquidLockerVeYFIBalance(
  publicClient: any,
  liquidLockers: LiquidLockerContractsType
) {
  if (!publicClient) {
    console.error('No public client')
    return 0
  }
  /**  get the value of VeYFI in each liquid locker
   * stakeDAO: 0xF750162fD81F9a436d74d737EF6eE8FC08e98220
   * Cove: 0x05dcdBF02F29239D1f8d9797E22589A2DE1C152F
   * 1UP: 0x242521ca01f330F050a65FF5B8Ebbe92198Ae64F
   *
   * function to call is `balanceOf` on the VeYFI contract (yfiContracts.veYfiAddress)
   */
  const contract = getContract({
    address: getAddress(yfiContracts.veYfiAddress),
    abi: ABIs.veyfiABI,
    client: publicClient,
  })
  const balances = await Promise.all(
    Object.values(liquidLockers).map(async (address) => {
      // @ts-ignore
      return contract.read
        .balanceOf([getAddress(address)])
        .catch(() => undefined)
    })
  )
  // I want to return a map of the liquid locker addresses to their VeYFI balance
  const balanceMap = Object.fromEntries(
    Object.keys(liquidLockers).map((address, index) => [
      address,
      balances[index] ? Number(formatEther(balances[index])) : 0,
    ])
  )
  return balanceMap
}

export async function fetchAllGaugeData(publicClient: any) {
  if (!publicClient) return []
  const gaugeDataPromises = veYfiGauges.map(async (gauge) => {
    const contract = getContract({
      address: getAddress(gauge.address),
      abi: ABIs.yGaugeV2ABI,
      client: publicClient,
    })
    // @ts-ignore
    const totalAssets = await contract.read.totalAssets().catch(() => undefined)
    return {
      name: gauge.name,
      address: gauge.address,
      totalAssets: totalAssets
        ? Number(formatUnits(totalAssets, gauge.underlyingDecimals))
        : 0,
      symbol: gauge.symbol,
      underlyingVaultAddress: gauge.underlyingVaultAddress,
    }
  })
  return Promise.all(gaugeDataPromises)
}

export async function fetchTokenPrice(yDaemon: string, address: string) {
  const response = await fetch(`${yDaemon}1/vaults/${address}`)
  if (!response.ok) {
    console.error('Failed to fetch token price')
    return null
  }
  const data = await response.json()
  return data
}
