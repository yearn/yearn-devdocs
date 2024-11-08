import path from 'path'
import fs from 'fs'
import { updateVersionInIndex } from './copyDocs.mjs'

/**
 * Deletes the specified temporary directory if it exists.
 *
 * @param {string} tempDir - The path to the temporary directory to be deleted.
 */
export function cleanUpTempFolder(tempDir) {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
    console.log(`Deleted ${tempDir}`)
  } else {
    console.log(`${tempDir} does not exist`)
  }
}

/**
 * Reverts changes by moving files back from the deprecated folder to the output base directory,
 * updating the version in the index file, and cleaning up the temporary folder.
 *
 * @param {string} outputBaseDir - The base directory where the output files are located.
 * @param {string} tempFolder - The temporary folder to be cleaned up.
 * @param {string} currentVersion - The current version of the files to be reverted.
 * @param {string} deprecatedDir - The deprecated folder where the files are moved
 */
export function revertChanges(
  outputBaseDir,
  tempFolder,
  currentVersion,
  deprecatedDir
) {
  console.log('Reverting changes...')
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
