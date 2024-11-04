import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

/**
 * Updates git submodules by running the command to update and merge remote changes.
 * Logs the progress and any errors encountered during the process.
 *
 * @async
 * @function updateSubmodules
 * @returns {Promise<void>} A promise that resolves when the submodules have been updated.
 * @throws Will throw an error if the update process fails.
 */
export async function updateSubmodules() {
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
