import { get } from 'http'
import {
  v3ProtocolAddressProviderABI,
  v3ReleaseRegistryABI,
  v3VaultFactoryABI,
  yearnV3RoleManagerABI,
} from './ABIs'
import { getContract, PublicClient, Address } from 'viem'

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
    router,
    keeper,
    aprOracle,
    releaseRegistry,
    commonReportTrigger,
    roleManagerFactory,
  ] = await Promise.all([
    contract.read.getRouter(),
    contract.read.getKeeper(),
    contract.read.getAprOracle(),
    contract.read.getReleaseRegistry(),
    contract.read.getCommonReportTrigger(),
    contract.read.getRoleManagerFactory(),
  ])

  return {
    router,
    keeper,
    aprOracle,
    releaseRegistry,
    commonReportTrigger,
    roleManagerFactory,
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
      contract.read.latestRelease(),
      contract.read.latestTokenizedStrategy(),
      contract.read.latestFactory(),
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

  const [vault_original] = await Promise.all([contract.read.vault_original()])

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
    contract.read.getAccountant(),
    contract.read.getDebtAllocator(),
    contract.read.getRegistry(),
  ])

  return {
    yearnBrain,
    yearnDaddy,
    yearnAccountant,
    yearnDebtAllocator,
    yearnRegistry,
  }
}
