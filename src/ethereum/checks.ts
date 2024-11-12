import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from '../context/PublicClientContext'
import { normalize } from 'viem/ens'
import * as constants from './constants'
import {
  getProtocolContractAddresses,
  readReleaseRegistryAll,
  readYearnRoleManager,
} from '../ethereum/calls'
import { Address, PublicClient, getAddress } from 'viem'
import { ReleaseDataMap, ReleaseData } from './types'

/**
 * Resolves an ENS name to an address using the provided public client. If the ENS name cannot be resolved,
 * a fallback address is used. If the resolved address differs from the fallback address, a warning is logged.
 *
 * @param publicClient - The public client used to resolve the ENS name.
 * @param ensName - The ENS name to resolve.
 * @param fallbackAddress - The fallback address to use if the ENS name cannot be resolved.
 * @param contractName - A descriptive name for the address being resolved, used in log messages.
 * @returns The resolved address or the fallback address if the ENS name cannot be resolved.
 */
const resolveAddress = async (
  publicClient: PublicClient,
  ensName: string,
  fallbackAddress: string,
  contractName: string
) => {
  const checkedFallback = getAddress(fallbackAddress)
  let address = await publicClient.getEnsAddress({ name: normalize(ensName) })
  // if address is undefined, use the fallback address
  if (!address) {
    address = checkedFallback
    console.warn(`using fallback address for ${contractName}`)
  }
  // if address exists and !== fallbackAddress, warn to update the fallback address
  // TODO: if the address has changed, get the ABI from etherscan and check it against the existing ABI
  if (address && address !== checkedFallback) {
    console.warn(
      `Resolved ${contractName} ENS address does not match the fallback address. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
  }
  return address
}

/**
 * Validates an Ethereum address against an ENS name and a fallback address.
 *
 * @param publicClient - The public client used to resolve the ENS name.
 * @param ensName - The ENS name to resolve.
 * @param fallbackAddress - The fallback address to use if the ENS name cannot be resolved.
 * @param contractName - The name of the contract for logging purposes.
 * @param addressFromProviderContract - The address obtained from the Protocol Address Provider Contract.
 * @returns A promise that resolves when the validation is complete.
 *
 * @remarks
 * This function resolves the address from the given ENS name and compares it with the address from the Protocol Address Provider Contract.
 * It logs warnings if the resolved ENS address or the fallback address do not match the address from the Protocol Address Provider Contract.
 */
async function validateAddressWithENS(
  publicClient: any,
  ensName: string,
  fallbackAddress: string,
  contractName: string,
  addressFromProviderContract: string
) {
  // Resolve the address from ENS
  const resolvedAddress = await resolveAddress(
    publicClient,
    ensName,
    fallbackAddress,
    contractName
  )

  // Check if the actual address matches the resolved ENS address
  if (getAddress(addressFromProviderContract) !== getAddress(resolvedAddress)) {
    console.warn(
      `${contractName} ENS address does not match the Protocol Address Provider Contract. Check the ENS address and check the ABI in /src/ethereum/constants.ts.`
    )
  }

  // Check if the actual address matches the fallback address
  if (getAddress(addressFromProviderContract) !== getAddress(fallbackAddress)) {
    console.warn(
      `${contractName} Fallback address in Constants does not match Protocol Address Provider Contract. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
  }
}

async function validateAddress(
  fallbackAddress,
  contractName,
  addressFromProviderContract
) {
  // Check if the actual address matches the fallback address
  if (getAddress(addressFromProviderContract) !== getAddress(fallbackAddress)) {
    console.warn(
      `${contractName} Fallback address in Constants does not match Provider Contract. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
  }
  // } else {
  //   console.log(
  //     `Resolved ${contractName} address:`,
  //     addressFromProviderContract
  //   )
  // }
}

/**
 * Fetches top-level addresses from ENS using the provided public client.
 *
 * @param {any} publicClient - The public client to use for fetching addresses.
 * @returns {Promise<{ v3ProtocolAddressProvider: string, v3RoleManager: string } | void>}
 * An object containing the resolved addresses for `v3ProtocolAddressProvider` and `v3RoleManager`,
 * or void if the public client is null.
 *
 * @throws Will log an error if the public client is null.
 */
export const fetchTopLevelAddressesFromENS = async (publicClient) => {
  if (!publicClient) {
    console.error('publicClient is null')
    return
  }

  const v3ProtocolAddressProvider = await resolveAddress(
    publicClient,
    constants.v3ProtocolContracts.protocolAddressProviderENS,
    constants.v3ProtocolContracts.protocolAddressProviderFallback,
    'v3ProtocolAddressProvider'
  )

  const v3ReleaseRegistry = await resolveAddress(
    publicClient,
    constants.v3ProtocolContracts.releaseRegistryENS,
    constants.v3ProtocolContracts.releaseRegistryFallback,
    'v3ReleaseRegistry'
  )

  const v3RoleManager = await resolveAddress(
    publicClient,
    constants.yearnV3RoleManager.roleManagerENS,
    constants.yearnV3RoleManager.roleManager,
    'v3RoleManager'
  )

  return {
    v3ProtocolAddressProvider,
    v3ReleaseRegistry,
    v3RoleManager,
  }
}

/**
 * Fetches protocol addresses from the provided Protocol Address Provider and validates them against constants and ENS.
 *
 * @param v3ProtocolAddressProvider - The address of the Protocol Address Provider contract.
 * @param publicClient - The public client instance used to interact with the Ethereum network.
 * @returns The resolved protocol addresses.
 *
 * @remarks
 * This function performs the following steps:
 * 1. Fetches protocol addresses from the Protocol Address Provider.
 * 2. Validates the fetched addresses against constants and ENS.
 * 3. Logs warnings if any of the fetched addresses do not match the constants.
 *
 * @throws Will log an error if `publicClient` is null.
 */
export const fetchAndCheckProtocolAddresses = async (
  v3ProtocolAddressProvider: Address,
  publicClient
) => {
  if (!publicClient) {
    console.error('publicClient is null')
    return
  }
  // get Protocol Addresses from the Protocol Address Provider
  const addresses = await getProtocolContractAddresses(
    v3ProtocolAddressProvider,
    publicClient
  )
  // check that the resolved addresses matches the constants file (and ENS where available)
  await validateAddressWithENS(
    publicClient,
    constants.v3PeripheryContracts.aprOracleENS,
    constants.v3PeripheryContracts.aprOracle,
    'v3AprOracle',
    addresses.aprOracle
  )
  await validateAddress(
    constants.v3PeripheryContracts.router,
    'v3Router',
    addresses.router
  )
  await validateAddress(
    constants.v3PeripheryContracts.commonReportTrigger,
    'v3ReportTrigger',
    addresses.commonReportTrigger
  )
  await validateAddress(
    constants.v3PeripheryContracts.roleManagerFactory,
    'v3RoleManagerFactory',
    addresses.roleManagerFactory
  )
  return addresses
}

/**
 * Fetches and checks addresses from the release registry.
 *
 * This function reads the release registry and compares the addresses
 * with the constants defined in the project. It logs warnings if there
 * are mismatches between the registry and the constants.
 *
 * @param releaseRegistry - The address of the release registry contract.
 * @param publicClient - The public client used to interact with the Ethereum network.
 * @returns A promise that resolves to the addresses fetched from the release registry.
 */
export const fetchAndCheckFromReleaseRegistry = async (
  releaseRegistry: Address,
  publicClient
) => {
  if (!publicClient) {
    console.error('publicClient is null')
    return
  }
  const addresses: ReleaseDataMap = await readReleaseRegistryAll(
    releaseRegistry,
    publicClient
  )

  // Compare the fetched addresses with the constants
  if (addresses.latestRelease !== constants.v3VaultReleases.latestRelease) {
    console.warn(
      'Latest Release in Constants file does not match Release Registry Contract.'
    )
  }

  for (const releaseNumber in addresses) {
    if (releaseNumber === 'latestRelease') continue // Skip the latestRelease key
    const fetchedRelease = addresses[releaseNumber] as ReleaseData
    const constantRelease = constants.v3VaultReleases[releaseNumber]
    if (!constantRelease) {
      console.warn(`Release ${releaseNumber} is missing in constants.`)
      continue
    }

    if (fetchedRelease.vaultOriginal !== constantRelease.vaultOriginal) {
      console.warn(`vaultOriginal for release ${releaseNumber} does not match.`)
    }
    if (fetchedRelease.factory !== constantRelease.factory) {
      console.warn(`Factory for release ${releaseNumber} does not match.`)
    }
    if (
      fetchedRelease.tokenizedStrategy !== constantRelease.tokenizedStrategy
    ) {
      console.warn(
        `TokenizedStrategy for release ${releaseNumber} does not match.`
      )
    }
  }

  return addresses
}

export const fetchAndCheckYearnV3Addresses = async (
  roleManager: Address,
  publicClient
) => {
  const addresses = await readYearnRoleManager(roleManager, publicClient)
  await validateAddressWithENS(
    publicClient,
    constants.yearnV3Contracts.accountantENS,
    constants.yearnV3Contracts.accountant,
    'yearnV3Accountant',
    addresses.yearnAccountant
  )
  await validateAddressWithENS(
    publicClient,
    constants.yearnV3Contracts.registryENS,
    constants.yearnV3Contracts.registry,
    'yearnV3Registry',
    addresses.yearnRegistry
  )
  await validateAddress(
    constants.yearnV3Contracts.debtAllocator,
    'yearnV3DebtAllocator',
    addresses.yearnDebtAllocator
  )
  return addresses
}
