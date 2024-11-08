import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { generateForgeDoc, generateVydoc } from './helpers/generateDocs.mjs'
import {
  copyDocs,
  extractCurrentVersion,
  updateVersionInIndex,
  lintMarkdownFiles,
  moveToDeprecated,
} from './helpers/copyDocs.mjs'
import { updateSubmodules } from './helpers/submodules.mjs'
import { cleanUpTempFolder, revertChanges } from './helpers/cleanUp.mjs'

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

const filesToUpdate = [
  'VaultV3',
  'VaultFactory',
  // Add other files as needed
]

const folderToUpdate = path.resolve(
  'docs/developers/smart-contracts/V3/Periphery' //change as needed
)

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
      const files = fs.readdirSync(folderToUpdate)

      files.forEach((file) => {
        const filePath = path.join(folderToUpdate, file)
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
        } else {
          arrayOfFiles.push(filePath)
        }
      })
      result = arrayOfFiles
    } else if (updateType === 'files') {
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
      const outputBaseDir = path.resolve('docs/developers/smart-contracts/V3')
      const indexFilePath = path.join(outputBaseDir, 'index.md')
      // Extract the current version number
      const currentVersion = extractCurrentVersion(indexFilePath)
      console.log(`Current version: ${currentVersion}`)

      try {
        // Move files and folders to the deprecated folder
        const deprecatedDir = moveToDeprecated(outputBaseDir, currentVersion)
        console.log(`Moved old natspec docs to deprecated folder`)

        // Generate docs with forge and vydoc
        generateForgeDoc(submodules)
        generateVydoc(submodules)
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
      const outputBaseDir = path.resolve('docs/developers/smart-contracts/V3')
      const indexFilePath = path.join(outputBaseDir, 'index.md')
      const deprecatedDir = null
      const currentVersion = null

      try {
        // Generate docs with forge and vydoc
        generateForgeDoc(submodules)
        generateVydoc(submodules)
        // Copy documentation files to the output directory
        copyDocs(outputBaseDir, tempFolder, contractsToUpdate)
        lintMarkdownFiles(outputBaseDir)
        console.log(
          `Natspec docs for Yearn Vaults v3 updated successfully and saved to ${outputBaseDir}.`
        )
      } catch (error) {
        console.error('Script Error:', error)
        revertChanges(outputBaseDir, tempFolder, currentVersion, deprecatedDir)
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
