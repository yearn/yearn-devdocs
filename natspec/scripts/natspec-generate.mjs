import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import readline from 'readline'

const submodules = [
  {
    name: 'yearn-vaults-v3',
    path: 'natspec/lib/yearn-vaults-v3',
    vydocPath: 'contracts',
  },
  {
    name: 'vault-periphery',
    path: 'natspec/lib/vault-periphery',
    vydocPath: 'src',
  },
  {
    name: 'tokenized-strategy',
    path: 'natspec/lib/tokenized-strategy',
    vydocPath: 'src',
  },
  {
    name: 'tokenized-strategy-periphery',
    path: 'natspec/lib/tokenized-strategy-periphery',
    vydocPath: 'src',
  },
  {
    name: 'Yearn-ERC4626-Router',
    path: 'natspec/lib/Yearn-ERC4626-Router',
    vydocPath: 'src',
  },
]

function generateForgeDoc() {
  const originalDir = process.cwd()
  submodules.forEach(({ name, path: submodulePath }) => {
    const absolutePath = path.resolve(submodulePath)
    process.chdir(absolutePath)
    console.log(`Changed directory to ${absolutePath}`)
    const command = `forge doc --out ../../temp/forge/${name}`
    console.log(`running: ${command}`)
    execSync(command, { stdio: 'inherit' })
    console.log(`Documentation generated for ${name}`)
    process.chdir(originalDir)
  })
}

function hasVyFiles(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      if (hasVyFiles(filePath)) {
        return true
      }
    } else if (file.endsWith('.vy')) {
      return true
    }
  }
  return false
}

function generateVydoc() {
  submodules.forEach(({ name, path: submodulePath, vydocPath }) => {
    const inputDir = path.resolve(submodulePath, vydocPath)
    const outputDir = path.resolve('natspec/temp/vydoc', name)
    const templateFile = path.resolve('natspec/contract.ejs')
    const compiler = '$(which vyper)'

    // Check if there are any .vy files in the inputDir recursively
    if (!hasVyFiles(inputDir)) {
      console.log(`No .vy files found in ${inputDir}, skipping ${name}`)
      return
    }

    const command = `npx vydoc -i ${inputDir} -o ${outputDir} -t ${templateFile} -c ${compiler}`
    console.log(`running: ${command}`)
    execSync(command, { stdio: 'inherit' })
    console.log(`Vydoc documentation generated for ${name}`)
  })
}

function copyDocs(outputBaseDir, tempFolder) {
  // Read smartContracts.json
  const contractsJson = JSON.parse(
    fs.readFileSync('smartContracts.json', 'utf8')
  )
  const contracts = contractsJson['v3-contracts']

  const tempForgeDir = path.resolve(tempFolder, 'forge')
  const tempVydocDir = path.resolve(tempFolder, 'vydoc')

  // Build a mapping of contract names to their paths in the contracts JSON
  const contractPathMap = buildContractPathMap(contracts, '')

  // Process Forge and Vydoc documentation files
  processForgeDocs()
  processVydocDocs()

  // Helper function to build a map of contract names to their paths
  function buildContractPathMap(obj, currentPath) {
    let contractPathMap = {}
    for (const [key, value] of Object.entries(obj)) {
      if (value.type === 'file') {
        const contractName = key
        const contractPath = path.join(currentPath, contractName)
        contractPathMap[contractName] = contractPath
      } else if (value.type === 'folder') {
        const newCurrentPath = path.join(currentPath, key)
        const subContractPathMap = buildContractPathMap(
          value.contents,
          newCurrentPath
        )
        Object.assign(contractPathMap, subContractPathMap)
      }
    }
    return contractPathMap
  }

  // Process Forge documentation files
  function processForgeDocs() {
    traverseAndCopy(tempForgeDir, '.sol', contractPathMap)
  }

  // Process Vydoc documentation files
  function processVydocDocs() {
    traverseAndCopy(tempVydocDir, '.vy', contractPathMap)
  }

  // Traverse directories and copy documentation files
  function traverseAndCopy(baseDir, extension, contractMap) {
    const entries = fs.readdirSync(baseDir)
    for (const entry of entries) {
      const entryPath = path.join(baseDir, entry)
      const stat = fs.statSync(entryPath)
      if (stat.isDirectory()) {
        // Recurse into subdirectories
        traverseAndCopy(entryPath, extension, contractMap)
      } else if (stat.isFile() && path.extname(entry) === '.md') {
        // Process markdown files
        let fileBaseName = path.basename(entry, '.md')

        // Remove prefixes added by Forge
        if (fileBaseName.startsWith('contract.')) {
          fileBaseName = fileBaseName.slice('contract.'.length)
        } else if (fileBaseName.startsWith('abstract.')) {
          fileBaseName = fileBaseName.slice('abstract.'.length)
        } else if (fileBaseName.startsWith('interface.')) {
          fileBaseName = fileBaseName.slice('interface.'.length)
        }

        const contractName = fileBaseName + extension

        if (contractName in contractMap) {
          // Destination path in the output directory, preserving the contracts JSON structure
          const relativePath = contractMap[contractName]
          const destFilePath = path.join(
            outputBaseDir,
            relativePath.replace(extension, '.md')
          )

          // Ensure the destination directory exists
          fs.mkdirSync(path.dirname(destFilePath), { recursive: true })

          // Copy the documentation file
          fs.copyFileSync(entryPath, destFilePath)
          console.log(`Copied ${entryPath} to ${destFilePath}`)

          // Add the specified line to the top of the copied file
          const disableLintLine = '<!-- markdownlint-disable MD024 MD036 -->\n'
          const fileContent = fs.readFileSync(destFilePath, 'utf8')
          fs.writeFileSync(destFilePath, disableLintLine + fileContent)
          console.log(`Added markdownlint disable line to ${destFilePath}`)
        }
      }
    }
  }
}

// Function to extract the current version number from index.md
function extractCurrentVersion(indexFilePath) {
  const indexContent = fs.readFileSync(indexFilePath, 'utf8')
  const versionMatch = indexContent.match(
    /\*\*Current v3 yVault API version is ([\d.]+)\*\*/
  )
  if (versionMatch) {
    return versionMatch[1]
  } else {
    throw new Error('Current version number not found in index.md')
  }
}

// Function to update the version number in index.md
function updateVersionInIndex(indexFilePath, newVersion) {
  let indexContent = fs.readFileSync(indexFilePath, 'utf8')
  indexContent = indexContent.replace(
    /\*\*Current v3 yVault API version is [\d.]+\*\*/,
    `**Current v3 yVault API version is ${newVersion}**`
  )
  fs.writeFileSync(indexFilePath, indexContent)
}

// Function to move files and folders to the deprecated folder
function moveToDeprecated(outputBaseDir, currentVersion) {
  const deprecatedDir = path.join(outputBaseDir, 'deprecated')
  const newVersionDir = path.join(deprecatedDir, `version-${currentVersion}`)
  fs.mkdirSync(newVersionDir, { recursive: true })

  const entries = fs.readdirSync(outputBaseDir)
  for (const entry of entries) {
    const entryPath = path.join(outputBaseDir, entry)
    if (entry !== 'index.md' && entry !== 'deprecated') {
      const destPath = path.join(newVersionDir, entry)
      fs.renameSync(entryPath, destPath)
    }
  }
}

function lintMarkdownFiles(outputBaseDir) {
  try {
    // Run markdownlint-cli with the fix option
    execSync(`npx markdownlint-cli "**/*.md" --fix --quiet`, {
      cwd: outputBaseDir,
      stdio: 'inherit',
    })
  } catch (error) {
    console.error(
      'markdownlint-cli --fix ran. It probably worked fine, but double-check the output'
    )
  }
}

// Function to clean up the natspec/lib/temp folder
function cleanUpTempFolder(tempDir) {
  console.log(`Cleaning up ${tempDir}`)
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
    console.log(`Deleted ${tempDir}`)
  } else {
    console.log(`${tempDir} does not exist`)
  }
}

// Function to revert changes if an error occurs
function revertChanges(outputBaseDir, tempFolder, currentVersion) {
  console.log('Reverting changes...')
  // Move files back from deprecated folder
  const deprecatedDir = path.join(
    outputBaseDir,
    'deprecated',
    `version-${currentVersion}`
  )
  if (fs.existsSync(deprecatedDir)) {
    const entries = fs.readdirSync(deprecatedDir)
    for (const entry of entries) {
      const entryPath = path.join(deprecatedDir, entry)
      const destPath = path.join(outputBaseDir, entry)
      fs.renameSync(entryPath, destPath)
    }
    fs.rmdirSync(deprecatedDir)
  }
  // Clean up temp folder
  updateVersionInIndex(path.join(outputBaseDir, 'index.md'), currentVersion)
  cleanUpTempFolder(tempFolder)
  console.log('Changes reverted.')
}

// Main function
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Enter the new version number (#.#.#): ', (newVersion) => {
    if (!newVersion) {
      console.error('New version number must be provided')
      rl.close()
      return
    }

    const tempFolder = path.resolve('natspec/temp')
    const outputBaseDir = path.resolve('docs/developers/smart-contracts/v3')
    const indexFilePath = path.join(outputBaseDir, 'index.md')

    try {
      // Extract the current version number
      const currentVersion = extractCurrentVersion(indexFilePath)
      console.log(`Current version: ${currentVersion}`)

      // Move files and folders to the deprecated folder
      moveToDeprecated(outputBaseDir, currentVersion)
      console.log(`Moved old natspec docs to deprecated folder`)

      // Generate docs with forge and vydoc
      generateForgeDoc()
      generateVydoc()
      // Copy documentation files to the output directory
      copyDocs(outputBaseDir, tempFolder)
      lintMarkdownFiles(outputBaseDir)
      // Update the version number in index.md
      updateVersionInIndex(indexFilePath, newVersion)
      console.log(`Updated version to: ${newVersion}\n`)
      console.log(
        `New natspec docs for Yearn Vaults v3 version ${newVersion} generated successfully and saved to ${outputBaseDir}.`
      )
    } catch (error) {
      console.error('Script Error:', error)
      revertChanges(outputBaseDir, tempFolder, currentVersion)
    } finally {
      rl.close()
      cleanUpTempFolder(tempFolder)
    }
  })
}

main()
