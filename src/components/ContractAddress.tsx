import React, { useContext } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'

/**
 * Maps chain IDs to their respective block explorer domains.
 */
const BLOCK_EXPLORERS: Record<number, string> = {
  1: 'etherscan.io',
  10: 'optimistic.etherscan.io',
  137: 'polygonscan.com',
  8453: 'basescan.org',
  42161: 'arbiscan.io',
  747474: 'katanascan.com',
}

/**
 * Component to display a contract address with a link to the appropriate block explorer.
 *
 * @param {Object} props - The component props.
 * @param {string | string[]} props.contractName - A key or array of keys to access the contract address in the context data.
 * @param {number} [props.chainID=1] - The chain ID to determine which block explorer to use.
 *
 * @returns {JSX.Element} A link to the contract address on the appropriate block explorer or a loading/error message.
 *
 * @example
 * <ContractAddress contractName={['contracts', 'MyContract']} chainID={1} />
 * <ContractAddress contractName="YFI" chainID={42161} />
 */
const ContractAddress = ({ contractName, chainID = 1 }) => {
  const data = useContext(ContractAddressContext)
  const addresses = data.addresses
  const loading = !data

  const getNestedProperty = (obj, keys) => {
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }

  if (loading) {
    return <span>Loading Contract Address...</span>
  }

  const path = Array.isArray(contractName) ? contractName : [contractName]
  const address = getNestedProperty(addresses, path)

  if (!address) {
    return <span>Loading Contract Address...</span>
  }

  const explorerDomain = BLOCK_EXPLORERS[chainID]
  if (!explorerDomain) {
    console.warn(`No block explorer configured for chain ID: ${chainID}`)
    return <span>{address}</span>
  }

  return (
    <a
      href={`https://${explorerDomain}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {address}
    </a>
  )
}

export default ContractAddress
