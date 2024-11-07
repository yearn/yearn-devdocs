import React, { useContext, useState, useEffect } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'

const ContractAddress = ({ contractName }) => {
  const data = useContext(ContractAddressContext)
  const [loading, setLoading] = useState(true) // Initialize loading state

  const getNestedProperty = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }

  useEffect(() => {
    if (data) {
      setLoading(false) // Set loading to false when data is defined
    }
  }, [data])

  if (loading) {
    return <span>Loading Contract Address...</span> // Display loading message while data is null or undefined
  }

  const address = getNestedProperty(data, contractName) // Get the nested property

  if (!address) {
    return <span>Loading Contract Address...</span> // Display loading message if address is still undefined
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
