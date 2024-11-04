import { promises as fs } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

async function addSubmodules() {
  try {
    // Load the JSON data from the file
    const data = JSON.parse(await fs.readFile('smartContracts.json', 'utf8'))

    // Extract the submodules list
    const submodules = data.Submodules || []
    console.log('Submodules to add:', submodules)

    // Base directory for submodules (use relative path)
    const baseDir = 'natspec/lib'

    // Ensure the base directory exists
    await fs.mkdir(baseDir, { recursive: true })

    // Add each submodule
    for (const url of submodules) {
      try {
        // Ensure the URL has the .git extension
        const repoUrl = url.endsWith('.git') ? url : `${url}.git`
        // Extract the repository name from the URL
        const repoName = path.basename(repoUrl, '.git')
        // Construct the path for the submodule (still relative)
        const submodulePath = path.join(baseDir, repoName)

        // Check if the submodule path already exists and remove it if necessary
        if (await fs.stat(submodulePath).catch(() => false)) {
          console.log(`Removing existing directory: ${submodulePath}`)
          await fs.rm(submodulePath, { recursive: true, force: true })
        }

        // Run the git submodule add command
        console.log(`Adding submodule: ${repoUrl} at ${submodulePath}`)
        execSync(`git submodule add ${repoUrl} ${submodulePath}`, {
          stdio: 'inherit',
        })
      } catch (error) {
        console.error(`Failed to add submodule ${url}:`, error.message)
      }
    }

    // Initialize and update submodules recursively
    console.log('Initializing and updating submodules recursively...')
    execSync('git submodule update --init --recursive', { stdio: 'inherit' })

    console.log('Submodules added and initialized successfully.')
  } catch (error) {
    console.error('Error adding submodules:', error.message)
  }
}

addSubmodules()
