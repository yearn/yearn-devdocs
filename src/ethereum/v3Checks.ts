import * as constants from './constants'
import {
  getProtocolContractAddresses,
  readReleaseRegistryAll,
  readYearnRoleManager,
} from './v3Calls'
import { Address, PublicClient, getAddress } from 'viem'
import { V3ReleaseDataMap, V3ReleaseData } from './types'
import { validateAddress, resolveAddressFromENS } from './helpers'

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
  console.log('validating top level V3 addresses...')
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
  console.log('Top level V3 address validation complete. \n')

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
  console.log('validating V3 protocol addresses...')
  // Handle undefined addresses
  const aprOracle =
    addresses.aprOracle || '0x0000000000000000000000000000000000000000'
  const router =
    addresses.router || '0x0000000000000000000000000000000000000000'
  const commonReportTrigger =
    addresses.commonReportTrigger ||
    '0x0000000000000000000000000000000000000000'
  const roleManagerFactory =
    addresses.roleManagerFactory || '0x0000000000000000000000000000000000000000'

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
    aprOracle,
    failedChecks
  )

  const routerCheck = await validateAddress(
    constants.protocolPeriphery.router,
    'v3Router',
    router,
    failedChecks
  )
  const reportTriggerCheck = await validateAddress(
    constants.protocolPeriphery.commonReportTrigger,
    'v3ReportTrigger',
    commonReportTrigger,
    failedChecks
  )
  const roleManagerFactoryCheck = await validateAddress(
    constants.protocolPeriphery.roleManagerFactory,
    'v3RoleManagerFactory',
    roleManagerFactory,
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
  console.log('V3 protocol address validation complete. \n')
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
  const addresses: V3ReleaseDataMap = await readReleaseRegistryAll(
    releaseRegistry,
    publicClient
  )
  console.log('validating Release Registry addresses...')
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
    const fetchedRelease = addresses[releaseNumber] as V3ReleaseData
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
  console.log('Release Registry address validation complete. \n')
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

  console.log('validating Yearn specific V3 periphery addresses...')
  const yearnAccountant =
    addresses.yearnAccountant || '0x0000000000000000000000000000000000000000'
  const yearnRegistry =
    addresses.yearnRegistry || '0x0000000000000000000000000000000000000000'
  const yearnDebtAllocator =
    addresses.yearnDebtAllocator || '0x0000000000000000000000000000000000000000'

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
    yearnAccountant,
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
    yearnRegistry,
    failedChecks
  )

  const debtAllocatorCheck = await validateAddress(
    constants.yearnV3Contracts.debtAllocator,
    'yearnV3DebtAllocator',
    yearnDebtAllocator,
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
  console.log('Yearn V3 Periphery address validation complete. \n')
  return { addresses, checks, checkFlag }
}
