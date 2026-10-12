import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { didAddressChecksPass, isCompleteAddressCheckReport } from './addressCheckReport'

type RunCommand = (script: string, directory: string) => number
const runCommand: RunCommand = (script, directory) => {
  const result = spawnSync('bun', ['run', script], { cwd: directory, stdio: 'inherit' })
  if (result.error) console.error(result.error.message)
  return result.status ?? 2
}

export function runWithAddressChecks(script: 'build:site' | 'start-no-check', run: RunCommand = runCommand, directory = process.cwd()): number {
  const reportPath = path.join(directory, 'scripts/fetchedAddressData.json')
  // Even an early crash in the checker must not leave an old green snapshot.
  fs.rmSync(reportPath, { force: true })
  const startedAt = Math.floor(Date.now() / 1000)
  const result = run('runAddressCheck', directory)
  if (result !== 0 && result !== 1) {
    console.error(`Address checks could not complete. ${script} stopped.`)
    return 2
  }
  try {
    const report: unknown = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
    if (!isCompleteAddressCheckReport(report) || report.timeLastChecked < startedAt) {
      throw new Error('Missing, stale, or incomplete address-check report')
    }
    if ((result === 0) !== didAddressChecksPass(report.addressChecks)) {
      throw new Error('Address-check exit status disagrees with its report')
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    return 2
  }
  if (result === 1) console.warn('Address mismatches found. Proceeding with the fresh warning report.')
  return run(script, directory)
}

if (import.meta.main) {
  const script = process.argv[2]
  if (script !== 'build:site' && script !== 'start-no-check') {
    console.error('Choose build:site or start-no-check')
    process.exitCode = 2
  } else {
    process.exitCode = runWithAddressChecks(script)
  }
}
