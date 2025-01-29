import { getContract, PublicClient, Address, getAddress } from 'viem'
import { yGaugeRegistryABI } from './ABIs'

export const getGaugeAddresses = async (
  gaugeRegistryAddress: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address: gaugeRegistryAddress,
    abi: yGaugeRegistryABI,
    client: publicClient,
  })
  console.log('Fetching gauge addresses...')
  const numGauges = await contract.read.vault_count().catch(() => {
    console.warn('vault_count not found')
    return undefined
  })
  if (numGauges === undefined) {
    throw new Error('Failed to retrieve the number of gauges')
  }
  const numberOfGauges = Number(numGauges)
  const gaugeAddresses: string[] = []
  for (let i = 0; i < numberOfGauges; i++) {
    const gaugeAddress = await contract.read.gauges([BigInt(i)]).catch(() => {
      console.warn(`gauge ${i} not found`)
      return undefined
    })
    if (gaugeAddress === undefined) {
      throw new Error(`Failed to retrieve gauge ${i}`)
    }
    gaugeAddresses.push(gaugeAddress)
  }
  console.log('Gauge addresses fetched.')
  return { numberOfGauges, gaugeAddresses }
}
