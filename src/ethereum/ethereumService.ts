import {
  Address,
  PublicClient,
  createPublicClient,
  getContract,
  http,
} from 'viem'
import { mainnet } from 'viem/chains'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// // Ensure the API key exists
// const {
//   siteConfig: { customFields },
// } = useDocusaurusContext()
// const apiKey = customFields.alchemyKey
// if (!apiKey) {
//   throw new Error('ALCHEMY_API_KEY is not defined in the environment variables')
// }

// export const publicClient = createPublicClient({
//   batch: {
//     multicall: true,
//   },
//   chain: mainnet,
//   transport: http(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`),
// })

/**
 * Retrieves the total supply of VeYfi tokens and the total YFI locked.
 * @param publicClient The public client used to interact with the VeYfi contract.
 * @returns A promise that resolves to an array of VeYfiData objects containing the total supply, total YFI locked, and decimals.
 */
export const getContractData = async (
  publicClient: PublicClient,
  contractAddress: Address,
  abi: any,
  methodName: string,
  args: any[]
): Promise<any> => {
  const contract = getContract({
    address: contractAddress,
    abi: abi,
    client: publicClient,
  })

  try {
    const data = (await contract.read[methodName](...args)).toString()
    return data
  } catch (error) {
    console.error('Error fetching contract data:', error)
    throw error
  }
}
