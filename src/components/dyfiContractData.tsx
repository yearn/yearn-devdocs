// src/components/ContractData.js
import React, { useEffect, useState, useContext } from 'react'
import { dyfiRedemptionABI } from '../ethereum/ABIs/dyfi-redemption'
import { dyfiRedemptionAddress } from '../ethereum/constants'
import { PublicClientContext } from '../theme/Layout'

/**
 * Component that fetches and displays data from a smart contract.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.methodName - The name of the method to call on the smart contract.
 *
 * @returns {JSX.Element} A code element displaying the fetched contract data or a loading message.
 *
 * @example
 * <ContractData methodName="getBalance" />
 *
 * @remarks
 * This component uses the `PublicClientContext` to access the public client for reading the contract.
 * It fetches the data when the component mounts or when the `methodName` or `publicClient` changes.
 */
const ContractData = ({ methodName }) => {
  const [data, setData] = useState('')
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await publicClient.readContract({
          address: dyfiRedemptionAddress,
          abi: dyfiRedemptionABI,
          functionName: methodName,
        })
        console.log('contract call completed', result)
        setData(result.toString())
      } catch (error) {
        console.error('Error fetching contract data:', error)
      }
    }

    fetchData()
  }, [methodName, publicClient])

  return <code>{data !== null ? data : 'Fetching contract data...'}</code>
}

export default ContractData
