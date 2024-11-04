import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

/**
 * Generates documentation for each submodule using Forge.
 *
 * This function iterates over the `submodules` array, changes the current working directory
 * to each submodule's path, runs the Forge documentation generation command, and then
 * changes the directory back to the original directory.
 *
 * @function
 */
export function generateForgeDoc(submodules) {
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

/**
 * Generates Vydoc documentation for each submodule.
 *
 * This function iterates over the `submodules` array and generates Vydoc documentation
 * for each submodule. It resolves the input and output directories, checks if there are
 * any `.vy` files in the input directory, and if so, runs the `vydoc` command to generate
 * the documentation.
 *
 * @function
 * @name generateVydoc
 */
export function generateVydoc(submodules) {
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

/**
 * Checks if a directory or any of its subdirectories contain any files with the `.vy` extension.
 *
 * @param {string} dir - The directory path to search for `.vy` files.
 * @returns {boolean} - Returns `true` if any `.vy` files are found, otherwise `false`.
 */
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
