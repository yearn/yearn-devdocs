import React, { createContext, useState, useEffect, useContext } from 'react'
import { PublicClientContext } from '../context/PublicClientContext'
import { normalize } from 'viem/ens'
import * as constants from './constants'
import {
  getProtocolContractAddresses,
  readReleaseRegistry,
  readV3VaultFactory,
  readYearnRoleManager,
} from '../ethereum/calls'
import { Address, PublicClient, getAddress } from 'viem'

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
  if (addressFromProviderContract !== resolvedAddress) {
    console.warn(
      `${contractName} ENS address does not match the Protocol Address Provider Contract. Check the ENS address and check the ABI in /src/ethereum/constants.ts.`
    )
  }

  // Check if the actual address matches the fallback address
  if (addressFromProviderContract !== fallbackAddress) {
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
  if (addressFromProviderContract !== fallbackAddress) {
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
    constants.v3ProtocolAddressProviderENS,
    constants.v3ProtocolAddressProviderFallback,
    'v3ProtocolAddressProvider'
  )

  const v3RoleManager = await resolveAddress(
    publicClient,
    constants.v3RoleManagerENS,
    constants.v3RoleManagerFallback,
    'v3RoleManager'
  )

  return {
    v3ProtocolAddressProvider,
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
    constants.v3AprOracleENS,
    constants.v3AprOracleFallback,
    'v3AprOracle',
    addresses.aprOracle
  )
  await validateAddressWithENS(
    publicClient,
    constants.v3ReleaseRegistryENS,
    constants.v3ReleaseRegistryFallback,
    'v3ReleaseRegistry',
    addresses.releaseRegistry
  )
  await validateAddress(
    constants.v3RouterFallback,
    'v3Router',
    addresses.router
  )
  await validateAddress(
    constants.v3ReportTriggerFallback,
    'v3ReportTrigger',
    addresses.commonReportTrigger
  )
  await validateAddress(
    constants.v3RoleManagerFactoryFallback,
    'v3RoleManagerFactory',
    addresses.roleManagerFactory
  )
  return addresses
}

type ReleaseRegistryAddresses = {
  latestRelease: string
  latestTokenizedStrategy: `0x${string}`
  latestFactory: `0x${string}`
  vaultOriginal?: `0x${string}`
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
  const addresses: ReleaseRegistryAddresses = await readReleaseRegistry(
    releaseRegistry,
    publicClient
  )
  const vaultOriginal = await readV3VaultFactory(
    addresses.latestFactory,
    publicClient
  )
  addresses.vaultOriginal = vaultOriginal

  if (addresses.latestRelease !== constants.v3LatestReleaseFallback) {
    console.warn(
      'Latest Release in Constants file does not match Release Registry Contract.'
    )
  }
  await validateAddress(
    constants.v3LatestFactoryFallback,
    'v3LatestFactory',
    addresses.latestFactory
  )
  await validateAddress(
    constants.v3LatestTokenizedStrategyFallback,
    'v3LatestTokenizedStrategy',
    addresses.latestTokenizedStrategy
  )
  await validateAddress(
    constants.v3LatestVaultOriginalFallback,
    'v3VaultOriginal',
    addresses.vaultOriginal
  )
  return addresses
}

export const fetchAndCheckYearnV3Addresses = async (
  roleManager: Address,
  publicClient
) => {
  const addresses = await readYearnRoleManager(roleManager, publicClient)
  await validateAddressWithENS(
    publicClient,
    constants.yearnV3AccountantENS,
    constants.yearnV3AccountantFallback,
    'yearnV3Accountant',
    addresses.yearnAccountant
  )
  await validateAddressWithENS(
    publicClient,
    constants.yearnV3RegistryENS,
    constants.yearnV3RegistryFallback,
    'yearnV3Registry',
    addresses.yearnRegistry
  )
  await validateAddress(
    constants.yearnV3DebtAllocatorFallback,
    'yearnV3DebtAllocator',
    addresses.yearnDebtAllocator
  )
  return addresses
}
