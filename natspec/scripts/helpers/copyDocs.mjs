import fs from 'node:fs'
import path from 'node:path'

export function extractCurrentVersion(indexFilePath) {
  const version = fs.readFileSync(indexFilePath, 'utf8')
    .match(/\*\*Current v3 yVault API version is ([\d.]+)\*\*/)?.[1]
  if (!version) throw new Error('Current version number not found in index.md')
  return version
}

export function updateVersionInIndex(indexFilePath, version) {
  const content = fs.readFileSync(indexFilePath, 'utf8')
  fs.writeFileSync(indexFilePath, content.replace(
    /\*\*Current v3 yVault API version is [\d.]+\*\*/,
    `**Current v3 yVault API version is ${version}**`
  ))
}

export function moveToDeprecated(outputBaseDir, currentVersion) {
  const destination = path.resolve(outputBaseDir, '../deprecated/V3', `version-${currentVersion}`)
  if (fs.existsSync(destination)) throw new Error(`Archive already exists: ${destination}`)
  const index = fs.readFileSync(path.join(outputBaseDir, 'index.md'), 'utf8')
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.renameSync(outputBaseDir, destination)
  try {
    fs.writeFileSync(path.join(destination, 'index.md'), index
      .replace(/^# V3 yVault Smart Contracts$/m, `# V3 yVault Smart Contracts — ${currentVersion}`)
      .replace(/\*\*Current v3 yVault API version is [\d.]+\*\*/, `**v3 yVault API version ${currentVersion} — deprecated**`)
      .replace('Older releases are available under Smart Contracts → Deprecated → yVaults V3.',
        'For the current release, see [V3 smart contracts](/developers/smart-contracts/V3).'))
    fs.writeFileSync(path.join(destination, '_category_.json'), JSON.stringify({
      label: `Version ${currentVersion}`, link: { type: 'doc', id: 'index' },
    }, null, 2) + '\n')
  } catch (error) {
    fs.renameSync(destination, outputBaseDir)
    fs.writeFileSync(path.join(outputBaseDir, 'index.md'), index)
    fs.rmSync(path.join(outputBaseDir, '_category_.json'), { force: true })
    throw error
  }
  return destination
}

function contractList(tree, directory = '') {
  return Object.entries(tree).flatMap(([name, value]) => value.type === 'folder'
    ? contractList(value.contents, path.join(directory, name))
    : [{ name, git: value.git, output: path.join(directory, name.replace(/\.(sol|vy)$/, '.md')) }])
}

function filesIn(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? filesIn(file) : [file]
  })
}

function baseName(file) {
  return path.basename(file, '.md').replace(/^(contract|abstract|interface)\./, '')
}

// Leave signatures and code examples unchanged; escape MDX-sensitive prose.
export function cleanMarkdown(content) {
  // Forge includes the decorative Solidity header as contract prose. It is not
  // NatSpec and its dollar signs are interpreted as math by the docs renderer.
  content = content.replace(/\n\${10,}[\s\S]*?(?=\n+This TokenizedStrategy can be used)/, '\n')
  let inFence = false
  return content.split('\n').map(line => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence || line.startsWith('<!--')) return line
    return line.split(/(`+[^`]*`+)/).map(part => part.startsWith('`') ? part : part
      .replace(/\{/g, '\\{').replace(/\}/g, '\\}')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('').trimEnd()
  }).join('\n').trimEnd() + '\n'
}

export function copyDocs(outputBaseDir, tempFolder, contractsToUpdate, release, contractsFile = 'smartContracts.json') {
  const definitions = JSON.parse(fs.readFileSync(contractsFile, 'utf8'))['v3-contracts']
  const allContracts = contractList(definitions)
  const selected = contractsToUpdate?.map(file => path.basename(file).replace(/\.(sol|vy|md)$/, ''))
  if (selected) {
    const unknown = selected.filter(name => !allContracts.some(contract => path.parse(contract.name).name === name))
    if (unknown.length) throw new Error(`Unknown selected contracts: ${unknown.join(', ')}`)
  }
  const contracts = allContracts.filter(contract => !selected || selected.includes(path.parse(contract.name).name))
  const generated = contracts.map(contract => {
    const repository = contract.git.split('/').pop()
    const kind = contract.name.endsWith('.vy') ? 'vydoc' : 'forge'
    const matches = filesIn(path.join(tempFolder, kind, repository))
      .filter(file => file.endsWith('.md') && baseName(file) === path.parse(contract.name).name)
    if (matches.length !== 1) {
      throw new Error(`Expected one generated page for ${repository}/${contract.name}; found ${matches.length}`)
    }
    return { ...contract, file: matches[0], repository }
  })
  // Validate every required page before writing any output.
  fs.mkdirSync(outputBaseDir, { recursive: true })
  for (const contract of generated) {
    let content = fs.readFileSync(contract.file, 'utf8')
    const commit = release.repositories[contract.repository].commit
    const sourceRoot = contract.name.endsWith('.vy') ? 'contracts' : 'src'
    if (contract.name.endsWith('.vy')) {
      content = content.replace(/^(# .+)$/m, `$1\n\n[Git Source](${contract.git}/blob/${commit}/${sourceRoot}/${contract.name})`)
    } else {
      content = content.replace(/\[Git Source\]\(https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\//,
        `[Git Source](${contract.git}/blob/${commit}/`)
    }
    content = content.replace(/\[([^\]]+)\]\((\/src\/[^)]+)\)/g, (_, label, target) => {
      const anchor = target.includes('#') ? target.slice(target.indexOf('#')) : ''
      const targetName = baseName(target.split('#')[0])
      const destination = allContracts.find(item => path.parse(item.name).name === targetName)
      if (destination) {
        const relative = destination.output === contract.output && anchor
          ? anchor
          : path.relative(path.dirname(contract.output), destination.output).split(path.sep).join('/') + anchor
        return `[${label}](${relative})`
      }
      const sourcePath = target.match(/^\/src\/(.+?\.sol)(?:\/|$)/)?.[1]
      if (!sourcePath) throw new Error(`Cannot resolve generated link: ${target}`)
      return `[${label}](${contract.git}/blob/${commit}/src/${sourcePath})`
    })
    // Forge's multi-line inheritance links can refer to unpublished dependencies.
    content = content.replace(/\*\*Inherits:\*\*\s*\n?([^\n]+)/,
      (_, value) => `**Inherits:** ${value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}`)
    content = '<!-- markdownlint-disable MD024 MD034 MD036 -->\n\n' + cleanMarkdown(content)
    const destination = path.join(outputBaseDir, contract.output)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, content)
    console.log(`Copied ${contract.output}`)
  }
  return generated.map(({ output }) => output)
}
