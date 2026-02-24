import { Address, PublicClient, getContract } from 'viem'
import { gnosisSafeABI } from './ABIs'

export const readSafeOwners = async (
  safeAddress: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address: safeAddress,
    abi: gnosisSafeABI,
    client: publicClient,
  })

  console.log('Fetching Gnosis Safe owners...')
  const owners = await contract.read.getOwners()
  console.log('Gnosis Safe owners fetched.')
  return owners
}
