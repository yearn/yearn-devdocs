import { execSync } from 'child_process'
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

// this could fail if there are duplicate file names in nested folders.
/**
 * Builds a map of contract file paths.
 *
 * @param {Object} obj - The object representing the directory structure.
 * @param {string} currentPath - The current path in the directory structure.
 * @param {Array<string>} [contractsToUpdate] - An optional array of contract names to update.
 * @returns {Object} A map where the keys are contract names and the values are their respective file paths.
 */
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

/**
 * Processes a markdown file by removing forge prefixes from its basename,
 * constructing the contract name, and copying and modifying the file if the
 * contract name exists in the contract map.
 *
 * @param {string} entry - The name of the markdown file.
 * @param {string} entryPath - The path to the markdown file.
 * @param {string} extension - The extension to be appended to the file basename.
 * @param {Object} contractMap - A map of contract names to their respective data.
 * @param {string} outputBaseDir - The base directory where the modified file will be copied.
 */
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

/**
 * Copies a file to a new location, modifies its content, and saves it.
 *
 * @param {string} outputBaseDir - The base directory where the file will be copied to.
 * @param {string} entryPath - The path of the file to be copied.
 * @param {string} contractName - The name of the contract associated with the file.
 * @param {string} extension - The file extension of the original file.
 * @param {Object} contractMap - A mapping of contract names to their relative paths.
 */
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
  console.log(`\nCopying ${contractName}`)

  // Add the specified line to the top of the copied file
  let fileContent = fs.readFileSync(destFilePath, 'utf8')

  // Add the specified line to the top of the copied file
  fileContent = addDisableLintLine(fileContent)

  // Process the inherits line
  fileContent = processInheritsLine(fileContent)

  // Replace curly brackets with backticks
  fileContent = replaceCurlyBrackets(fileContent)

  // Write the modified content back to the file
  fs.writeFileSync(destFilePath, fileContent)
}

/**
 * Adds a markdownlint disable line to the beginning of the provided file content.
 *
 * @param {string} fileContent - The content of the file to which the disable lint line will be added.
 * @returns {string} The file content with the markdownlint disable line prepended.
 */
function addDisableLintLine(fileContent) {
  const disableLintLine = '<!-- markdownlint-disable MD024 MD034 MD036 -->\n'
  return disableLintLine + fileContent
}

/**
 * Processes the first 10 lines of the given file content to find and update the '**Inherits:**' line.
 * If the '**Inherits:**' line is found, it replaces any markdown links with just the text and updates the line.
 * If the '**Inherits:**' line has no content on the same line, it checks the next line for content.
 *
 * @param {string} fileContent - The content of the file to process.
 * @returns {string} - The updated file content with the processed '**Inherits:**' line.
 */
function processInheritsLine(fileContent) {
  const lines = fileContent.split('\n')
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    let line = lines[i].trim()

    // Match '**Inherits:**' possibly followed by content
    const inheritsMatch = line.match(/^\*\*Inherits:\*\*(.*)/)

    if (inheritsMatch) {
      let inheritsText = inheritsMatch[1].trim()
      let contentLineIndex = i

      // If there's no content on the same line, check the next line
      if (!inheritsText && i + 1 < lines.length) {
        contentLineIndex = i + 1
        inheritsText = lines[contentLineIndex].trim()
      }

      // Replace links with just the text
      inheritsText = inheritsText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

      console.log(
        `Replacing inherits line: ${lines[contentLineIndex]} with **Inherits:** ${inheritsText}`
      )

      // Update the lines
      lines[i] = `**Inherits:** ${inheritsText}`

      // If content was on the next line, remove that line
      if (contentLineIndex !== i) {
        lines.splice(contentLineIndex, 1)
      }

      break
    }
  }
  return lines.join('\n')
}

/**
 * Replaces curly brackets in the given file content with backticks.
 *
 * This function searches for all occurrences of text enclosed in curly brackets
 * (e.g., {example}) and replaces them with the same text enclosed in backticks
 * (e.g., `example`). It logs each replacement to the console.
 *
 * @param {string} fileContent - The content of the file in which to replace curly brackets.
 * @returns {string} The modified file content with curly brackets replaced by backticks.
 */
function replaceCurlyBrackets(fileContent) {
  const curlyBracketsRegex = /\{([^\r\n{}]{0,20})\}/g
  let match
  while ((match = curlyBracketsRegex.exec(fileContent)) !== null) {
    console.log(`Replacing: ${match[0]} with \`${match[1]}\``)
    fileContent = fileContent.replace(match[0], `\`${match[1]}\``)
  }
  return fileContent
}
