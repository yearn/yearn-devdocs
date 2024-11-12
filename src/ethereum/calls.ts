import { getContract, PublicClient, Address, getAddress } from 'viem'
import {
  v3ProtocolAddressProviderABI,
  v3ReleaseRegistryABI,
  v3VaultFactoryABI,
  yearnV3RoleManagerABI,
  v3VaultFactoryBlueprintABI,
} from './ABIs'
import * as constants from './constants'
import { ReleaseDataMap } from './types'

const useFallback = (contractName: string, fallback: string): Address => {
  console.warn(
    `RPC call failed for ${contractName}. Using fallback address: ${fallback}`
  )
  return getAddress(fallback)
}

export const getProtocolContractAddresses = async (
  address: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address,
    abi: v3ProtocolAddressProviderABI,
    client: publicClient,
  })

  const [
    v3Router,
    v3AprOracle,
    // v3ReleaseRegistry,
    v3ReportTrigger,
    v3RoleManagerFactory,
  ] = await Promise.all([
    contract.read
      .getRouter()
      .catch(() =>
        useFallback('v3Router', constants.v3PeripheryContracts.router)
      ),
    contract.read
      .getAprOracle()
      .catch(() =>
        useFallback('v3AprOracle', constants.v3PeripheryContracts.aprOracle)
      ),
    // contract.read
    //   .getReleaseRegistry()
    //   .catch(() =>
    //     useFallback(
    //       'v3ReleaseRegistry',
    //       constants.v3PeripheryContracts.releaseRegistry
    //     )
    //   ),
    contract.read
      .getCommonReportTrigger()
      .catch(() =>
        useFallback(
          'v3ReportTrigger',
          constants.v3PeripheryContracts.commonReportTrigger
        )
      ),
    contract.read
      .getRoleManagerFactory()
      .catch(() =>
        useFallback(
          'v3RoleManagerFactory',
          constants.v3PeripheryContracts.roleManagerFactory
        )
      ),
  ])

  return {
    router: v3Router,
    aprOracle: v3AprOracle,
    // releaseRegistry: v3ReleaseRegistry,
    commonReportTrigger: v3ReportTrigger,
    roleManagerFactory: v3RoleManagerFactory,
  }
}

/**
 * to Get v3 Templates from each release:
 * 1. loop through the `factories` array in the `v3ReleaseRegistry` contract with `numReleases`-1 as the upper bound. save the factory address for each release.
 * 2. For each factory, call `apiVersion` to get the release number.
 * 3. For each factory, call `vault_original` to get the vault address.
 * 4. Save data to a map with the release number as the key and the the vault_original and vault factory addresses as values.
 * 5. loop through the `tokenizedStrategy` array in the `v3ReleaseRegistry` contract with `numReleases`-1 as the upper bound.
 * save the tokenizedStrategy address for each release to the map.
 */

export const readReleaseRegistryAll = async (
  registryAddress: Address,
  publicClient: PublicClient
): Promise<ReleaseDataMap> => {
  const contract = getContract({
    address: registryAddress,
    abi: v3ReleaseRegistryABI,
    client: publicClient,
  })

  const latestRelease = await contract.read.latestRelease()
  const numReleases = await contract.read.numReleases()
  const releaseDataMap: ReleaseDataMap = { latestRelease }

  // Loop through the `factories` array
  for (let i = 0; i < numReleases; i++) {
    const tokenizedStrategyAddress = await contract.read.tokenizedStrategies([
      BigInt(i),
    ]) // Modified to use BigInt directly
    const factoryAddress = await contract.read.factories([BigInt(i)]) // Modified to use BigInt directly
    const factoryContract = getContract({
      address: factoryAddress,
      abi: v3VaultFactoryABI,
      client: publicClient,
    })
    const releaseNumber = await factoryContract.read.apiVersion()
    const vaultAddress = await factoryContract.read
      .vault_original()
      .catch(async () => {
        // Re-initialize factoryContract with v3VaultFactoryBlueprintABI if fallback occurs
        const factoryContractWithBlueprint = getContract({
          address: factoryAddress,
          abi: v3VaultFactoryBlueprintABI,
          client: publicClient,
        })
        return factoryContractWithBlueprint.read.vault_blueprint()
      })

    releaseDataMap[releaseNumber] = {
      vaultOriginal: vaultAddress,
      factory: factoryAddress,
      tokenizedStrategy: tokenizedStrategyAddress,
    }
  }
  return releaseDataMap
}

export const readYearnRoleManager = async (
  roleManagerAddress: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address: roleManagerAddress,
    abi: yearnV3RoleManagerABI,
    client: publicClient,
  })

  const [
    yearnBrain,
    yearnDaddy,
    yearnAccountant,
    yearnDebtAllocator,
    yearnRegistry,
  ] = await Promise.all([
    contract.read.getBrain(),
    contract.read.getDaddy(),
    contract.read
      .getAccountant()
      .catch(() =>
        useFallback('yearnV3Accountant', constants.yearnV3Contracts.accountant)
      ),
    contract.read
      .getDebtAllocator()
      .catch(() =>
        useFallback(
          'yearnV3DebtAllocator',
          constants.yearnV3Contracts.debtAllocator
        )
      ),
    contract.read
      .getRegistry()
      .catch(() =>
        useFallback('yearnV3Registry', constants.yearnV3Contracts.registry)
      ),
  ])

  return {
    yearnBrain,
    yearnDaddy,
    yearnAccountant,
    yearnDebtAllocator,
    yearnRegistry,
  }
}
