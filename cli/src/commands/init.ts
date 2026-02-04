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

  // Create utils directory and cn utility
  // Try to determine utils directory from components directory
  let utilsDir: string
  if (options.dir.includes('components')) {
    utilsDir = path.resolve(projectRoot, options.dir.replace('components', 'utils'))
  } else {
    // Fallback: create utils in src/utils
    utilsDir = path.resolve(projectRoot, 'src/utils')
  }
  
  await fs.ensureDir(utilsDir)
  const utilsPath = path.resolve(utilsDir, 'cn.ts')
  const utilsTemplate = `import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
  if (!(await fs.pathExists(utilsPath))) {
    await fs.writeFile(utilsPath, utilsTemplate)
    console.log(chalk.green(`✓ Created utils/cn.ts utility`))
  } else {
    console.log(chalk.gray(`- Utils file already exists: ${utilsPath}`))
  }

  // Create or update CSS file
  const cssPath = path.resolve(projectRoot, options.css)
  const cssDir = path.dirname(cssPath)
  await fs.ensureDir(cssDir)

  const cssVars = `@import "tailwindcss";

@theme {
  /* Primary Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  
  /* Secondary Colors */
  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  
  /* Error Colors */
  --color-error: #ef4444;
  --color-error-hover: #dc2626;
}
`

  if (await fs.pathExists(cssPath)) {
    const existingCss = await fs.readFile(cssPath, 'utf-8')
    if (!existingCss.includes('--color-primary') && !existingCss.includes('@import "tailwindcss"')) {
      await fs.appendFile(cssPath, `\n\n${cssVars}`)
      console.log(chalk.green(`✓ Added Tailwind CSS and variables to: ${options.css}`))
    } else {
      console.log(chalk.gray(`- Tailwind CSS already configured in: ${options.css}`))
    }
  } else {
    await fs.writeFile(cssPath, cssVars)
    console.log(chalk.green(`✓ Created CSS file with Tailwind CSS: ${options.css}`))
  }

  // Create config file
  const config = {
    componentsDir: options.dir,
    cssFile: options.css,
    version: '0.1.0'
  }

  await fs.writeJSON(configPath, config, { spaces: 2 })
  console.log(chalk.green(`✓ Created config file: vasig.json\n`))

  // Configure @ alias in tsconfig.json
  const tsconfigPath = path.resolve(projectRoot, 'tsconfig.json')
  if (await fs.pathExists(tsconfigPath)) {
    try {
      const tsconfig = await fs.readJSON(tsconfigPath)
      if (!tsconfig.compilerOptions) {
        tsconfig.compilerOptions = {}
      }
      if (!tsconfig.compilerOptions.paths) {
        tsconfig.compilerOptions.paths = {}
      }
      if (!tsconfig.compilerOptions.paths['@/*']) {
        tsconfig.compilerOptions.paths['@/*'] = ['src/*']
        if (!tsconfig.compilerOptions.baseUrl) {
          tsconfig.compilerOptions.baseUrl = '.'
        }
        await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 })
        console.log(chalk.green(`✓ Configured @ alias in tsconfig.json`))
      } else {
        console.log(chalk.gray(`- @ alias already configured in tsconfig.json`))
      }
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not update tsconfig.json: ${error}`))
    }
  }

  // Configure @ alias in vite.config.ts
  const viteConfigPath = path.resolve(projectRoot, 'vite.config.ts')
  const viteConfigJsPath = path.resolve(projectRoot, 'vite.config.js')
  const viteConfigPathToCheck = await fs.pathExists(viteConfigPath) ? viteConfigPath : viteConfigJsPath
  
  if (await fs.pathExists(viteConfigPathToCheck)) {
    try {
      let viteConfigContent = await fs.readFile(viteConfigPathToCheck, 'utf-8')
      
      // Check if @ alias already exists
      if (!viteConfigContent.includes("'@':") && !viteConfigContent.includes('"@":') && !viteConfigContent.includes("'@'") && !viteConfigContent.includes('"@"')) {
        // Add path import if not exists
        if (!viteConfigContent.includes("from 'path'") && !viteConfigContent.includes('from "path"')) {
          // Find the last import statement and add after it
          const importMatch = viteConfigContent.match(/^import.*from.*$/gm)
          if (importMatch && importMatch.length > 0) {
            const lastImport = importMatch[importMatch.length - 1]
            viteConfigContent = viteConfigContent.replace(
              lastImport,
              `${lastImport}\nimport { resolve } from 'path'`
            )
          } else {
            // Add at the top if no imports
            viteConfigContent = `import { resolve } from 'path'\n${viteConfigContent}`
          }
        }
        
        // Add resolve.alias configuration
        // Look for existing resolve block
        if (viteConfigContent.includes('resolve:')) {
          // If resolve exists, add alias inside it
          if (!viteConfigContent.includes('alias:')) {
            viteConfigContent = viteConfigContent.replace(
              /(resolve:\s*\{)/,
              `$1\n      alias: {\n        '@': resolve(__dirname, 'src')\n      },`
            )
          } else if (!viteConfigContent.match(/alias:\s*\{[\s\S]*?'@'/)) {
            // Add @ to existing alias object
            viteConfigContent = viteConfigContent.replace(
              /(alias:\s*\{)/,
              `$1\n        '@': resolve(__dirname, 'src'),`
            )
          }
        } else {
          // Add resolve block - try to add after plugins
          if (viteConfigContent.includes('plugins:')) {
            // Find plugins block and add resolve after it
            viteConfigContent = viteConfigContent.replace(
              /(plugins:\s*\[[\s\S]*?\],?)/,
              `$1,\n    resolve: {\n      alias: {\n        '@': resolve(__dirname, 'src')\n      }\n    }`
            )
          } else {
            // Add at the end of config object
            viteConfigContent = viteConfigContent.replace(
              /(export default\s+defineConfig\([\s\S]*?\{)/,
              `$1\n    resolve: {\n      alias: {\n        '@': resolve(__dirname, 'src')\n      }\n    },`
            )
          }
        }
        
        await fs.writeFile(viteConfigPathToCheck, viteConfigContent)
        console.log(chalk.green(`✓ Configured @ alias in vite.config.ts`))
      } else {
        console.log(chalk.gray(`- @ alias already configured in vite.config.ts`))
      }
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not automatically update vite.config.ts`))
      console.log(chalk.yellow(`   Please manually add the following:`))
      console.log(chalk.white(`   import { resolve } from 'path'`))
      console.log(chalk.white(`   resolve: { alias: { '@': resolve(__dirname, 'src') } }`))
    }
  } else {
    console.log(chalk.yellow(`⚠️  vite.config.ts not found. Please manually configure @ alias.`))
  }

  console.log(chalk.green('✨ Vasig UI initialized successfully!\n'))
  console.log(chalk.cyan('Next steps:'))
  console.log(chalk.gray('  1. Install dependencies:'))
  console.log(chalk.white('     npm install -D tailwindcss@next @tailwindcss/vite@next'))
  console.log(chalk.white('     npm install clsx tailwind-merge'))
  console.log(chalk.gray('  2. Add Tailwind plugin to vite.config.ts:'))
  console.log(chalk.white('     import tailwindcss from "@tailwindcss/vite"'))
  console.log(chalk.white('     plugins: [vue(), tailwindcss()]'))
  console.log(chalk.gray('  3. Import the CSS file in your main.ts or main.js:'))
  console.log(chalk.white(`     import '${options.css}'`))
  console.log(chalk.gray('  4. Add components using:'))
  console.log(chalk.white('     npx vasig-ui-vue add button'))
  console.log(chalk.white('     npx vasig-ui-vue add modal'))
  console.log(chalk.gray('  5. Important: Path alias configuration'))
  console.log(chalk.yellow('     The @ alias has been auto-configured in tsconfig.json and vite.config.ts'))
  console.log(chalk.yellow('     If you see import errors, verify these files have the correct path alias setup\n'))
}
