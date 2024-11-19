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
 * Resolves an Ethereum address from an ENS name, with fallback and validation checks.
 *
 * @param publicClient - The public client instance to interact with the Ethereum network.
 * @param ensName - The ENS name to resolve.
 * @param fallbackAddress - The fallback address to use if the ENS name cannot be resolved.
 * @param contractName - The name of the contract for logging and validation purposes.
 * @param failedChecks - An array to store any failed checks encountered during the resolution process.
 * @param addressFromProviderContract - An optional address from the on-chain provider contract for additional validation.
 * @returns An object containing the resolved address and a boolean indicating if all checks passed.
 */
const resolveAddressFromENS = async (
  publicClient: PublicClient,
  ensName: string,
  fallbackAddress: string,
  contractName: string,
  failedChecks: string[]
) => {
  let address = await publicClient.getEnsAddress({ name: normalize(ensName) })
  let isENSResolved = true
  const checkedFallback = getAddress(fallbackAddress)

  // if address is undefined, use the fallback address
  if (!address) {
    address = checkedFallback
    isENSResolved = false
    console.warn(`using fallback address for ${contractName}`)
    const failedCheck = `${contractName} ENS unresolved`
    if (!failedChecks.includes(failedCheck)) {
      failedChecks.push(failedCheck)
    }
  }

  return { address, isENSResolved }
}

/**
 * Validates if the provided address from the provider contract matches the fallback address.
 * If the addresses do not match, a warning is logged and the failed check is added to the failedChecks array.
 *
 * @param fallbackAddress - The fallback address to validate against.
 * @param contractName - The name of the contract being validated.
 * @param addressFromProviderContract - The address obtained from the provider contract.
 * @param failedChecks - An array to store the failed checks.
 * @returns A promise that resolves to a boolean indicating whether the addresses match.
 */
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
    const failedCheck = `${contractName}: ${addressFromProviderContract}`
    if (!failedChecks.includes(failedCheck)) {
      failedChecks.push(failedCheck)
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
    isENSResolved: v3ProtocolAddressProviderENSCheck,
  } = await resolveAddressFromENS(
    publicClient,
    constants.topLevel.protocolAddressProviderENS,
    constants.topLevel.protocolAddressProvider,
    'v3ProtocolAddressProvider',
    failedChecks
  )
  const v3ProtocolAddressProviderCheck = validateAddress(
    constants.topLevel.protocolAddressProvider,
    'v3ProtocolAddressProvider',
    v3ProtocolAddressProvider,
    failedChecks
  )

  const {
    address: v3ReleaseRegistry,
    isENSResolved: v3ReleaseRegistryENSCheck,
  } = await resolveAddressFromENS(
    publicClient,
    constants.topLevel.releaseRegistryENS,
    constants.topLevel.releaseRegistry,
    'v3ReleaseRegistry',
    failedChecks
  )
  const v3ReleaseRegistryCheck = validateAddress(
    constants.topLevel.releaseRegistry,
    'v3ReleaseRegistry',
    v3ReleaseRegistry,
    failedChecks
  )

  const { address: v3RoleManager, isENSResolved: v3RoleManagerENSCheck } =
    await resolveAddressFromENS(
      publicClient,
      constants.yearnV3RoleManager.roleManagerENS,
      constants.yearnV3RoleManager.roleManager,
      'v3RoleManager',
      failedChecks
    )
  const v3RoleManagerCheck = validateAddress(
    constants.yearnV3RoleManager.roleManager,
    'v3RoleManager',
    v3RoleManager,
    failedChecks
  )

  const addresses = {
    v3ProtocolAddressProvider,
    v3ReleaseRegistry,
    v3RoleManager,
  }

  const checks = {
    v3ProtocolAddressProviderCheck,
    v3ProtocolAddressProviderENSCheck,
    v3ReleaseRegistryCheck,
    v3ReleaseRegistryENSCheck,
    v3RoleManagerCheck,
    v3RoleManagerENSCheck,
  }

  if (
    !v3ProtocolAddressProviderCheck ||
    !v3ProtocolAddressProviderENSCheck ||
    !v3ReleaseRegistryCheck ||
    !v3ReleaseRegistryENSCheck ||
    !v3RoleManagerCheck ||
    !v3RoleManagerENSCheck
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
  const { isENSResolved: aprOracleENSCheck } = await resolveAddressFromENS(
    publicClient,
    constants.protocolPeriphery.aprOracleENS,
    constants.protocolPeriphery.aprOracle,
    'v3AprOracle',
    failedChecks
  )
  const aprOracleCheck = await validateAddress(
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
    !aprOracleENSCheck ||
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
    const latestRelease = `latest V3 Release: ${addresses.latestRelease}`
    failedChecks.push(latestRelease)
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
      failedChecks.push(
        `${releaseKey}VaultOriginal: ${fetchedRelease.vaultOriginal}`
      )
    }
    if (fetchedRelease.factory !== constantRelease.factory) {
      console.warn(`Factory for release ${releaseNumber} does not match.`)
      matchResults[`is${releaseKey}FactoryMatch`] = false
      checkFlag = false
      failedChecks.push(`${releaseKey}Factory: ${fetchedRelease.factory}`)
    }
    if (
      fetchedRelease.tokenizedStrategy !== constantRelease.tokenizedStrategy
    ) {
      console.warn(
        `TokenizedStrategy for release ${releaseNumber} does not match.`
      )
      matchResults[`is${releaseKey}TokenizedStrategyMatch`] = false
      checkFlag = false
      failedChecks.push(
        `${releaseKey}TokenizedStrategy: ${fetchedRelease.tokenizedStrategy}`
      )
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

  const { isENSResolved: accountantENSCheck } = await resolveAddressFromENS(
    publicClient,
    constants.yearnV3Contracts.accountantENS,
    constants.yearnV3Contracts.accountant,
    'yearnV3Accountant',
    failedChecks
  )
  const accountantCheck = await validateAddress(
    constants.yearnV3Contracts.accountant,
    'yearnV3Accountant',
    addresses.yearnAccountant,
    failedChecks
  )

  const { isENSResolved: registryENSCheck } = await resolveAddressFromENS(
    publicClient,
    constants.yearnV3Contracts.registryENS,
    constants.yearnV3Contracts.registry,
    'yearnV3Registry',
    failedChecks
  )
  const registryCheck = await validateAddress(
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

  if (
    !accountantCheck ||
    !accountantENSCheck ||
    !registryCheck ||
    !registryENSCheck ||
    !debtAllocatorCheck
  ) {
    checkFlag = false
  }

  const checks = {
    accountantCheck,
    registryCheck,
    debtAllocatorCheck,
  }
  return { addresses, checks, checkFlag }
}
