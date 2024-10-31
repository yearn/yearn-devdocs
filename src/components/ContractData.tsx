// src/components/ContractData.tsx
import React, { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'

const ContractData = ({ methodName }) => {
  const data = useContext(ContractDataContext)

  return (
    <code>
      {data[methodName] !== undefined
        ? data[methodName]
        : 'Fetching contract data...'}
    </code>
  )
}

export default ContractData
