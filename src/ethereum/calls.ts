import { getContract, PublicClient, Address, getAddress } from 'viem'
import {
  v3ProtocolAddressProviderABI,
  v3ReleaseRegistryABI,
  v3VaultFactoryABI,
  yearnV3RoleManagerABI,
} from './ABIs'
import * as constants from './constants' // Import fallback constants

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
    v3ReleaseRegistry,
    v3ReportTrigger,
    v3RoleManagerFactory,
  ] = await Promise.all([
    contract.read
      .getRouter()
      .catch(() => useFallback('v3Router', constants.v3RouterFallback)),
    contract.read
      .getAprOracle()
      .catch(() => useFallback('v3AprOracle', constants.v3AprOracleFallback)),
    contract.read
      .getReleaseRegistry()
      .catch(() =>
        useFallback('v3ReleaseRegistry', constants.v3ReleaseRegistryFallback)
      ),
    contract.read
      .getCommonReportTrigger()
      .catch(() =>
        useFallback('v3ReportTrigger', constants.v3ReportTriggerFallback)
      ),
    contract.read
      .getRoleManagerFactory()
      .catch(() =>
        useFallback(
          'v3RoleManagerFactory',
          constants.v3RoleManagerFactoryFallback
        )
      ),
  ])

  return {
    router: v3Router,
    aprOracle: v3AprOracle,
    releaseRegistry: v3ReleaseRegistry,
    commonReportTrigger: v3ReportTrigger,
    roleManagerFactory: v3RoleManagerFactory,
  }
}

export const readReleaseRegistry = async (
  registryAddress: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address: registryAddress,
    abi: v3ReleaseRegistryABI,
    client: publicClient,
  })

  const [latestRelease, latestTokenizedStrategy, latestFactory] =
    await Promise.all([
      contract.read
        .latestRelease()
        .catch(() =>
          useFallback('latestV3Release', constants.v3LatestReleaseFallback)
        ),
      contract.read
        .latestTokenizedStrategy()
        .catch(() =>
          useFallback(
            'latestV3TokenizedStrategy',
            constants.v3LatestTokenizedStrategyFallback
          )
        ),
      contract.read
        .latestFactory()
        .catch(() =>
          useFallback('latestV3Factory', constants.v3LatestFactoryFallback)
        ),
    ])

  return {
    latestRelease,
    latestTokenizedStrategy,
    latestFactory,
  }
}

export const readV3VaultFactory = async (
  factoryAddress: Address,
  publicClient: PublicClient
) => {
  const contract = getContract({
    address: factoryAddress,
    abi: v3VaultFactoryABI,
    client: publicClient,
  })

  const [vault_original] = await Promise.all([
    contract.read
      .vault_original()
      .catch(() =>
        useFallback(
          'latestV3VaultOriginal',
          constants.v3LatestVaultOriginalFallback
        )
      ),
  ])

  return vault_original
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
        useFallback('yearnV3Accountant', constants.yearnV3AccountantFallback)
      ),
    contract.read
      .getDebtAllocator()
      .catch(() =>
        useFallback(
          'yearnV3DebtAllocator',
          constants.yearnV3DebtAllocatorFallback
        )
      ),
    contract.read
      .getRegistry()
      .catch(() =>
        useFallback('yearnV3Registry', constants.yearnV3RegistryFallback)
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
