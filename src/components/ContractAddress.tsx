import React, { useContext } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'

/**
 * Component to display a contract address with a link to Etherscan.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.contractName - An array of keys to access the contract address in the context data.
 *
 * @returns {JSX.Element} A link to the contract address on Etherscan or a loading message.
 *
 * @example
 * <ContractAddress contractName={['contracts', 'MyContract']} />
 */
const ContractAddress = ({ contractName }) => {
  const data = useContext(ContractAddressContext)
  const addresses = data.addresses
  const loading = !data

  const getNestedProperty = (obj, keys) => {
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }

  if (loading) {
    return <span>Loading Contract Address...</span>
  }

  // Modified code: Ensure contractName is an array
  const path = Array.isArray(contractName) ? contractName : [contractName]

  const address = getNestedProperty(addresses, path)

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
