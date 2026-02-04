import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Find package root by looking for package.json
async function findPackageRoot(startDir: string): Promise<string | null> {
  let currentDir = startDir
  const root = path.parse(currentDir).root

  while (currentDir !== root) {
    const packageJsonPath = path.join(currentDir, 'package.json')
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const pkg = await fs.readJSON(packageJsonPath)
        if (pkg.name === 'vasig-ui-vue') {
          return currentDir
        }
      } catch {
        // Continue searching
      }
    }
    currentDir = path.dirname(currentDir)
  }
  return null
}

export async function getAvailableComponents(): Promise<string[]> {
  // Find package root
  const packageRoot = await findPackageRoot(__dirname)
  
  // Try multiple possible locations for templates
  const possiblePaths = [
    packageRoot ? path.resolve(packageRoot, 'templates') : null, // From package root
    path.resolve(__dirname, '../../templates'), // npm install: dist/utils -> dist -> package root -> templates
    path.resolve(__dirname, '../../../templates'), // fallback
    path.resolve(process.cwd(), 'node_modules/vasig-ui-vue/templates'), // absolute npm path
    path.resolve(process.cwd(), 'cli/templates'), // local dev
    path.resolve(process.cwd(), 'templates') // fallback
  ].filter((p): p is string => p !== null)
  
  let templatesDir = ''
  for (const possiblePath of possiblePaths) {
    if (await fs.pathExists(possiblePath)) {
      templatesDir = possiblePath
      break
    }
  }

  if (!templatesDir || !(await fs.pathExists(templatesDir))) {
    return []
  }

  const entries = await fs.readdir(templatesDir, { withFileTypes: true })
  const components = entries
    .filter((entry: fs.Dirent) => entry.isDirectory())
    .map((entry: fs.Dirent) => entry.name)
    .sort()

  return components
}
