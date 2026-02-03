import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function getAvailableComponents(): Promise<string[]> {
  // When installed via npm: node_modules/vasig-ui-vue/dist/utils/components.js
  // When in development: cli/dist/utils/components.js
  // Try multiple possible locations for templates
  const possiblePaths = [
    path.resolve(__dirname, '../../templates'), // npm install: dist/utils -> dist -> package root -> templates
    path.resolve(__dirname, '../../../templates'), // fallback
    path.resolve(process.cwd(), 'node_modules/vasig-ui-vue/templates'), // absolute npm path
    path.resolve(process.cwd(), 'cli/templates'), // local dev
    path.resolve(process.cwd(), 'templates') // fallback
  ]
  
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
