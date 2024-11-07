// src/components/ContractData.tsx
import React, { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { formatUnits } from 'viem'

const ContractData = ({ contract: contractName, methodName, decimals }) => {
  const data = useContext(ContractDataContext)
  console.log('ContractData', contractName, methodName, data)

  return (
    <code>
      {data[contractName] && data[contractName][methodName] !== undefined
        ? typeof decimals === 'number'
          ? formatUnits(data[contractName][methodName], decimals)
          : data[contractName][methodName].toString()
        : 'Fetching contract data...'}
    </code>
  )
}

export default ContractData
