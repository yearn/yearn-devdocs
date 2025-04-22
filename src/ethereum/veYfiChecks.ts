import { validateAddress } from './helpers'
import * as constants from './constants'
import { getGaugeAddresses } from './veYfiCalls'
import { getAddress } from 'viem'
import { GaugeCheckRecord, GaugeAddressRecord } from './types'

export const veYfiChecks = async (
  publicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
) => {
  const gaugeRegistry = getAddress(constants.veYfiContracts.yfiGaugeRegistry)
  const { numberOfGauges, gaugeAddresses } = await getGaugeAddresses(
    gaugeRegistry,
    publicClient
  )
  console.log('validating veYFI Gauge addresses...')

  if (numberOfGauges < 1) {
    console.warn('No gauges found')
    failedChecks.push('No gauges found')
  }
  if (numberOfGauges !== constants.veYfiGauges.length) {
    console.warn('Number of gauges does not match number of fallback addresses')
    failedChecks.push(
      'Number of gauges does not match number of fallback addresses'
    )
  }
  const veYfiGaugeChecks: GaugeCheckRecord = {}
  const veYfiGaugeAddresses: GaugeAddressRecord = {}

  // Validate each entry in gaugeAddresses against the corresponding address in constants.veYfiGauges
  for (const [index, address] of gaugeAddresses.entries()) {
    const expectedAddress = constants.veYfiGauges[index].address
    const expectedName = constants.veYfiGauges[index].name
    console.log(
      `Validating ${expectedName} (${expectedAddress}) against ${address}...`
    )
    const isValid = await validateAddress(
      expectedAddress,
      expectedName,
      address,
      failedChecks
    )
    veYfiGaugeChecks[expectedName] = isValid
    veYfiGaugeAddresses[expectedName] = address
  }

  // Check if any of the checks are false
  for (const checkRecordKey of Object.keys(veYfiGaugeChecks)) {
    const checkRecord = veYfiGaugeChecks[checkRecordKey]
    if (!checkRecord) {
      checkFlag = false
      break
    }
  }
  console.log('veYFI Gauge address validation complete. \n')
  return { veYfiGaugeAddresses, veYfiGaugeChecks, checkFlag }
}
