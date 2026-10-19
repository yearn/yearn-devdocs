import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function generateForgeDoc(submodules, tempFolder) {
  for (const { name, path: sourcePath } of submodules) {
    if (name === 'yearn-vaults-v3') continue
    execFileSync('forge', ['doc', '--out', path.resolve(tempFolder, 'forge', name)], {
      cwd: path.resolve(sourcePath),
      stdio: 'inherit',
      env: { ...process.env, FOUNDRY_SKIP: '[".vy"]' },
    })
  }
}

export function generateVydoc(submodules, tempFolder, requiredVersion) {
  const compiler = process.env.VYPER_BIN || 'vyper'
  const actualVersion = execFileSync(compiler, ['--version'], { encoding: 'utf8' }).trim()
  if (actualVersion.split('+')[0] !== requiredVersion) {
    throw new Error(`Vyper ${requiredVersion} required; found ${actualVersion}. Set VYPER_BIN.`)
  }
  // Other repositories have Vyper utilities requiring different compilers, but
  // none are in the published list. Compile only the documented vault sources.
  const source = submodules.find(({ name }) => name === 'yearn-vaults-v3')
  const input = path.resolve(tempFolder, 'vyper-input')
  fs.mkdirSync(input, { recursive: true })
  for (const name of ['VaultV3.vy', 'VaultFactory.vy']) {
    fs.copyFileSync(path.join(source.path, 'contracts', name), path.join(input, name))
  }
  execFileSync(process.execPath, [
    path.resolve('node_modules/vydoc/lib/bin/vydoc.js'),
    '-i', input,
    '-o', path.resolve(tempFolder, 'vydoc', source.name),
    '-t', path.resolve('natspec/contract.ejs'),
    '-c', compiler,
  ], { stdio: 'inherit' })
}
