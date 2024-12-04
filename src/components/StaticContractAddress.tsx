import React from 'react'
import * as constants from '../ethereum/constants'

const ContractAddress = ({ contractName }) => {
  const getNestedProperty = (obj, keys) => {
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }

  // Modified code: Ensure contractName is an array
  const path = Array.isArray(contractName) ? contractName : [contractName]

  const address = getNestedProperty(constants, path)

  if (!address) {
    console.error(`Contract address not found for ${contractName.join('.')}`)
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
