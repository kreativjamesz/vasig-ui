import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { getConfigPath, getProjectRoot } from '../utils/paths.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLI_ROOT = path.resolve(__dirname, '../..')

export async function initCommand(options: { dir: string; css: string }) {
  const projectRoot = getProjectRoot()
  const configPath = getConfigPath()

  console.log(chalk.blue('🚀 Initializing Vasig UI...\n'))

  // Check if already initialized
  if (await fs.pathExists(configPath)) {
    console.log(chalk.yellow('⚠️  Vasig UI is already initialized in this project.'))
    const config = await fs.readJSON(configPath)
    console.log(chalk.gray(`   Components directory: ${config.componentsDir}`))
    console.log(chalk.gray(`   CSS file: ${config.cssFile}\n`))
    return
  }

  // Warn if using common UI library directory
  if (options.dir === 'src/components/ui') {
    console.log(chalk.yellow('⚠️  Warning: src/components/ui is commonly used by other UI libraries.'))
    console.log(chalk.yellow('   Consider using src/components/vasig or a custom directory.\n'))
  }

  // Create components directory
  const componentsDir = path.resolve(projectRoot, options.dir)
  await fs.ensureDir(componentsDir)
  console.log(chalk.green(`✓ Created components directory: ${options.dir}`))

  // Create or update CSS file
  const cssPath = path.resolve(projectRoot, options.css)
  const cssDir = path.dirname(cssPath)
  await fs.ensureDir(cssDir)

  const cssVars = `/* Vasig UI CSS Variables */
:root {
  /* Primary Colors */
  --vasig-primary: #3b82f6;
  --vasig-primary-hover: #2563eb;
  
  /* Secondary Colors */
  --vasig-secondary: #6b7280;
  --vasig-secondary-hover: #4b5563;
  
  /* Error Colors */
  --vasig-error: #ef4444;
  --vasig-error-hover: #dc2626;
  
  /* Gray Scale */
  --vasig-gray-50: #f9fafb;
  --vasig-gray-100: #f3f4f6;
  --vasig-gray-200: #e5e7eb;
  --vasig-gray-300: #d1d5db;
  --vasig-gray-400: #9ca3af;
  --vasig-gray-500: #6b7280;
  --vasig-gray-600: #4b5563;
  --vasig-gray-700: #374151;
  --vasig-gray-800: #1f2937;
  --vasig-gray-900: #111827;
}
`

  if (await fs.pathExists(cssPath)) {
    const existingCss = await fs.readFile(cssPath, 'utf-8')
    if (!existingCss.includes('--vasig-primary')) {
      await fs.appendFile(cssPath, `\n\n${cssVars}`)
      console.log(chalk.green(`✓ Added CSS variables to: ${options.css}`))
    } else {
      console.log(chalk.gray(`- CSS variables already exist in: ${options.css}`))
    }
  } else {
    await fs.writeFile(cssPath, cssVars)
    console.log(chalk.green(`✓ Created CSS file: ${options.css}`))
  }

  // Create config file
  const config = {
    componentsDir: options.dir,
    cssFile: options.css,
    version: '0.1.0'
  }

  await fs.writeJSON(configPath, config, { spaces: 2 })
  console.log(chalk.green(`✓ Created config file: vasig.json\n`))

  console.log(chalk.green('✨ Vasig UI initialized successfully!\n'))
  console.log(chalk.cyan('Next steps:'))
  console.log(chalk.gray('  1. Import the CSS file in your main.ts or main.js:'))
  console.log(chalk.white(`     import '${options.css}'`))
  console.log(chalk.gray('  2. Add components using:'))
  console.log(chalk.white('     npx vasig-ui-vue add button'))
  console.log(chalk.white('     npx vasig-ui-vue add modal\n'))
}
