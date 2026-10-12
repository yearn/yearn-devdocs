import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import ejs from 'ejs'
import { cleanMarkdown, copyDocs, moveToDeprecated } from './copyDocs.mjs'

function fixture(t, definitions) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'natspec-test-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const contractsFile = path.join(root, 'contracts.json')
  fs.writeFileSync(contractsFile, JSON.stringify({ 'v3-contracts': definitions }))
  return { root, contractsFile, output: path.join(root, 'output'), temp: path.join(root, 'temp') }
}

const definition = name => ({ type: 'file', git: `https://github.com/yearn/${name}` })
const release = { repositories: { alpha: { commit: 'a'.repeat(40) }, beta: { commit: 'b'.repeat(40) } } }
function page(temp, repository, file, content) {
  const destination = path.join(temp, 'forge', repository, file)
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.writeFileSync(destination, content)
}

test('missing output in the owning repository fails before copying pages', t => {
  const f = fixture(t, { 'A.sol': definition('alpha'), 'B.sol': definition('beta') })
  page(f.temp, 'alpha', 'contract.A.md', '# A')
  page(f.temp, 'alpha', 'contract.B.md', '# B from the wrong repository')
  assert.throws(() => copyDocs(f.output, f.temp, null, release, f.contractsFile), /beta\/B.sol; found 0/)
  assert.equal(fs.existsSync(f.output), false)
})

test('ambiguous generated contract pages fail instead of overwriting one another', t => {
  const f = fixture(t, { 'A.sol': definition('alpha') })
  page(f.temp, 'alpha', 'one/contract.A.md', '# A')
  page(f.temp, 'alpha', 'two/contract.A.md', '# Another A')
  assert.throws(() => copyDocs(f.output, f.temp, null, release, f.contractsFile), /found 2/)
  assert.equal(fs.existsSync(f.output), false)
})

test('generated links use published page paths and the correct source repository', t => {
  const f = fixture(t, { 'A.sol': definition('alpha'), Periphery: {
    type: 'folder', contents: { 'B.sol': definition('beta') },
  } })
  page(f.temp, 'alpha', 'contract.A.md', '# A\n[Git Source](https://github.com/yearn/yearn-devdocs/blob/old/src/A.sol)\n[self](/src/A.sol/contract.A.md#run)\n[other](/src/B.sol/contract.B.md#read)\n')
  page(f.temp, 'beta', 'contract.B.md', '# B\n[back](/src/A.sol/contract.A.md#run)\n')
  copyDocs(f.output, f.temp, null, release, f.contractsFile)
  const a = fs.readFileSync(path.join(f.output, 'A.md'), 'utf8')
  assert.ok(a.includes(`https://github.com/yearn/alpha/blob/${'a'.repeat(40)}/src/A.sol`))
  assert.ok(a.includes('[self](#run)'))
  assert.ok(a.includes('[other](Periphery/B.md#read)'))
  assert.ok(fs.readFileSync(path.join(f.output, 'Periphery/B.md'), 'utf8').includes('[back](../A.md#run)'))
  assert.ok(!a.includes('(/src/'))
})

test('MDX escaping preserves inline code and Solidity examples', () => {
  const code = '```solidity\nfunction f() { return a < b; }\n```'
  const result = cleanMarkdown('For {caller}, a < b; use `{value}`.\n' + code)
  assert.ok(result.startsWith('For \\{caller\\}, a &lt; b; use `{value}`.'))
  assert.ok(result.endsWith(code + '\n'))
})

test('archiving refuses an existing release without moving current pages', t => {
  const f = fixture(t, {})
  const current = path.join(f.root, 'V3')
  const archived = path.join(f.root, 'deprecated/V3/version-3.0.4')
  fs.mkdirSync(current)
  fs.mkdirSync(archived, { recursive: true })
  fs.writeFileSync(path.join(current, 'A.md'), 'current')
  fs.writeFileSync(path.join(archived, 'A.md'), 'historical')
  assert.throws(() => moveToDeprecated(current, '3.0.4'), /Archive already exists/)
  assert.equal(fs.readFileSync(path.join(current, 'A.md'), 'utf8'), 'current')
  assert.equal(fs.readFileSync(path.join(archived, 'A.md'), 'utf8'), 'historical')
})

test('decorative contract banner is removed while NatSpec prose remains', () => {
  const result = cleanMarkdown('# TokenizedStrategy\n\n$$$$$$$$$$$$$$$$\n<art>{art}\n$$$$$$$$$$$$$$$$\n\nThis TokenizedStrategy can be used by anyone.\n')
  assert.ok(!result.includes('$$$$'))
  assert.ok(result.includes('This TokenizedStrategy can be used by anyone.'))
})

test('Vyper default-argument overloads show only their actual inputs', () => {
  const template = fs.readFileSync(new URL('../../contract.ejs', import.meta.url), 'utf8')
  const output = ejs.render(template, { fileName: 'VaultV3.vy', data: {
    compilerVersion: '0.3.10', events: [], methods: {
      'configure(address)': {
        params: { receiver: 'Recipient address', override: 'Optional override' },
        inputs: [{ name: 'receiver', type: 'address' }, { name: 'override', type: 'bool' }],
      },
    },
  } })
  assert.ok(output.includes('| receiver | address | Recipient address |'))
  assert.ok(!output.includes('unknown'))
  assert.ok(!output.includes('Optional override'))
})

test('release rollover labels the archived index as deprecated', t => {
  const f = fixture(t, {})
  const current = path.join(f.root, 'V3')
  fs.mkdirSync(current)
  fs.writeFileSync(path.join(current, 'index.md'), '# V3 yVault Smart Contracts\n\n**Current v3 yVault API version is 3.1.1**\n')
  fs.writeFileSync(path.join(current, 'A.md'), 'preserved content')
  const archived = moveToDeprecated(current, '3.1.1')
  assert.equal(fs.existsSync(current), false)
  assert.ok(fs.readFileSync(path.join(archived, 'index.md'), 'utf8').includes('3.1.1 — deprecated'))
  assert.equal(fs.readFileSync(path.join(archived, 'A.md'), 'utf8'), 'preserved content')
  assert.equal(JSON.parse(fs.readFileSync(path.join(archived, '_category_.json'))).label, 'Version 3.1.1')
})
