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
 * @returns An object containing the resolved address, a boolean indicating if the address was resolved, and a boolean indicating if the resolved address matches the fallback address.
 */
const resolveAddress = async (
  publicClient: PublicClient,
  ensName: string,
  fallbackAddress: string,
  contractName: string,
  failedChecks: string[]
) => {
  const checkedFallback = getAddress(fallbackAddress)
  let address = await publicClient.getEnsAddress({ name: normalize(ensName) })
  let isENSResolved = true

  // if address is undefined, use the fallback address
  if (!address) {
    address = checkedFallback
    isENSResolved = false
    console.warn(`using fallback address for ${contractName}`)
    if (!failedChecks.includes(contractName)) {
      failedChecks.push(contractName)
    }
  }

  // if address exists and !== fallbackAddress, warn to update the fallback address
  const match = address === checkedFallback

  if (address && !match) {
    isENSResolved = false
    console.warn(
      `Resolved ${contractName} ENS address does not match the fallback address. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
    if (!failedChecks.includes(contractName)) {
      failedChecks.push(contractName)
    }
  }

  return { address, isENSResolved }
}

/**
 * Validates an Ethereum address against an ENS name and a fallback address.
 *
 * @param publicClient - The public client used to resolve the ENS name.
 * @param ensName - The ENS name to resolve.
 * @param fallbackAddress - The fallback address to use if the ENS name cannot be resolved.
 * @param contractName - The name of the contract for logging purposes.
 * @param addressFromProviderContract - The address obtained from the Protocol Address Provider Contract.
 * @returns A promise that resolves to a boolean indicating whether the addresses match.
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
  addressFromProviderContract: string,
  failedChecks: string[]
) {
  // Resolve the address from ENS
  const { address: resolvedAddress, isENSResolved } = await resolveAddress(
    publicClient,
    ensName,
    fallbackAddress,
    contractName,
    failedChecks
  )

  // Check if the actual address matches the resolved ENS address
  const ensMatch =
    getAddress(addressFromProviderContract) === getAddress(resolvedAddress)
  if (!ensMatch) {
    console.warn(
      `${contractName} ENS address does not match the Protocol Address Provider Contract. Check the ENS address and check the ABI in /src/ethereum/constants.ts.`
    )
    if (!failedChecks.includes(contractName)) {
      failedChecks.push(contractName)
    }
  }

  // Check if the actual address matches the fallback address
  const fallbackMatch =
    getAddress(addressFromProviderContract) === getAddress(fallbackAddress)
  if (!fallbackMatch) {
    console.warn(
      `${contractName} Fallback address in Constants does not match Protocol Address Provider Contract. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
    if (!failedChecks.includes(contractName)) {
      failedChecks.push(contractName)
    }
  }
  const matches = ensMatch && fallbackMatch && isENSResolved
  // Return true if both matches, otherwise false
  return matches
}

async function validateAddress(
  fallbackAddress: string,
  contractName: string,
  addressFromProviderContract: string,
  failedChecks: string[]
) {
  const match =
    getAddress(addressFromProviderContract) === getAddress(fallbackAddress)
  if (!match) {
    console.warn(
      `${contractName} Fallback address in Constants does not match Provider Contract. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
    if (!failedChecks.includes(contractName)) {
      failedChecks.push(contractName)
    }
  }
  return match
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
export const fetchTopLevelAddressesFromENS = async (
  publicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
) => {
  if (!publicClient) {
    console.error('publicClient is null')
    return
  }

  const {
    address: v3ProtocolAddressProvider,
    isENSResolved: v3ProtocolAddressProviderCheck,
  } = await resolveAddress(
    publicClient,
    constants.topLevel.protocolAddressProviderENS,
    constants.topLevel.protocolAddressProvider,
    'v3ProtocolAddressProvider',
    failedChecks
  )

  const { address: v3ReleaseRegistry, isENSResolved: v3ReleaseRegistryCheck } =
    await resolveAddress(
      publicClient,
      constants.topLevel.releaseRegistryENS,
      constants.topLevel.releaseRegistry,
      'v3ReleaseRegistry',
      failedChecks
    )

  const { address: v3RoleManager, isENSResolved: v3RoleManagerCheck } =
    await resolveAddress(
      publicClient,
      constants.yearnV3RoleManager.roleManagerENS,
      constants.yearnV3RoleManager.roleManager,
      'v3RoleManager',
      failedChecks
    )

  const addresses = {
    v3ProtocolAddressProvider,
    v3ReleaseRegistry,
    v3RoleManager,
  }

  const checks = {
    v3ProtocolAddressProviderCheck,
    v3ReleaseRegistryCheck,
    v3RoleManagerCheck,
  }

  if (
    !v3ProtocolAddressProviderCheck ||
    !v3ReleaseRegistryCheck ||
    !v3RoleManagerCheck
  ) {
    checkFlag = false
  }

  return {
    addresses,
    checks,
    checkFlag,
  }
}

/**
 * Fetches protocol addresses from the provided Protocol Address Provider and validates them against constants and ENS.
 *
 * @param v3ProtocolAddressProvider - The address of the Protocol Address Provider contract.
 * @param publicClient - The public client instance used to interact with the Ethereum network.
 * @returns The resolved protocol addresses and checks that they match the saved constants.
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
  publicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
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
  const aprOracleCheck = await validateAddressWithENS(
    publicClient,
    constants.protocolPeriphery.aprOracleENS,
    constants.protocolPeriphery.aprOracle,
    'v3AprOracle',
    addresses.aprOracle,
    failedChecks
  )
  const routerCheck = await validateAddress(
    constants.protocolPeriphery.router,
    'v3Router',
    addresses.router,
    failedChecks
  )
  const reportTriggerCheck = await validateAddress(
    constants.protocolPeriphery.commonReportTrigger,
    'v3ReportTrigger',
    addresses.commonReportTrigger,
    failedChecks
  )
  const roleManagerFactoryCheck = await validateAddress(
    constants.protocolPeriphery.roleManagerFactory,
    'v3RoleManagerFactory',
    addresses.roleManagerFactory,
    failedChecks
  )
  if (
    !aprOracleCheck ||
    !routerCheck ||
    !reportTriggerCheck ||
    !roleManagerFactoryCheck
  ) {
    checkFlag = false
  }
  const checks = {
    aprOracleCheck,
    routerCheck,
    reportTriggerCheck,
    roleManagerFactoryCheck,
  }
  return {
    addresses,
    checks,
    checkFlag,
  }
}

export const fetchAndCheckFromReleaseRegistry = async (
  releaseRegistry: Address,
  publicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
) => {
  if (!publicClient) {
    console.error('publicClient is null')
    return
  }
  const addresses: ReleaseDataMap = await readReleaseRegistryAll(
    releaseRegistry,
    publicClient
  )
  let hasLatestRelease = true
  // Compare the fetched addresses with the constants
  if (addresses.latestRelease !== constants.releaseRegistry.latestRelease) {
    console.warn(
      'Latest Release in Constants file does not match Release Registry Contract.'
    )
    hasLatestRelease = false
    failedChecks.push('latestV3Release')
  }
  const checks = { hasLatestRelease }

  for (const releaseNumber in addresses) {
    if (releaseNumber === 'latestRelease') continue // Skip the latestRelease key
    const fetchedRelease = addresses[releaseNumber] as ReleaseData
    const constantRelease = constants.releaseRegistry[releaseNumber]
    if (!constantRelease) {
      console.warn(`Release ${releaseNumber} is missing in constants.`)
      failedChecks.push(`V3 Release ${releaseNumber} is missing`)
      continue
    }

    // Create an object to store dynamically named boolean variables
    const matchResults = {}

    // Dynamically create boolean variables for each contract
    const releaseKey = releaseNumber.replace(/\./g, '') // Remove periods from releaseNumber
    matchResults[`is${releaseKey}VaultOriginalMatch`] = true
    matchResults[`is${releaseKey}FactoryMatch`] = true
    matchResults[`is${releaseKey}TokenizedStrategyMatch`] = true

    if (fetchedRelease.vaultOriginal !== constantRelease.vaultOriginal) {
      console.warn(`vaultOriginal for release ${releaseNumber} does not match.`)
      matchResults[`is${releaseKey}VaultOriginalMatch`] = false
      checkFlag = false
      failedChecks.push(`${releaseKey}VaultOriginal`)
    }
    if (fetchedRelease.factory !== constantRelease.factory) {
      console.warn(`Factory for release ${releaseNumber} does not match.`)
      matchResults[`is${releaseKey}FactoryMatch`] = false
      checkFlag = false
      failedChecks.push(`${releaseKey}Factory`)
    }
    if (
      fetchedRelease.tokenizedStrategy !== constantRelease.tokenizedStrategy
    ) {
      console.warn(
        `TokenizedStrategy for release ${releaseNumber} does not match.`
      )
      matchResults[`is${releaseKey}TokenizedStrategyMatch`] = false
      checkFlag = false
      failedChecks.push(`${releaseKey}TokenizedStrategy`)
    }

    Object.assign(checks, matchResults)
  }
  return { addresses, checks, checkFlag }
}

/**
 * Fetches and checks Yearn V3 addresses.
 *
 * This function retrieves addresses from the Yearn role manager and validates them against
 * predefined Yearn V3 contract addresses and ENS names.
 *
 * @param roleManager - The address of the Yearn role manager.
 * @param publicClient - The public client used to interact with the blockchain.
 * @returns An object containing the fetched addresses and the results of the checks.
 */
export const fetchAndCheckYearnV3Addresses = async (
  roleManager: Address,
  publicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
) => {
  const addresses = await readYearnRoleManager(roleManager, publicClient)
  const accountantCheck = await validateAddressWithENS(
    publicClient,
    constants.yearnV3Contracts.accountantENS,
    constants.yearnV3Contracts.accountant,
    'yearnV3Accountant',
    addresses.yearnAccountant,
    failedChecks
  )
  const registryCheck = await validateAddressWithENS(
    publicClient,
    constants.yearnV3Contracts.registryENS,
    constants.yearnV3Contracts.registry,
    'yearnV3Registry',
    addresses.yearnRegistry,
    failedChecks
  )
  const debtAllocatorCheck = await validateAddress(
    constants.yearnV3Contracts.debtAllocator,
    'yearnV3DebtAllocator',
    addresses.yearnDebtAllocator,
    failedChecks
  )

  if (!accountantCheck || !registryCheck || !debtAllocatorCheck) {
    checkFlag = false
  }

  const checks = {
    accountantCheck,
    registryCheck,
    debtAllocatorCheck,
  }
  return { addresses, checks, checkFlag }
}
