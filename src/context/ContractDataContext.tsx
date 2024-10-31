// src/context/ContractDataContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react'
import { dyfiRedemptionABI } from '../ethereum/ABIs/dyfi-redemption'
import { dyfiRedemptionAddress } from '../ethereum/constants'
import { PublicClientContext } from '../theme/Layout'

export const ContractDataContext = createContext(null)

export const ContractDataProvider = ({ children, methodNames }) => {
  const [data, setData] = useState({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchData = async () => {
      const calls = methodNames.map((methodName) => ({
        address: dyfiRedemptionAddress,
        abi: dyfiRedemptionABI,
        functionName: methodName,
      }))

      try {
        const results = await publicClient.readContract({
          calls,
        })

        const data = methodNames.reduce((acc, methodName, index) => {
          acc[methodName] = results[index].toString()
          return acc
        }, {})

        setData(data)
      } catch (error) {
        console.error('Error fetching contract data:', error)
      }
    }

    fetchData()
  }, [methodNames, publicClient])

  return (
    <ContractDataContext.Provider value={data}>
      {children}
    </ContractDataContext.Provider>
  )
}
