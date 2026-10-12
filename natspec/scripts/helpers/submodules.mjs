import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()

// Use recorded commits, never the moving remote branch head.
export function prepareSubmodules(submodules, release, version) {
  for (const submodule of submodules) {
    const directory = path.resolve(submodule.path)
    const source = release.repositories[submodule.name]
    if (!source || !/^[a-f0-9]{40}$/.test(source.commit)) {
      throw new Error(`Missing source commit for ${submodule.name}`)
    }
    if (!fs.existsSync(path.join(directory, '.git'))) {
      git(['submodule', 'update', '--init', '--', submodule.path])
    }
    // Ignore dependency submodule status; never overwrite changes to source files.
    if (git(['status', '--porcelain', '--ignore-submodules=all'], directory)) {
      throw new Error(`Uncommitted source changes in ${submodule.path}`)
    }
    try {
      git(['cat-file', '-e', `${source.commit}^{commit}`], directory)
    } catch {
      git(['fetch', 'origin', source.commit], directory)
    }
    git(['checkout', '--detach', source.commit], directory)
    if (git(['rev-parse', 'HEAD'], directory) !== source.commit) {
      throw new Error(`Incorrect checkout in ${submodule.path}`)
    }
    git(['submodule', 'update', '--init', '--recursive'], directory)
  }
  const vault = fs.readFileSync('natspec/lib/yearn-vaults-v3/contracts/VaultV3.vy', 'utf8')
  const strategy = fs.readFileSync('natspec/lib/tokenized-strategy/src/TokenizedStrategy.sol', 'utf8')
  for (const [name, content] of [['VaultV3', vault], ['TokenizedStrategy', strategy]]) {
    const actual = content.match(/API_VERSION[^\n]*=\s*"([\d.]+)"/)?.[1]
    if (actual !== version) throw new Error(`${name} API_VERSION is ${actual}, expected ${version}`)
  }
}
