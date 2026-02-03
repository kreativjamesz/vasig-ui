import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { getConfigPath, getProjectRoot } from '../utils/paths.js'
import { getAvailableComponents } from '../utils/components.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function addCommand(componentName: string, options: { overwrite: boolean }) {
  const projectRoot = getProjectRoot()
  const configPath = getConfigPath()

  // Check if initialized
  if (!(await fs.pathExists(configPath))) {
    console.log(chalk.red('❌ Vasig UI is not initialized in this project.\n'))
    console.log(chalk.yellow('Run: npx vasig-ui-vue init\n'))
    process.exit(1)
  }

  const config = await fs.readJSON(configPath)
  const availableComponents = await getAvailableComponents()

  // Normalize component name
  const normalizedName = componentName.toLowerCase()
  const componentKey = availableComponents.find(
    (c) => c.toLowerCase() === normalizedName
  )

  if (!componentKey) {
    console.log(chalk.red(`❌ Component "${componentName}" not found.\n`))
    console.log(chalk.yellow('Available components:'))
    availableComponents.forEach((c) => {
      console.log(chalk.gray(`  - ${c}`))
    })
    console.log()
    process.exit(1)
  }

  console.log(chalk.blue(`📦 Adding ${componentKey} component...\n`))

  // Source and destination paths - try multiple possible locations
  // When installed via npm: node_modules/vasig-ui-vue/dist/commands/add.js
  // When in development: cli/dist/commands/add.js
  const possibleTemplatePaths = [
    path.resolve(__dirname, '../../templates', componentKey), // npm install: dist/commands -> dist -> package root -> templates
    path.resolve(__dirname, '../../../templates', componentKey), // fallback
    path.resolve(process.cwd(), 'node_modules/vasig-ui-vue/templates', componentKey), // absolute npm path
    path.resolve(process.cwd(), 'cli/templates', componentKey), // local dev
    path.resolve(process.cwd(), 'templates', componentKey) // fallback
  ]
  
  let templateDir = ''
  for (const possiblePath of possibleTemplatePaths) {
    if (await fs.pathExists(possiblePath)) {
      templateDir = possiblePath
      break
    }
  }
  
  const destDir = path.resolve(projectRoot, config.componentsDir, componentKey)

  // Check if component already exists
  if (await fs.pathExists(destDir) && !options.overwrite) {
    console.log(chalk.yellow(`⚠️  Component "${componentKey}" already exists.`))
    console.log(chalk.gray('   Use --overwrite flag to replace it.\n'))
    process.exit(1)
  }

  // Copy component files
  if (!templateDir || !(await fs.pathExists(templateDir))) {
    console.log(chalk.red(`❌ Template for "${componentKey}" not found.\n`))
    console.log(chalk.gray(`   Searched in: ${possibleTemplatePaths.join(', ')}\n`))
    process.exit(1)
  }

  await fs.ensureDir(destDir)
  await fs.copy(templateDir, destDir, { overwrite: options.overwrite })

  console.log(chalk.green(`✓ Added ${componentKey} component to ${config.componentsDir}/${componentKey}\n`))

  // Show usage instructions
  const componentNamePascal = componentKey.charAt(0).toUpperCase() + componentKey.slice(1)
  console.log(chalk.cyan('Usage:'))
  console.log(chalk.gray(`  import ${componentNamePascal} from '@/components/ui/${componentKey}/${componentNamePascal}.vue'`))
  console.log(chalk.gray(`  // or`))
  console.log(chalk.gray(`  import ${componentNamePascal} from '${config.componentsDir}/${componentKey}/${componentNamePascal}.vue'\n`))
}
