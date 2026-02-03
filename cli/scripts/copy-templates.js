import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const SRC_COMPONENTS = path.resolve(ROOT, 'src/components')
const CLI_TEMPLATES = path.resolve(ROOT, 'cli/templates')

const components = ['button', 'modal', 'card', 'alert', 'container', 'toast', 'input']

async function copyTemplates() {
  console.log('📦 Copying components to templates...\n')

  for (const component of components) {
    const srcDir = path.resolve(SRC_COMPONENTS, component.charAt(0).toUpperCase() + component.slice(1))
    const destDir = path.resolve(CLI_TEMPLATES, component)

    if (await fs.pathExists(srcDir)) {
      await fs.ensureDir(destDir)
      await fs.copy(srcDir, destDir)
      console.log(`✓ Copied ${component}`)
    } else {
      console.log(`⚠ Skipped ${component} (not found)`)
    }
  }

  console.log('\n✨ Done!')
}

copyTemplates().catch(console.error)
