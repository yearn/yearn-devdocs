// src/context/ContractDataContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from './PublicClientContext'
import * as ABIs from '../ethereum/ABIs'
import { createPublicClient, getContract, http, getAddress } from 'viem'
import { mainnet } from 'viem/chains'

interface MethodWithArgs {
  name: string
  args: string[]
}

interface ContractReadData {
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

export const ContractDataProvider = ({ children, contractParams }) => {
  const [data, setData] = useState({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractReadParams: ContractReadData[] = []
        for (const rpcCall of contractParams) {
          if (isContractReadData(rpcCall)) {
            contractReadParams.push(rpcCall)
          } else {
            console.error('Invalid contract read data:', rpcCall)
          }
        }
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
              return contract.read[method]() // Call method without arguments
            } else {
              return contract.read[method.name](method.args) // Call method with arguments
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
            })
            return newData
          })
        }
      } catch (error) {
        console.error('Error fetching contract data:', error)
      }
    }

    fetchData()
  }, [contractParams, publicClient])

  return (
    <ContractDataContext.Provider value={data}>
      {children}
    </ContractDataContext.Provider>
  )
}
