import path from 'path'
import fs from 'fs'

/**
 * Extracts the current version number from the specified index file.
 *
 * @param {string} indexFilePath - The path to the index file.
 * @returns {string} - The current version number extracted from the index file.
 * @throws {Error} - Throws an error if the current version number is not found in the index file.
 */
export function extractCurrentVersion(indexFilePath) {
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

/**
 * Updates the version number in the index file.
 *
 * This function reads the content of the specified index file, replaces the
 * current version number with the provided new version, and writes the updated
 * content back to the file.
 *
 * @param {string} indexFilePath - The path to the index file.
 * @param {string} newVersion - The new version number to be updated in the index file.
 */
export function updateVersionInIndex(indexFilePath, newVersion) {
  let indexContent = fs.readFileSync(indexFilePath, 'utf8')
  indexContent = indexContent.replace(
    /\*\*Current v3 yVault API version is [\d.]+\*\*/,
    `**Current v3 yVault API version is ${newVersion}**`
  )
  fs.writeFileSync(indexFilePath, indexContent)
}

/**
 * Lints and fixes markdown files in the specified directory using markdownlint-cli.
 *
 * @param {string} outputBaseDir - The base directory where the markdown files are located.
 */
export function lintMarkdownFiles(outputBaseDir) {
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

/**
 * Moves files from the output base directory to a new versioned directory within a deprecated directory.
 *
 * @param {string} outputBaseDir - The base directory containing the files to be moved.
 * @param {string} currentVersion - The current version string used to name the new versioned directory.
 * @returns {string} - The path to the new versioned directory within the deprecated directory.
 */
export function moveToDeprecated(outputBaseDir, currentVersion) {
  const deprecatedDir = path.join(path.dirname(outputBaseDir), 'deprecated/V3')
  const newVersionDir = path.join(deprecatedDir, `version-${currentVersion}`)
  fs.mkdirSync(newVersionDir, { recursive: true })

  const entries = fs.readdirSync(outputBaseDir)
  for (const entry of entries) {
    console.log('entry: ', entry)
    const entryPath = path.join(outputBaseDir, entry)
    if (entry !== 'index.md' && entry !== 'deprecated') {
      const destPath = path.join(newVersionDir, entry)
      console.log('destPath: ', destPath)
      fs.renameSync(entryPath, destPath)
    }
  }
  return newVersionDir
}

/**
 * Copies documentation files from the temporary folder to the output directory,
 * preserving the structure defined in the smartContracts.json file.
 *
 * @param {string} outputBaseDir - The base directory where the documentation files will be copied.
 * @param {string} tempFolder - The temporary folder containing the generated documentation files.
 * @param {Array} contractsToUpdate - The list of contracts to update.
 */
export function copyDocs(outputBaseDir, tempFolder, contractsToUpdate) {
  // Read smartContracts.json
  const contractsJson = JSON.parse(
    fs.readFileSync('smartContracts.json', 'utf8')
  )
  const contracts = contractsJson['v3-contracts']

  const tempForgeDir = path.resolve(tempFolder, 'forge')
  const tempVydocDir = path.resolve(tempFolder, 'vydoc')

  // Build a mapping of contract names to their paths in the contracts JSON
  const contractPathMap = buildContractPathMap(contracts, '', contractsToUpdate)
  console.log('contractPathMap: ', contractPathMap)

  // Process Forge and Vydoc documentation files
  traverseAndCopy(tempForgeDir, outputBaseDir, '.sol', contractPathMap)
  traverseAndCopy(tempVydocDir, outputBaseDir, '.vy', contractPathMap)
}

// Helper function to build a map of contract names to their paths
// this could fail if there are duplicate file names in nested folders.
function buildContractPathMap(obj, currentPath, contractsToUpdate) {
  let contractPathMap = {}
  let baseContractNames = []
  if (contractsToUpdate) {
    baseContractNames = extractBaseContractNames(contractsToUpdate)
  }
  for (const [key, value] of Object.entries(obj)) {
    if (value.type === 'file') {
      const contractName = key
      const baseContractName = contractName
        .replace('.sol', '')
        .replace('.vy', '')
        .replace('.md', '')
      console.log('baseContractName: ', baseContractName)
      if (!contractsToUpdate || baseContractNames.includes(baseContractName)) {
        const contractPath = path.join(currentPath, contractName)
        contractPathMap[contractName] = contractPath
      }
    } else if (value.type === 'folder') {
      const newCurrentPath = path.join(currentPath, key)
      const subContractPathMap = buildContractPathMap(
        value.contents,
        newCurrentPath,
        contractsToUpdate
      )
      Object.assign(contractPathMap, subContractPathMap)
    }
  }
  return contractPathMap
}

// Helper function to extract base contract names from paths
function extractBaseContractNames(contractsToUpdate) {
  return contractsToUpdate.map((contractPath) => {
    const contractName = path.basename(contractPath)
    return contractName
      .replace('.sol', '')
      .replace('.vy', '')
      .replace('.md', '')
  })
}

// Traverse directories and copy documentation files
/**
 * Recursively traverses a directory, processes markdown files, and copies them to a destination directory
 * based on a contract map. It also adds a specified line to the top of each copied file.
 *
 * @param {string} baseDir - The base directory to start traversing from.
 * @param {string} extension - The file extension to append to the contract names.
 * @param {Object} contractMap - A map of contract names to their relative paths in the output directory.
 */
function traverseAndCopy(baseDir, outputBaseDir, extension, contractMap) {
  const entries = fs.readdirSync(baseDir)
  for (const entry of entries) {
    const entryPath = path.join(baseDir, entry)
    const stat = fs.statSync(entryPath)
    if (stat.isDirectory()) {
      // Recurse into subdirectories
      traverseAndCopy(entryPath, outputBaseDir, extension, contractMap)
    } else if (stat.isFile() && path.extname(entry) === '.md') {
      processMarkdownFile(
        entry,
        entryPath,
        extension,
        contractMap,
        outputBaseDir
      )
    }
  }
}

function processMarkdownFile(
  entry,
  entryPath,
  extension,
  contractMap,
  outputBaseDir
) {
  let fileBaseName = path.basename(entry, '.md')
  fileBaseName = removeForgePrefixes(fileBaseName)

  const contractName = fileBaseName + extension

  if (contractName in contractMap) {
    copyAndModifyFile(
      outputBaseDir,
      entryPath,
      contractName,
      extension,
      contractMap
    )
  }
}

function copyAndModifyFile(
  outputBaseDir,
  entryPath,
  contractName,
  extension,
  contractMap
) {
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
  console.log(`Copied ${contractName}`)

  // Add the specified line to the top of the copied file
  const disableLintLine = '<!-- markdownlint-disable MD024 MD034 MD036 -->\n'
  const fileContent = fs.readFileSync(destFilePath, 'utf8')
  fs.writeFileSync(destFilePath, disableLintLine + fileContent)
  // console.log(`Added markdownlint disable line to ${destFilePath}`)
}

/**
 * Removes prefixes added by Forge from the given file base name.
 *
 * @param {string} fileBaseName - The base name of the file.
 * @returns {string} - The file base name without Forge prefixes.
 */
function removeForgePrefixes(fileBaseName) {
  const prefixes = ['contract.', 'abstract.', 'interface.']
  for (const prefix of prefixes) {
    if (fileBaseName.startsWith(prefix)) {
      return fileBaseName.slice(prefix.length)
    }
  }
  return fileBaseName
}
