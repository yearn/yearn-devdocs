import fs from 'node:fs'
import path from 'node:path'
import type { AddressChecks, ContractAddresses } from '../src/ethereum/types'

export type AddressCheckReport = {
  status: 'complete'
  timeLastChecked: number
  addressesData: ContractAddresses
  addressChecks: AddressChecks
}

export function didAddressChecksPass(checks: AddressChecks): boolean {
  return checks.allV3ChecksPassed === true &&
    checks.allVeYfiChecksPassed === true &&
    checks.allMultisigChecksPassed === true &&
    checks.failedChecks.length === 0
}

export function isCompleteAddressCheckReport(value: unknown): value is AddressCheckReport {
  if (!value || typeof value !== 'object') return false
  const report = value as AddressCheckReport
  const checks = report.addressChecks
  return report.status === 'complete' &&
    Number.isInteger(report.timeLastChecked) && report.timeLastChecked > 0 &&
    !!report.addressesData?.v3ContractAddresses &&
    typeof checks?.allV3ChecksPassed === 'boolean' &&
    typeof checks.allVeYfiChecksPassed === 'boolean' &&
    typeof checks.allMultisigChecksPassed === 'boolean' &&
    Array.isArray(checks.failedChecks) && checks.failedChecks.every(item => typeof item === 'string')
}

export function writeAddressCheckReport(report: AddressCheckReport, directory: string): boolean {
  if (!isCompleteAddressCheckReport(report)) throw new Error('Address checks returned an incomplete report')
  const passed = didAddressChecksPass(report.addressChecks)
  const reportPath = path.join(directory, 'scripts/fetchedAddressData.json')
  const temporaryPath = `${reportPath}.${process.pid}.tmp`
  fs.writeFileSync(temporaryPath, JSON.stringify(report, null, 2) + '\n')
  fs.renameSync(temporaryPath, reportPath)
  fs.writeFileSync(path.join(directory, 'all_checks_passed.txt'), String(passed))
  if (!passed) {
    const failures = report.addressChecks.failedChecks.length
      ? report.addressChecks.failedChecks
      : ['One or more address-check groups did not pass.']
    fs.writeFileSync(path.join(directory, 'issue_body.md'),
      ':robot::warning: **Automatic Address Checks have failed!**\n\n' +
      failures.map(failure => `- ${failure}`).join('\n') +
      '\n\nReview the on-chain observations against `src/ethereum/constants.ts` and the relevant documentation.\n')
  }
  return passed
}
