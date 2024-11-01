// src/components/ContractData.tsx
import React, { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { formatUnits } from 'viem'

const ContractData = ({ contract, methodName, decimals }) => {
  const data = useContext(ContractDataContext)
  console.log('ContractData', contract, methodName, data)

  return (
    <code>
      {data[contract] && data[contract][methodName] !== undefined
        ? typeof decimals === 'number'
          ? formatUnits(data[contract][methodName], decimals)
          : data[contract][methodName].toString()
        : 'Fetching contract data...'}
    </code>
  )
}

export default ContractData
