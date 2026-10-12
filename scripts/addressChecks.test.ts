import { afterEach, describe, expect, test } from 'bun:test'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import type { PublicClient } from 'viem'
import { BaseError, HttpRequestError, ContractFunctionZeroDataError } from 'viem'
import type { AddressChecks, ContractAddresses, V3ReleaseData } from '../src/ethereum/types'
import { releaseRegistry, veYfiGauges } from '../src/ethereum/constants'
import { fetchAndCheckFromReleaseRegistry } from '../src/ethereum/v3Checks'
import {
  getProtocolContractAddresses, readYearnRoleManager, readReleaseRegistryAll,
  getAuctionFactoryFromRegistry, getFeeRecipientFromAccountant,
} from '../src/ethereum/v3Calls'
import { didAddressChecksPass, writeAddressCheckReport } from './addressCheckReport'
import { runAddressCheck } from './runAddressChecks'
import { runWithAddressChecks } from './withAddressChecks'
import { veYfiChecks } from '../src/ethereum/veYfiChecks'
import snapshot from './fetchedAddressData.json'

const directories: string[] = []
afterEach(() => {
  for (const directory of directories.splice(0)) fs.rmSync(directory, { recursive: true, force: true })
})
function directory() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yearn-address-checks-'))
  fs.mkdirSync(path.join(root, 'scripts'))
  directories.push(root)
  return root
}
function result(failedChecks: string[] = []) {
  return {
    addressesData: snapshot.addressesData as ContractAddresses,
    addressChecks: {
      ...snapshot.addressChecks,
      allV3ChecksPassed: true,
      allVeYfiChecksPassed: true,
      allMultisigChecksPassed: true,
      failedChecks,
    } as AddressChecks,
  }
}
function report(root: string, passed: boolean, timestamp = Math.floor(Date.now() / 1000)) {
  return writeAddressCheckReport({ status: 'complete', timeLastChecked: timestamp,
    ...result(passed ? [] : ['latest release mismatch']),
  }, root)
}
function registryClient(entries: [string, V3ReleaseData][], latestRelease: string = releaseRegistry.latestRelease) {
  // Exercise viem's contract wrappers and the real registry reader without RPC.
  return {
    readContract: async ({ address, functionName, args }: { address: string; functionName: string; args?: bigint[] }) => {
      if (functionName === 'latestRelease') return latestRelease
      if (functionName === 'numReleases') return BigInt(entries.length)
      if (functionName === 'factories') return entries[Number(args![0])][1].factory
      if (functionName === 'tokenizedStrategies') return entries[Number(args![0])][1].tokenizedStrategy
      const entry = entries.find(([, data]) => data.factory.toLowerCase() === address.toLowerCase())
      if (functionName === 'apiVersion') return entry![0]
      if (functionName === 'vault_original') return entry![1].vaultOriginal
      throw new Error(`Unexpected read: ${functionName}`)
    },
  } as unknown as PublicClient
}
const registryEntries = () => Object.entries(releaseRegistry)
  .filter(([key]) => key !== 'latestRelease') as [string, V3ReleaseData][]
async function checkRegistry(entries = registryEntries(), latest: string = releaseRegistry.latestRelease, incoming = true) {
  const failures: string[] = []
  const checked = await fetchAndCheckFromReleaseRegistry(
    '0x0000000000000000000000000000000000000001', registryClient(entries, latest), incoming, failures
  )
  return { ...checked!, failures }
}

describe('release-registry validation', () => {
  test('matching releases pass', async () => {
    const checked = await checkRegistry()
    expect(checked.checkFlag).toBe(true)
    expect(checked.failures).toEqual([])
  })
  test('latest-release mismatch fails even when every address matches', async () => {
    const checked = await checkRegistry(registryEntries(), '3.1.0')
    expect(checked.checkFlag).toBe(false)
    expect(checked.checks.hasLatestRelease).toBe(false)
    expect(checked.failures[0]).toContain('expected 3.1.1')
  })
  test('a documented release absent from the registry is not silently skipped', async () => {
    const checked = await checkRegistry(registryEntries().filter(([name]) => name !== '3.1.1'))
    expect(checked.checkFlag).toBe(false)
    expect(checked.checks.has311Release).toBe(false)
    expect(checked.failures).toContain('V3 Release 3.1.1 is missing from the release registry')
  })
  test('an on-chain release absent from constants fails', async () => {
    const checked = await checkRegistry([...registryEntries(), ['3.2.0', {
      ...releaseRegistry['3.1.1'], factory: '0x0000000000000000000000000000000000000002',
    }]])
    expect(checked.checkFlag).toBe(false)
    expect(checked.failures).toContain('V3 Release 3.2.0 is missing')
  })
  test('address mismatches still fail', async () => {
    const entries = registryEntries().map(([name, value]) => [name, name === '3.1.1'
      ? { ...value, tokenizedStrategy: '0x0000000000000000000000000000000000000003' }
      : value] as [string, V3ReleaseData])
    expect((await checkRegistry(entries)).checkFlag).toBe(false)
  })
  test('matching registry data never clears an earlier failure', async () => {
    expect((await checkRegistry(registryEntries(), releaseRegistry.latestRelease, false)).checkFlag).toBe(false)
  })
})

describe('address-check reports and exit codes', () => {
  test('failure records cannot be hidden by true group flags', () => {
    expect(didAddressChecksPass(result(['unpropagated failure']).addressChecks)).toBe(false)
  })
  test('successful collection returns 0 and removes an old issue body', async () => {
    const root = directory()
    fs.writeFileSync(path.join(root, 'issue_body.md'), 'old failure')
    expect(await runAddressCheck(async () => result(), root)).toBe(0)
    expect(fs.readFileSync(path.join(root, 'all_checks_passed.txt'), 'utf8')).toBe('true')
    expect(fs.existsSync(path.join(root, 'issue_body.md'))).toBe(false)
    expect(JSON.parse(fs.readFileSync(path.join(root, 'scripts/fetchedAddressData.json'), 'utf8')).status).toBe('complete')
  })
  test('completed mismatches return 1 and retain their fresh report', async () => {
    const root = directory()
    expect(await runAddressCheck(async () => result(['latest release mismatch']), root)).toBe(1)
    expect(fs.readFileSync(path.join(root, 'all_checks_passed.txt'), 'utf8')).toBe('false')
    const saved = JSON.parse(fs.readFileSync(path.join(root, 'scripts/fetchedAddressData.json'), 'utf8'))
    expect(saved.addressChecks.failedChecks).toEqual(['latest release mismatch'])
    expect(fs.readFileSync(path.join(root, 'issue_body.md'), 'utf8')).toContain('latest release mismatch')
  })
  test('unavailable RPC returns 2 and removes an old success report', async () => {
    const root = directory()
    report(root, true)
    expect(await runAddressCheck(async () => { throw new Error('RPC unavailable') }, root)).toBe(2)
    expect(fs.existsSync(path.join(root, 'scripts/fetchedAddressData.json'))).toBe(false)
    expect(fs.readFileSync(path.join(root, 'all_checks_passed.txt'), 'utf8')).toBe('false')
  })
  test('undefined group results are incomplete, not a completed check', async () => {
    const root = directory()
    const collected = result()
    collected.addressChecks.allV3ChecksPassed = undefined
    expect(await runAddressCheck(async () => collected, root)).toBe(2)
    expect(fs.existsSync(path.join(root, 'scripts/fetchedAddressData.json'))).toBe(false)
  })
  test('CLI uses the unavailable exit code for a real connection failure', async () => {
    const root = directory()
    report(root, true)
    const process = Bun.spawn(['bun', path.resolve('scripts/runAddressChecks.ts')], {
      cwd: root, env: { ...Bun.env, RPC_URI_FOR_1: 'http://127.0.0.1:1' }, stdout: 'ignore', stderr: 'ignore',
    })
    expect(await process.exited).toBe(2)
    expect(fs.existsSync(path.join(root, 'scripts/fetchedAddressData.json'))).toBe(false)
  }, 15000)
})

describe('deployment build ordering', () => {
  const runDocumentationBuild = (run: Parameters<typeof runWithAddressChecks>[1], root: string) =>
    runWithAddressChecks('build:site', run, root)
  for (const passed of [true, false]) {
    test(`${passed ? 'passing' : 'mismatched'} checks are freshly collected before site compilation`, () => {
      const root = directory()
      report(root, true, 1)
      const calls: string[] = []
      const exit = runDocumentationBuild(script => {
        calls.push(script)
        if (script === 'runAddressCheck') {
          expect(fs.existsSync(path.join(root, 'scripts/fetchedAddressData.json'))).toBe(false)
          report(root, passed)
          return passed ? 0 : 1
        }
        expect(JSON.parse(fs.readFileSync(path.join(root, 'scripts/fetchedAddressData.json'), 'utf8')).status).toBe('complete')
        return 0
      }, root)
      expect(exit).toBe(0)
      expect(calls).toEqual(['runAddressCheck', 'build:site'])
    })
  }
  test('RPC failure stops compilation', () => {
    const root = directory()
    const calls: string[] = []
    expect(runDocumentationBuild(script => { calls.push(script); return 2 }, root)).toBe(2)
    expect(calls).toEqual(['runAddressCheck'])
  })
  test('a checker crash with exit 1 cannot reuse an old green report', () => {
    const root = directory()
    report(root, true)
    const calls: string[] = []
    expect(runDocumentationBuild(script => { calls.push(script); return 1 }, root)).toBe(2)
    expect(calls).toEqual(['runAddressCheck'])
    expect(fs.existsSync(path.join(root, 'scripts/fetchedAddressData.json'))).toBe(false)
  })
  test('a stale report stops compilation', () => {
    const root = directory()
    expect(runDocumentationBuild(() => { report(root, true, 1); return 0 }, root)).toBe(2)
  })
  test('a contradictory success exit code stops compilation', () => {
    const root = directory()
    expect(runDocumentationBuild(() => { report(root, false); return 0 }, root)).toBe(2)
  })
  test('site compilation errors remain failures', () => {
    const root = directory()
    expect(runDocumentationBuild(script => {
      if (script === 'runAddressCheck') { report(root, true); return 0 }
      return 7
    }, root)).toBe(7)
  })
  test('local development proceeds with completed warning data', () => {
    const root = directory()
    const calls: string[] = []
    expect(runWithAddressChecks('start-no-check', script => {
      calls.push(script)
      if (script === 'runAddressCheck') { report(root, false); return 1 }
      return 0
    }, root)).toBe(0)
    expect(calls).toEqual(['runAddressCheck', 'start-no-check'])
  })
})

describe('gauge-count failures', () => {
  for (const count of [0, veYfiGauges.length - 1, veYfiGauges.length + 1]) {
    test(`${count} gauges cannot produce a passing page flag`, async () => {
      const failures: string[] = []
      const client = { readContract: async ({ functionName, args }: { functionName: string; args?: bigint[] }) => {
        if (functionName === 'vault_count') return BigInt(count)
        if (functionName === 'gauges') return veYfiGauges[Number(args![0])]?.address || '0x0000000000000000000000000000000000000002'
        throw new Error(`Unexpected read: ${functionName}`)
      } } as unknown as PublicClient
      const checked = await veYfiChecks(client, true, failures)
      expect(checked.checkFlag).toBe(false)
      expect(failures.length).toBeGreaterThan(0)
    })
  }
})

describe('RPC failures in optional contract reads', () => {
  const address = '0x0000000000000000000000000000000000000001'
  const unavailable = () => new BaseError('Contract read unavailable', {
    cause: new HttpRequestError({ url: 'http://rpc.invalid', details: 'Connection failed' }),
  })
  for (const [name, read] of [
    ['getAprOracle', getProtocolContractAddresses],
    ['getAccountant', readYearnRoleManager],
    ['getLatestFactory', getAuctionFactoryFromRegistry],
    ['feeRecipient', getFeeRecipientFromAccountant],
  ] as const) {
    test(`${name} transport errors are not converted to missing addresses`, async () => {
      const error = unavailable()
      const client = { readContract: async ({ functionName }: { functionName: string }) => {
        if (functionName === name) throw error
        return address
      } } as unknown as PublicClient
      await expect(read(address, client)).rejects.toBe(error)
    })
  }
  test('an observed missing getter remains a completed negative observation', async () => {
    const client = { readContract: async ({ functionName }: { functionName: string }) => {
      if (functionName === 'getRouter') throw new ContractFunctionZeroDataError({ functionName })
      return address
    } } as unknown as PublicClient
    expect((await getProtocolContractAddresses(address, client)).router).toBeUndefined()
  })
  for (const legacy of [false, true]) {
    test(`blueprint fallback ${legacy ? 'works for a missing getter' : 'does not swallow transport errors'}`, async () => {
      const entries: [string, V3ReleaseData][] = [['3.0.1', releaseRegistry['3.0.1']]]
      const original = registryClient(entries, '3.0.1')
      const error = legacy ? new ContractFunctionZeroDataError({ functionName: 'vault_original' }) : unavailable()
      let fallbacks = 0
      const client = { ...original, readContract: async (args: { functionName: string }) => {
        if (args.functionName === 'vault_original') throw error
        if (args.functionName === 'vault_blueprint') { fallbacks++; return entries[0][1].vaultOriginal }
        return original.readContract(args as never)
      } } as unknown as PublicClient
      if (legacy) {
        const data = await readReleaseRegistryAll(address, client)
        expect(data['3.0.1']).toEqual(entries[0][1])
        expect(fallbacks).toBe(1)
      } else {
        await expect(readReleaseRegistryAll(address, client)).rejects.toBe(error)
        expect(fallbacks).toBe(0)
      }
    })
  }
})
