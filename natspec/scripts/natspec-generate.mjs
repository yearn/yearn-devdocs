import path from 'node:path'
import fs from 'node:fs'
import { parseArgs } from 'node:util'
import { createInterface } from 'node:readline/promises'
import { generateForgeDoc, generateVydoc } from './helpers/generateDocs.mjs'
import { copyDocs, extractCurrentVersion, moveToDeprecated } from './helpers/copyDocs.mjs'
import { prepareSubmodules } from './helpers/submodules.mjs'

const submodules = [
  'yearn-vaults-v3', 'vault-periphery', 'tokenized-strategy',
  'tokenized-strategy-periphery', 'Yearn-ERC4626-Router',
].map(name => ({ name, path: `natspec/lib/${name}` }))

const filesToUpdate = ['VaultV3', 'VaultFactory']
const folderToUpdate = 'docs/developers/smart-contracts/V3/Periphery'
const currentDirectory = path.resolve('docs/developers/smart-contracts/V3')

function writeIndex(directory, version, release, historical) {
  const sources = Object.entries(release.repositories).map(([name, source]) =>
    `| [${name}](https://github.com/yearn/${name}) | ${source.tag || 'Periphery snapshot'} | [${source.commit.slice(0, 7)}](https://github.com/yearn/${name}/tree/${source.commit}) |`
  ).join('\n')
  const title = historical ? `V3 yVault Smart Contracts — ${version}` : 'V3 yVault Smart Contracts'
  const status = historical ? `**v3 yVault API version ${version} — deprecated**` : `**Current v3 yVault API version is ${version}**`
  fs.writeFileSync(path.join(directory, 'index.md'), `# ${title}\n\n:::info\n\n${status}\n\n${historical ? 'For the current release, see [V3 smart contracts](/developers/smart-contracts/V3).' : 'Older releases are available under Smart Contracts → Deprecated → yVaults V3.'}\n\n:::\n\n\`\`\`mdx-code-block\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />\n\`\`\`\n\n## Documentation sources\n\nCore contracts use the release tags and exact commits below. Periphery contracts have independent release schedules; these pages use snapshots from the default-branch history as of ${release.peripherySnapshotAsOf}, the vault release commit time. These snapshots are not separately tagged core releases.\n\n| Repository | Source | Commit |\n| --- | --- | --- |\n${sources}\n\nVyper compiler: \`${release.vyper}\`. Exact generation inputs and contract coverage are recorded in \`sources.json\` beside these pages.\n`)
  if (historical) fs.writeFileSync(path.join(directory, '_category_.json'), JSON.stringify({
    label: `Version ${version}`, link: { type: 'doc', id: 'index' },
  }, null, 2) + '\n')
}

async function main() {
  const { values } = parseArgs({ options: {
    version: { type: 'string' }, output: { type: 'string' }, help: { type: 'boolean' },
  } })
  if (values.help) {
    console.log('bun run v3-docs [--version 3.1.1] [--output <historical-directory>]\nSet VYPER_BIN to the compiler executable. Sources are pinned in natspec/releases.json.')
    return
  }
  const currentVersion = extractCurrentVersion(path.join(currentDirectory, 'index.md'))
  let version = values.version
  let selected = null
  let action
  if (!version) {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    try {
      action = await rl.question('New Version or Update Existing Version (new/update): ')
      if (!['new', 'update'].includes(action)) throw new Error('Choose new or update')
      version = action === 'new' ? await rl.question('Enter the new version number (#.#.#): ') : currentVersion
      if (action === 'update') {
        const scope = await rl.question('Update All or Selected Files? (all/selected): ')
        if (!['all', 'selected'].includes(scope)) throw new Error('Choose all or selected')
        if (scope === 'selected') {
          const type = await rl.question('Update from Folder or List of Files? (folder/files): ')
          if (type === 'files') selected = filesToUpdate
          else if (type === 'folder') selected = fs.readdirSync(folderToUpdate, { recursive: true }).filter(file => file.endsWith('.md'))
          else throw new Error('Choose folder or files')
          console.log('Selected contracts:', selected)
          if (await rl.question('Are these the correct files to update? (yes/no): ') !== 'yes') return
        }
      }
    } finally {
      rl.close()
    }
  }
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Use a release version such as 3.1.1')
  const release = JSON.parse(fs.readFileSync('natspec/releases.json', 'utf8'))[version]
  if (!release) throw new Error(`Add explicit source commits for ${version} to natspec/releases.json first`)
  const output = path.resolve(values.output || currentDirectory)
  const historical = output !== currentDirectory
  action ||= historical || version === currentVersion ? 'update' : 'new'
  if (action === 'new' && version === currentVersion) throw new Error('Use update for the current release')
  if (historical && !output.startsWith(path.resolve('docs/developers/smart-contracts/deprecated/V3') + path.sep)) {
    throw new Error('--output must be a directory under docs/developers/smart-contracts/deprecated/V3')
  }
  if (action === 'new') {
    const archive = path.resolve(currentDirectory, '../deprecated/V3', `version-${currentVersion}`)
    if (fs.existsSync(archive)) throw new Error(`Archive already exists: ${archive}`)
  }
  fs.mkdirSync('natspec/temp', { recursive: true })
  const temp = fs.mkdtempSync(path.resolve('natspec/temp', `release-${version}-`))
  let backup
  try {
    prepareSubmodules(submodules, release, version)
    generateVydoc(submodules, temp, release.vyper)
    generateForgeDoc(submodules, temp)
    const staged = path.join(temp, 'pages')
    const contracts = copyDocs(staged, temp, selected, release)
    if (!selected) {
      writeIndex(staged, version, release, historical)
      fs.writeFileSync(path.join(staged, 'sources.json'), JSON.stringify({ version, ...release, contracts }, null, 2) + '\n')
    }
    if (selected) {
      // Selected updates keep the existing release index and source manifest.
      for (const file of contracts) fs.copyFileSync(path.join(staged, file), path.join(output, file))
    } else {
      // Generate and validate the complete replacement before moving published docs.
      if (fs.existsSync(output)) {
        backup = action === 'new' ? moveToDeprecated(output, currentVersion) : path.join(temp, 'previous')
        if (action !== 'new') fs.renameSync(output, backup)
      }
      try {
        fs.mkdirSync(path.dirname(output), { recursive: true })
        fs.renameSync(staged, output)
      } catch (error) {
        if (backup) fs.renameSync(backup, output)
        throw error
      }
    }
    console.log(`Generated ${contracts.length} contract pages for ${version} in ${output}`)
  } finally {
    fs.rmSync(temp, { recursive: true, force: true })
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
