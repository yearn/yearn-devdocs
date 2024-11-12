import React, { useContext, useState, useEffect } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'

const ContractAddress = ({ contractName }) => {
  const data = useContext(ContractAddressContext)
  const [loading, setLoading] = useState(true)

  const getNestedProperty = (obj, keys) => {
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return <span>Loading Contract Address...</span>
  }

  // Modified code: Ensure contractName is an array
  const path = Array.isArray(contractName) ? contractName : [contractName]

  const address = getNestedProperty(data, path)

  if (!address) {
    return <span>Loading Contract Address...</span>
  }

  return (
    <a
      href={`https://etherscan.io/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {address}
    </a>
  )
}

export default ContractAddress
