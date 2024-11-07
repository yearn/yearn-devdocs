import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from './PublicClientContext'
import { normalize } from 'viem/ens'
import * as constants from '../ethereum/constants'
import {
  getProtocolContractAddresses,
  readReleaseRegistry,
  readV3VaultFactory,
} from '../ethereum/calls'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../ethereum/checks'
import { Address, PublicClient, getAddress } from 'viem'

type TopLevelAddresses = {
  v3ProtocolAddressProvider: `0x${string}`
  v3RoleManager: `0x${string}`
}

type ProtocolPeripheryAddresses = {
  router: `0x${string}`
  keeper: `0x${string}`
  aprOracle: `0x${string}`
  releaseRegistry: `0x${string}`
  commonReportTrigger: `0x${string}`
  roleManagerFactory: `0x${string}`
}

type ReleaseRegistryAddresses = {
  latestRelease: string
  latestTokenizedStrategy: `0x${string}`
  latestFactory: `0x${string}`
  vaultOriginal?: string
}

type YearnAddresses = {
  yearnBrain: `0x${string}`
  yearnDaddy: `0x${string}`
  yearnAccountant: `0x${string}`
  yearnDebtAllocator: `0x${string}`
  yearnRegistry: `0x${string}`
}

export const ContractAddressContext = createContext<
  Record<string, string | undefined>
>({})

/**
 * Provides contract addresses to the component tree.
 *
 * This context provider fetches various contract addresses from ENS and other sources,
 * and makes them available to the component tree via context.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the contract addresses.
 *
 * @returns {JSX.Element} The context provider component.
 *
 * @example
 * ```tsx
 * <ContractAddressProvider>
 *   <YourComponent />
 * </ContractAddressProvider>
 * ```
 */
export const ContractAddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const topLevelContractAddresses = await fetchTopLevelAddressesFromENS(
          publicClient
        )
        if (!topLevelContractAddresses)
          throw new Error('Failed to fetch top-level contract addresses')

        const protocolAddresses = await fetchAndCheckProtocolAddresses(
          topLevelContractAddresses.v3ProtocolAddressProvider,
          publicClient
        )
        if (!protocolAddresses)
          throw new Error('Failed to fetch protocol addresses')

        const releaseRegistryAddresses = await fetchAndCheckFromReleaseRegistry(
          protocolAddresses.releaseRegistry,
          publicClient
        )
        if (!releaseRegistryAddresses)
          throw new Error('Failed to fetch release registry addresses')

        const yearnV3Addresses = await fetchAndCheckYearnV3Addresses(
          topLevelContractAddresses.v3RoleManager,
          publicClient
        )
        if (!yearnV3Addresses)
          throw new Error('Failed to fetch Yearn V3 addresses')

        setAddresses({
          ...topLevelContractAddresses,
          ...protocolAddresses,
          ...releaseRegistryAddresses,
          ...yearnV3Addresses,
        })
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    }

    if (publicClient) {
      fetchAddresses()
    }
  }, [publicClient])

  return (
    <ContractAddressContext.Provider value={addresses}>
      {children}
    </ContractAddressContext.Provider>
  )
}
