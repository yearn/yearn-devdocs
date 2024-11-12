import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from './PublicClientContext'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../ethereum/checks'
import { yfiContracts, veYfiContracts } from '../ethereum/constants'
import { ContractAddresses } from '../ethereum/types'

export const ContractAddressContext = createContext<
  ContractAddresses | Record<string, string | undefined>
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
  const [addresses, setAddresses] = useState<
    ContractAddresses | Record<string, string | undefined>
  >({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const topLevelContractAddresses = await fetchTopLevelAddressesFromENS(
          publicClient
        )
        if (!topLevelContractAddresses)
          throw new Error('Failed to fetch top-level contract addresses')

        const protocolPeripheryAddresses = await fetchAndCheckProtocolAddresses(
          topLevelContractAddresses.v3ProtocolAddressProvider,
          publicClient
        )
        if (!protocolPeripheryAddresses)
          throw new Error('Failed to fetch protocol addresses')

        const releaseRegistryAddresses = await fetchAndCheckFromReleaseRegistry(
          topLevelContractAddresses.v3ReleaseRegistry,
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

        const addressesData: ContractAddresses = {
          topLevel: topLevelContractAddresses,
          protocolPeriphery: protocolPeripheryAddresses,
          releaseRegistry: releaseRegistryAddresses,
          yearnV3: yearnV3Addresses,
          yfiTokenContracts: yfiContracts,
          veYfiContracts: veYfiContracts,
        }

        setAddresses(addressesData)
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
