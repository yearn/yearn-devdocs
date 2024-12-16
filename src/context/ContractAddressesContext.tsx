import React, { createContext, useState, useEffect, useContext } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PublicClientContext } from './PublicClientContext'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../ethereum/v3Checks'
import { yfiContracts, veYfiContracts } from '../ethereum/constants'
import { ContractAddresses } from '../ethereum/types'

export const ContractAddressContext = createContext<{
  addresses: ContractAddresses | Record<string, string | undefined>
  checks: Record<string, any>
}>({ addresses: {}, checks: {} })

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
  const [checks, setChecks] = useState<Record<string, any>>({})
  const publicClient = useContext(PublicClientContext)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        let checkFlag: boolean | undefined = true
        const failedChecks: string[] = []

        const topLevelData = await fetchTopLevelAddressesFromENS(
          publicClient,
          checkFlag,
          failedChecks
        )
        if (!topLevelData)
          throw new Error('Failed to fetch top-level contract addresses')
        checkFlag = topLevelData.checkFlag

        const protocolPeripheryData = await fetchAndCheckProtocolAddresses(
          topLevelData.addresses.v3ProtocolAddressProvider,
          publicClient,
          checkFlag,
          failedChecks
        )
        if (!protocolPeripheryData || !protocolPeripheryData?.addresses)
          throw new Error('Failed to fetch protocol addresses')
        checkFlag = protocolPeripheryData.checkFlag

        const releaseRegistryData = await fetchAndCheckFromReleaseRegistry(
          topLevelData.addresses.v3ReleaseRegistry,
          publicClient,
          checkFlag,
          failedChecks
        )
        if (!releaseRegistryData)
          throw new Error('Failed to fetch release registry addresses')
        checkFlag = releaseRegistryData?.checkFlag

        const yearnV3Data = await fetchAndCheckYearnV3Addresses(
          topLevelData.addresses.v3RoleManager,
          publicClient,
          checkFlag,
          failedChecks
        )
        if (!yearnV3Data) throw new Error('Failed to fetch Yearn V3 addresses')
        checkFlag = yearnV3Data.checkFlag

        const addressesData: ContractAddresses = {
          topLevel: topLevelData.addresses,
          protocolPeriphery: protocolPeripheryData.addresses,
          releaseRegistry: releaseRegistryData.addresses,
          yearnV3: yearnV3Data.addresses,
          yfiTokenContracts: yfiContracts,
          veYfiContracts: veYfiContracts,
        }

        const addressChecks = {
          allChecksPassed: checkFlag,
          failedChecks,
          topLevel: topLevelData.checks,
          protocolPeriphery: protocolPeripheryData.checks,
          releaseRegistry: releaseRegistryData.checks,
          yearnV3: yearnV3Data.checks,
        }
        if (checkFlag === false || checkFlag === undefined) {
          console.log('Addresses:', addressesData)
          console.log('Checks:', addressChecks)
        }

        setChecks(addressChecks)
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
    <ContractAddressContext.Provider value={{ addresses, checks }}>
      {children}
    </ContractAddressContext.Provider>
  )
}
