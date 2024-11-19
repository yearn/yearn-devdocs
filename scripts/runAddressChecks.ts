//TODO: change -v2 versions to be normal and delete v2
import fs from 'fs'
import dotenv from 'dotenv'
import { createPublicClient, http } from 'viem'
import {
  fetchTopLevelAddressesFromENS,
  fetchAndCheckFromReleaseRegistry,
  fetchAndCheckProtocolAddresses,
  fetchAndCheckYearnV3Addresses,
} from '../src/ethereum/checksV2'
import { yfiContracts, veYfiContracts } from '../src/ethereum/constants'
import { ContractAddresses, AddressChecks } from '../src/ethereum/types'
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
    let checkFlag: boolean | undefined
    const failedChecks: string[] = []
    checkFlag = true
    const topLevelData = await fetchTopLevelAddressesFromENS(
      publicClient,
      checkFlag,
      failedChecks
    )
    checkFlag = topLevelData?.checkFlag
    if (!topLevelData)
      throw new Error('Failed to fetch top-level contract addresses')

    const protocolPeripheryData = await fetchAndCheckProtocolAddresses(
      topLevelData.addresses.v3ProtocolAddressProvider,
      publicClient,
      checkFlag,
      failedChecks
    )
    checkFlag = protocolPeripheryData?.checkFlag
    if (!protocolPeripheryData || !protocolPeripheryData?.addresses)
      throw new Error('Failed to fetch protocol addresses')

    const releaseRegistryData = await fetchAndCheckFromReleaseRegistry(
      topLevelData.addresses.v3ReleaseRegistry,
      publicClient,
      checkFlag,
      failedChecks
    )
    checkFlag = releaseRegistryData?.checkFlag
    if (!releaseRegistryData)
      throw new Error('Failed to fetch release registry addresses')

    const yearnV3Data = await fetchAndCheckYearnV3Addresses(
      topLevelData.addresses.v3RoleManager,
      publicClient,
      checkFlag,
      failedChecks
    )
    checkFlag = yearnV3Data?.checkFlag
    if (!yearnV3Data) throw new Error('Failed to fetch Yearn V3 addresses')

    const addressesData: ContractAddresses = {
      topLevel: topLevelData.addresses,
      protocolPeriphery: protocolPeripheryData.addresses,
      releaseRegistry: releaseRegistryData.addresses,
      yearnV3: yearnV3Data.addresses,
      yfiTokenContracts: yfiContracts,
      veYfiContracts: veYfiContracts,
    }

    const addressChecks = {
      allChecksPassed: checkFlag,
      failedChecks,
      topLevel: topLevelData.checks,
      protocolPeriphery: protocolPeripheryData.checks,
      releaseRegistry: releaseRegistryData.checks,
      yearnV3: yearnV3Data.checks,
    }
    if (checkFlag === false || checkFlag === undefined) {
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
  let addressesData, addressChecks // declare variables outside the if block
  if (publicClient) {
    ;({ addressesData, addressChecks } = (await fetchAddresses()) as {
      addressesData: ContractAddresses
      addressChecks: AddressChecks
    })
  }
  console.log('writing report to scripts/fetchedAddressData.json')
  fs.writeFileSync(
    'scripts/fetchedAddressData.json',
    JSON.stringify({ addressesData, addressChecks }, null, 2)
  )
}

runAddressCheck()
