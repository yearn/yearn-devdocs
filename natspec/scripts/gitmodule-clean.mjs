import { execSync } from 'child_process'
import { promises as fs } from 'fs'

// Function to clean up submodules
async function cleanSubmodules() {
  try {
    // Deinitialize all submodules
    execSync('git submodule deinit -f --all', { stdio: 'inherit' })

    // Remove the submodule directories from the .git/modules directory
    execSync('rm -rf .git/modules/*', { stdio: 'inherit' })

    // Remove the submodule directories from the working directory
    execSync('rm -rf natspec/lib/*', { stdio: 'inherit' })

    // // Remove the .gitmodules file if it exists
    // try {
    //   await fs.unlink('.gitmodules')
    // } catch (err) {
    //   if (err.code !== 'ENOENT') throw err
    // }

    // Check if there are any submodule sections in .git/config
    try {
      const configOutput = execSync('git config -l').toString()
      const hasSubmoduleSection = configOutput.includes('submodule.')

      if (hasSubmoduleSection) {
        // Remove submodule entries from .git/config
        execSync('git config -f .git/config --remove-section submodule', {
          stdio: 'inherit',
        })
      }
    } catch (err) {
      console.error(
        'Error checking or removing submodule section:',
        err.message
      )
    }

    console.log('Submodules cleaned successfully.')
  } catch (error) {
    console.error('Error cleaning submodules:', error.message)
  }
}

// Run the cleanSubmodules function
cleanSubmodules()
