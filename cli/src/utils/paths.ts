import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getProjectRoot(): string {
  let currentDir = process.cwd()

  // Look for package.json or vasig.json
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json')
    const vasigJsonPath = path.join(currentDir, 'vasig.json')

    if (fs.existsSync(packageJsonPath) || fs.existsSync(vasigJsonPath)) {
      return currentDir
    }

    currentDir = path.dirname(currentDir)
  }

  return process.cwd()
}

export function getConfigPath(): string {
  return path.join(getProjectRoot(), 'vasig.json')
}
