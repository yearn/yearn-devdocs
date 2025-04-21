import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react'
import { PublicClientContext } from './PublicClientContext'
import * as ABIs from '../ethereum/ABIs'
import { getAddress, getContract } from 'viem'

type MethodWithArgs = {
  name: string
  args: string[]
}

type ContractReadData = {
  name: string
  chain: string
  address: string
  abiName: string
  methods: (string | MethodWithArgs)[]
}

// Type guard to check if an object is of type ContractReadData
const isContractReadData = (obj: any): obj is ContractReadData => {
  return (
    typeof obj.name === 'string' &&
    typeof obj.chain === 'string' &&
    typeof obj.address === 'string' &&
    typeof obj.abiName === 'string' &&
    Array.isArray(obj.methods) &&
    obj.methods.length > 0 &&
    obj.methods.every(
      (method) =>
        typeof method === 'string' ||
        (typeof method.name === 'string' &&
          Array.isArray(method.args) &&
          method.args.every((arg) => typeof arg === 'string'))
    )
  )
}

export const ContractDataContext = createContext({})

/**
 * Fetches data from multiple contract read calls and updates the state with the results.
 *
 * @param {ContractReadData[]} contractReadParams - An array of contract read parameters, each containing the contract address, ABI name, and methods to call.
 * @param {any} publicClient - The public client used to interact with the blockchain.
 * @param {Record<string, any>} ABIs - A record of ABI names to ABI definitions.
 * @param {(value: React.SetStateAction<{}>) => void} setData - A function to update the state with the fetched data.
 *
 * @returns {Promise<void>} A promise that resolves when all contract read calls have been completed and the state has been updated.
 *
 * @throws Will throw an error if there is an issue with fetching contract data.
 */
const fetchData = async (
  contractReadParams: ContractReadData[],
  publicClient,
  ABIs,
  setData: {
    (value: React.SetStateAction<{}>): void
    (arg0: (prevData: any) => any): void
  }
) => {
  try {
    // Fetch the latest block timestamp
    const block = await publicClient.getBlock({ blockTag: 'latest' })
    const blockTimestamp = Number(block.timestamp)
    for (const contractReadCall of contractReadParams) {
      const address = contractReadCall.address
      const abi = ABIs[contractReadCall.abiName]

      if (!publicClient) {
        console.error('publicClient is null')
        return
      }

      const contract = getContract({
        address: getAddress(address),
        abi: abi,
        client: publicClient,
      })

      // Dynamically call methods from contractReadCall
      const methodCalls = contractReadCall.methods.map((method) => {
        if (typeof method === 'string') {
          // @ts-ignore
          return contract.read[method]()
        } else {
          // @ts-ignore
          return contract.read[method.name](method.args)
        }
      })

      const results = await Promise.all(methodCalls) // Await all method calls

      setData((prevData) => {
        const newData = { ...prevData }
        results.forEach((result, index) => {
          const methodName =
            typeof contractReadCall.methods[index] === 'string'
              ? contractReadCall.methods[index]
              : contractReadCall.methods[index].name
          if (!newData[contractReadCall.name]) {
            newData[contractReadCall.name] = {}
          }
          newData[contractReadCall.name][methodName] = result
          newData['blockTimestamp'] = blockTimestamp
        })
        return newData
      })
    }
  } catch (error) {
    console.error('Error fetching contract data:', error)
  }
}

/**
 * Provides contract data to its children components.
 *
 * This context provider fetches on-chain data based on the provided contract parameters
 * and makes it available to its children components via context.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will have access to the contract data.
 * @param {Array} props.contractParams - The parameters used to fetch contract data.
 *
 * @returns {JSX.Element} The context provider component that supplies contract data.
 */
export const ContractDataProvider = ({ children, contractParams }) => {
  const [data, setData] = useState({})
  const publicClient = useContext(PublicClientContext)

  // Memoize contractReadParams to prevent unnecessary re-renders
  const contractReadParams = useMemo(
    () => contractParams.filter(isContractReadData),
    [contractParams]
  )

  useEffect(() => {
    console.log('fetching on-chain data...')
    fetchData(contractReadParams, publicClient, ABIs, setData)
  }, [contractReadParams, publicClient])

  return (
    <ContractDataContext.Provider value={data}>
      {children}
    </ContractDataContext.Provider>
  )
}
