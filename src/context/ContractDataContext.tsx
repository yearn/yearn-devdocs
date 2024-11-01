// src/context/ContractDataContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from './PublicClientContext'

export const ContractDataContext = createContext(null)

export const ContractDataProvider = ({ children, contractParams }) => {
  const [data, setData] = useState({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const rpcCall of contractParams) {
          console.log('fetching contract data:', rpcCall)
          const module = await import(`../ethereum/ABIs`)
          const abi = module[rpcCall.abi as keyof typeof module]
          for (const method of rpcCall.methods) {
            const { name: methodName, args = [] } =
              typeof method === 'string' ? { name: method, args: [] } : method
            const result = await publicClient.readContract({
              address: rpcCall.address,
              abi: abi,
              functionName: methodName,
              args,
            })
            console.log(`${methodName}`, result)
            setData((prevData) => ({
              ...prevData,
              [rpcCall.name]: {
                ...prevData[rpcCall.name],
                [methodName]: result,
              },
            }))
          }
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
