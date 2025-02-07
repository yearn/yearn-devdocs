import fs from 'fs'
import dotenv from 'dotenv'
import { createPublicClient, http } from 'viem'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../src/ethereum/v3Checks'
import { veYfiChecks } from '../src/ethereum/veYfiChecks'
import { yfiContracts, veYfiContracts } from '../src/ethereum/constants'
import {
  ContractAddresses,
  AddressChecks,
  V3ContractAddresses,
} from '../src/ethereum/types'
import { mainnet } from 'viem/chains'

dotenv.config()

const alchemyKey = process.env.ALCHEMY_API_KEY

const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  transport: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`),
})

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

    const addressesData: ContractAddresses = {
      v3ContractAddresses: v3AddressData,
      yfiTokenContracts: yfiContracts,
      veYfiContracts: veYfiContracts,
      veYfiGaugeAddresses: veYfiData.veYfiGaugeAddresses,
    }

    const addressChecks: AddressChecks = {
      allV3ChecksPassed: v3CheckFlag,
      allVeYfiChecksPassed: veYfiCheckFlag,
      failedChecks,
      v3Checks: {
        topLevel: topLevelData.checks,
        protocolPeriphery: protocolPeripheryData.checks,
        releaseRegistry: releaseRegistryData.checks,
        yearnV3: yearnV3Data.checks,
      },
      veYfiChecks: veYfiData.veYfiGaugeChecks,
    }
    if (
      v3CheckFlag === false ||
      v3CheckFlag === undefined ||
      veYfiCheckFlag === false ||
      veYfiCheckFlag === undefined
    ) {
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

async function runAddressCheck() {
  let addressesData: ContractAddresses = {} as ContractAddresses // initialize with default value
  let addressChecks: AddressChecks = {} as AddressChecks // initialize with default value
  if (publicClient) {
    const result = await fetchAddresses()
    if (result) {
      // added null check for result
      addressesData = result.addressesData
      addressChecks = result.addressChecks
    } else {
      throw new Error('Failed to fetch addresses')
    }
  }
  const timeLastChecked = Math.floor(Date.now() / 1000) // get current time in Unix format
  console.log('writing report to scripts/fetchedAddressData.json')
  fs.writeFileSync(
    'scripts/fetchedAddressData.json',
    JSON.stringify({ timeLastChecked, addressesData, addressChecks }, null, 2)
  )
}

runAddressCheck()
