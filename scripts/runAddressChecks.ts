import fs from 'fs'
import path from 'node:path'
import dotenv from 'dotenv'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../src/ethereum/v3Checks'
import { veYfiChecks } from '../src/ethereum/veYfiChecks'
import { checkYearnMultisigMembers } from '../src/ethereum/multisigChecks'
import { yfiContracts, veYfiContracts } from '../src/ethereum/constants'
import {
  ContractAddresses,
  AddressChecks,
  V3ContractAddresses,
} from '../src/ethereum/types'
import {
  DEFAULT_MAINNET_CHAIN_ID,
  createYearnPublicClient,
  getRpcUriOverridesFromEnv,
} from '../src/ethereum/publicRpc'
import { didAddressChecksPass, writeAddressCheckReport } from './addressCheckReport'

dotenv.config()

const publicClient = createYearnPublicClient(
  DEFAULT_MAINNET_CHAIN_ID,
  getRpcUriOverridesFromEnv(process.env)
)

const fetchAddresses = async () => {
  try {
    let v3CheckFlag: boolean | undefined
    const failedChecks: string[] = []
    v3CheckFlag = true
    const topLevelData = await fetchTopLevelAddressesFromENS(
      publicClient,
      v3CheckFlag,
      failedChecks
    )
    v3CheckFlag = topLevelData?.checkFlag

    if (!topLevelData)
      throw new Error('Failed to fetch top-level contract addresses')

    const protocolPeripheryData = await fetchAndCheckProtocolAddresses(
      topLevelData.addresses.v3ProtocolAddressProvider,
      publicClient,
      v3CheckFlag,
      failedChecks
    )
    v3CheckFlag = protocolPeripheryData?.checkFlag

    if (!protocolPeripheryData || !protocolPeripheryData?.addresses)
      throw new Error('Failed to fetch protocol addresses')

    const releaseRegistryData = await fetchAndCheckFromReleaseRegistry(
      topLevelData.addresses.v3ReleaseRegistry,
      publicClient,
      v3CheckFlag,
      failedChecks
    )
    v3CheckFlag = releaseRegistryData?.checkFlag
    if (!releaseRegistryData)
      throw new Error('Failed to fetch release registry addresses')

    const yearnV3Data = await fetchAndCheckYearnV3Addresses(
      topLevelData.addresses.v3RoleManager,
      publicClient,
      v3CheckFlag,
      failedChecks
    )
    v3CheckFlag = yearnV3Data?.checkFlag
    if (!yearnV3Data) throw new Error('Failed to fetch Yearn V3 addresses')

    const v3AddressData: V3ContractAddresses = {
      topLevel: topLevelData.addresses,
      protocolPeriphery: protocolPeripheryData.addresses,
      releaseRegistry: releaseRegistryData.addresses,
      yearnV3: yearnV3Data.addresses,
    }

    let veYfiCheckFlag: boolean | undefined
    veYfiCheckFlag = true
    const veYfiData = await veYfiChecks(
      publicClient,
      veYfiCheckFlag,
      failedChecks
    )
    veYfiCheckFlag = veYfiData?.checkFlag
    if (!veYfiData) throw new Error('Failed to fetch veYFI gauge addresses')

    let multisigCheckFlag: boolean | undefined
    multisigCheckFlag = true
    const multisigData = await checkYearnMultisigMembers(
      yearnV3Data.addresses.yearnDaddy,
      publicClient,
      multisigCheckFlag,
      failedChecks
    )
    multisigCheckFlag = multisigData?.checkFlag
    if (!multisigData) throw new Error('Failed to fetch multisig owners')

    const addressesData: ContractAddresses = {
      v3ContractAddresses: v3AddressData,
      yfiTokenContracts: yfiContracts,
      veYfiContracts: veYfiContracts,
      veYfiGaugeAddresses: veYfiData.veYfiGaugeAddresses,
      yearnMultisigMembers: multisigData.addresses,
    }

    const addressChecks: AddressChecks = {
      allV3ChecksPassed: v3CheckFlag,
      allVeYfiChecksPassed: veYfiCheckFlag,
      allMultisigChecksPassed: multisigCheckFlag,
      failedChecks,
      v3Checks: {
        topLevel: topLevelData.checks,
        protocolPeriphery: protocolPeripheryData.checks,
        releaseRegistry: releaseRegistryData.checks,
        yearnV3: yearnV3Data.checks,
      },
      veYfiChecks: veYfiData.veYfiGaugeChecks,
      multisigChecks: multisigData.checks,
    }
    if (!didAddressChecksPass(addressChecks)) {
      console.log('Addresses:', addressesData)
      console.log('Checks:', addressChecks)
    } else {
      console.log('All addresses are up to date')
    }
    return { addressesData, addressChecks }
  } catch (error) {
    console.error('Error fetching addresses:', error)
  }
}

export async function runAddressCheck(collect = fetchAddresses, directory = process.cwd()): Promise<number> {
  fs.rmSync(path.join(directory, 'scripts/fetchedAddressData.json'), { force: true })
  fs.rmSync(path.join(directory, 'issue_body.md'), { force: true })
  fs.writeFileSync(path.join(directory, 'all_checks_passed.txt'), 'false')
  try {
    const result = await collect()
    if (!result) throw new Error('Failed to fetch addresses')
    const passed = writeAddressCheckReport({
      status: 'complete',
      timeLastChecked: Math.floor(Date.now() / 1000),
      ...result,
    }, directory)
    console.log('allChecksPassed:', passed)
    console.log('Wrote fresh report to scripts/fetchedAddressData.json')
    return passed ? 0 : 1
  } catch (error) {
    console.error('Address checks could not complete:', error instanceof Error ? error.message : error)
    return 2
  }
}

if (import.meta.main) process.exitCode = await runAddressCheck()
