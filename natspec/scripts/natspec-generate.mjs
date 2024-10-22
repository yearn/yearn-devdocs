import { execSync, exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'
import readline from 'readline'

const execPromise = promisify(exec)

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

function copyDocs(outputBaseDir, tempFolder, contractsToUpdate) {
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
  processForgeDocs()
  processVydocDocs()

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
  // Helper function to build a map of contract names to their paths
  // this could fail if there are duplicate file names in nested folders.
  function buildContractPathMap(obj, currentPath, contractsToUpdate) {
    let contractPathMap = {}
    const baseContractNames = extractBaseContractNames(contractsToUpdate)
    for (const [key, value] of Object.entries(obj)) {
      if (value.type === 'file') {
        const contractName = key
        const baseContractName = contractName
          .replace('.sol', '')
          .replace('.vy', '')
          .replace('.md', '')
        console.log('baseContractName: ', baseContractName)
        if (
          !contractsToUpdate ||
          baseContractNames.includes(baseContractName)
        ) {
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
          console.log(`Copied ${contractName}`)

          // Add the specified line to the top of the copied file
          const disableLintLine =
            '<!-- markdownlint-disable MD024 MD034 MD036 -->\n'
          const fileContent = fs.readFileSync(destFilePath, 'utf8')
          fs.writeFileSync(destFilePath, disableLintLine + fileContent)
          // console.log(`Added markdownlint disable line to ${destFilePath}`)
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
  if (currentVersion) {
    // Move files back from deprecated folder
    const deprecatedDir = path.join(
      outputBaseDir,
      'deprecated',
      `version-${currentVersion}`
    )
  }
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
  if (currentVersion) {
    updateVersionInIndex(path.join(outputBaseDir, 'index.md'), currentVersion)
  }
  cleanUpTempFolder(tempFolder)
  console.log('Changes reverted.')
}

/**
 * Prompts the user to choose between updating from a folder or a list of files,
 * and returns the corresponding list of file paths.
 *
 * @param {string} updateType - The type of update ('folder' or 'files').
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 * @throws {Error} If an invalid option is selected.
 */
function setFilesToUpdate(updateType) {
  return new Promise((resolve, reject) => {
    let result
    if (updateType === 'folder') {
      let arrayOfFiles = []
      const dirPath = path.resolve(
        'docs/developers/smart-contracts/v3/Periphery'
      )
      const files = fs.readdirSync(dirPath)

      files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
        } else {
          arrayOfFiles.push(filePath)
        }
      })
      result = arrayOfFiles
    } else if (updateType === 'files') {
      const filesToUpdate = [
        'yearn-vaults-v3',
        'vault-periphery',
        // Add other files as needed
      ]
      result = filesToUpdate
    } else {
      reject(new Error('Invalid option'))
      return
    }
    console.log('Selected files/folders to update:', result)
    resolve(result)
  })

  /**
   * Recursively retrieves all file paths from a given directory.
   *
   * @param {string} dirPath - The directory path to search for files.
   * @param {string[]} [arrayOfFiles=[]] - An array to accumulate file paths.
   * @returns {string[]} An array containing all file paths found in the directory and its subdirectories.
   */
  function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
      } else {
        arrayOfFiles.push(filePath)
      }
    })

    return arrayOfFiles
  }
}

/**
 * Accepts the user's response and proceeds if 'yes', or rejects if 'no'.
 *
 * @param {string} acceptance - User's acceptance of the selection ('yes' or 'no').
 * @param {Array} filesToUpdate - The list of files to update.
 * @returns {Promise<Array>} A promise that resolves to the list of files to update if accepted.
 * @throws {Error} If the selection is not accepted.
 */
function acceptFilesToUpdate(acceptance, filesToUpdate) {
  return new Promise((resolve, reject) => {
    if (acceptance.toLowerCase() === 'yes') {
      resolve(filesToUpdate)
    } else {
      console.log('Please modify the file list in the script and rerun.')
      reject(new Error('Selection not accepted'))
    }
  })
}

// try with git submodule update --remote --merge
async function updateSubmodules() {
  try {
    console.log('Updating submodules...')
    const initCommand = 'git submodule update --remote --merge'
    let { stdout, stderr } = await execPromise(initCommand)
    console.log(stdout)
    if (stderr) console.error(`Updating Error: ${stderr}`)
    console.log('Submodules initialized.')
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

async function updateSubmodules_old() {
  try {
    console.log('Updating submodules...')
    const initCommand = 'git submodule update --init --recursive'
    console.log(`Executing: ${initCommand}`)
    let { stdout, stderr } = await execPromise(initCommand)
    console.log(stdout)
    if (stderr) console.error(`Updating Error: ${stderr}`)
    console.log('Submodules initialized.')

    console.log('Fetching and pulling latest changes for submodules...')
    const fetchPullCommand =
      'git submodule foreach "git fetch && (git checkout main || git checkout master) && git pull"'
    console.log(`Executing: ${fetchPullCommand}`)
    let { stdout: stdout2, stderr: stderr2 } = await execPromise(
      fetchPullCommand
    )
    console.log(stdout2)
    if (stderr2) console.error(`Fetching Error: ${stderr2}`)
    console.log('Submodules updated.')
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

// Main function
async function main() {
  try {
    await updateSubmodules()
    console.log('Submodule update process completed.')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    function askQuestion(query) {
      return new Promise((resolve) => {
        rl.question(query, (answer) => {
          resolve(answer)
        })
      })
    }

    const action = await askQuestion(
      'New Version or Update Existing Version (new/update): '
    )

    if (action === 'new') {
      const newVersion = await askQuestion(
        'Enter the new version number (#.#.#): '
      )
      if (!newVersion) {
        console.error('New version number must be provided')
        rl.close()
        return
      }
      let contractsToUpdate = null
      const tempFolder = path.resolve('natspec/temp')
      const outputBaseDir = path.resolve('docs/developers/smart-contracts/v3')
      const indexFilePath = path.join(outputBaseDir, 'index.md')
      // Extract the current version number
      const currentVersion = extractCurrentVersion(indexFilePath)
      console.log(`Current version: ${currentVersion}`)

      try {
        // Move files and folders to the deprecated folder
        moveToDeprecated(outputBaseDir, currentVersion)
        console.log(`Moved old natspec docs to deprecated folder`)

        // Generate docs with forge and vydoc
        generateForgeDoc()
        generateVydoc()
        // Copy documentation files to the output directory
        copyDocs(outputBaseDir, tempFolder, contractsToUpdate)
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
    } else if (action === 'update') {
      const updateOption = await askQuestion(
        'Update All or Selected Files? (all/selected): '
      )
      let contractsToUpdate = null
      if (updateOption === 'all') {
        console.log('Updating all contracts.')
      } else if (updateOption === 'selected') {
        const updateType = await askQuestion(
          'Update from Folder or List of Files? (folder/files): '
        )
        try {
          contractsToUpdate = await setFilesToUpdate(updateType)
          const acceptance = await askQuestion(
            'Are these the correct files to update? (yes/no): '
          )
          await acceptFilesToUpdate(acceptance, contractsToUpdate)
        } catch (error) {
          console.error(error.message)
          rl.close()
          return
        }
      } else {
        console.error('Invalid option')
        rl.close()
        return
      }

      const tempFolder = path.resolve('natspec/temp')
      const outputBaseDir = path.resolve('docs/developers/smart-contracts/v3')
      const indexFilePath = path.join(outputBaseDir, 'index.md')
      // Extract the current version number
      const currentVersion = extractCurrentVersion(indexFilePath)

      try {
        // Generate docs with forge and vydoc
        generateForgeDoc()
        generateVydoc()
        // Copy documentation files to the output directory
        copyDocs(outputBaseDir, tempFolder, contractsToUpdate)
        lintMarkdownFiles(outputBaseDir)
        console.log(
          `Natspec docs for Yearn Vaults v3 updated successfully and saved to ${outputBaseDir}.`
        )
      } catch (error) {
        console.error('Script Error:', error)
        revertChanges(outputBaseDir, tempFolder, currentVersion)
      } finally {
        rl.close()
        cleanUpTempFolder(tempFolder)
      }
    } else {
      console.error('Invalid option')
      rl.close()
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

main()
