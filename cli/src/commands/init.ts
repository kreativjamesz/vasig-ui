import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { getConfigPath, getProjectRoot } from '../utils/paths.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLI_ROOT = path.resolve(__dirname, '../..')

export async function initCommand(options: { dir?: string; css?: string }) {
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

  // Interactive questions if options not provided
  let answers: {
    componentsDir: string
    installTailwind: boolean
    cssFile?: string
    componentsAlias: string
    utilsAlias: string
    enableDarkMode: boolean
    useCustomGray: boolean
  }

  // Detect Laravel project
  const isLaravel = await fs.pathExists(path.resolve(projectRoot, 'artisan')) || 
                    await fs.pathExists(path.resolve(projectRoot, 'app'))
  
  // Set defaults based on project type
  const defaultComponentsDir = isLaravel ? 'resources/js/components/vasig' : 'src/components/vasig'
  const defaultCssFile = isLaravel ? 'resources/css/app.css' : 'src/style.css'
  const utilsDir = isLaravel ? 'resources/js/utils' : 'src/utils'
  
  if (isLaravel) {
    console.log(chalk.cyan('📦 Laravel project detected! Using Laravel-specific defaults.\n'))
  }

  if (options.dir && options.css) {
    // Use provided options, but still ask for other configs
    const installTailwindAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'installTailwind',
        message: 'Do you want to install/configure Tailwind CSS in your global CSS file?',
        default: true
      }
    ])

    const additionalAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentsAlias',
        message: 'Configure the import alias for components?',
        default: '@/components',
        validate: (input: string) => input.length > 0 || 'Components alias is required'
      },
      {
        type: 'input',
        name: 'utilsAlias',
        message: 'Configure the import alias for utils?',
        default: '@/utils',
        validate: (input: string) => input.length > 0 || 'Utils alias is required'
      },
      {
        type: 'confirm',
        name: 'enableDarkMode',
        message: 'Would you like to configure dark mode variant?',
        default: true,
        when: () => installTailwindAnswer.installTailwind === true
      },
      {
        type: 'confirm',
        name: 'useCustomGray',
        message: 'Would you like to use custom neutral gray colors (overrides Tailwind\'s blue-tinted gray)?',
        default: true,
        when: () => installTailwindAnswer.installTailwind === true
      }
    ])

    answers = {
      componentsDir: options.dir,
      installTailwind: installTailwindAnswer.installTailwind,
      cssFile: options.css,
      ...additionalAnswers
    }
  } else {
    // Full interactive mode
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentsDir',
        message: 'Where would you like to install your components?',
        default: defaultComponentsDir,
        validate: (input: string) => {
          if (input.length === 0) return 'Components directory is required'
          if (input === 'src/components/ui') {
            console.log(chalk.yellow('\n⚠️  Warning: src/components/ui is commonly used by other UI libraries.'))
            console.log(chalk.yellow('   Consider using src/components/vasig or a custom directory.\n'))
          }
          return true
        }
      },
      {
        type: 'confirm',
        name: 'installTailwind',
        message: 'Do you want to install/configure Tailwind CSS in your global CSS file?',
        default: true
      },
      {
        type: 'input',
        name: 'cssFile',
        message: 'Where is your global CSS file?',
        default: defaultCssFile,
        validate: (input: string) => input.length > 0 || 'CSS file path is required',
        when: (answers: any) => answers.installTailwind === true
      },
      {
        type: 'input',
        name: 'componentsAlias',
        message: 'Configure the import alias for components?',
        default: '@/components',
        validate: (input: string) => input.length > 0 || 'Components alias is required'
      },
      {
        type: 'input',
        name: 'utilsAlias',
        message: 'Configure the import alias for utils?',
        default: '@/utils',
        validate: (input: string) => input.length > 0 || 'Utils alias is required'
      },
      {
        type: 'confirm',
        name: 'enableDarkMode',
        message: 'Would you like to configure dark mode variant?',
        default: true,
        when: (answers: any) => answers.installTailwind === true
      },
      {
        type: 'confirm',
        name: 'useCustomGray',
        message: 'Would you like to use custom neutral gray colors (overrides Tailwind\'s blue-tinted gray)?',
        default: true,
        when: (answers: any) => answers.installTailwind === true
      }
    ])
  }

  // Determine final CSS file path (only if installing Tailwind)
  const finalCssFile = answers.installTailwind ? (answers.cssFile || defaultCssFile) : undefined

  const finalOptions = {
    dir: answers.componentsDir,
    css: finalCssFile,
    installTailwind: answers.installTailwind,
    utilsDir: utilsDir,
    componentsAlias: answers.componentsAlias,
    utilsAlias: answers.utilsAlias,
    enableDarkMode: answers.enableDarkMode ?? false,
    useCustomGray: answers.useCustomGray ?? false
  }

  // Create components directory
  const componentsDir = path.resolve(projectRoot, finalOptions.dir)
  await fs.ensureDir(componentsDir)
  console.log(chalk.green(`✓ Created components directory: ${finalOptions.dir}`))

  // Create utils directory and cn utility
  const utilsDirPath = path.resolve(projectRoot, finalOptions.utilsDir)
  await fs.ensureDir(utilsDirPath)
  const utilsPath = path.resolve(utilsDirPath, 'cn.ts')
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

  // Create or update CSS file (only if installing Tailwind)
  if (!finalOptions.installTailwind) {
    console.log(chalk.gray(`- Skipping Tailwind CSS configuration (user chose not to install)`))
  } else if (!finalOptions.css) {
    console.log(chalk.yellow(`⚠️  CSS file path not provided, skipping Tailwind CSS configuration`))
  } else {
    const cssPath = path.resolve(projectRoot, finalOptions.css)
    const cssDir = path.dirname(cssPath)
    await fs.ensureDir(cssDir)

  // Build CSS content based on options
  let cssVars = `@import "tailwindcss";

@theme {
  /* Primary Colors */
  --color-primary: #55aa00;
  --color-primary-hover: #448800;
  
  /* Secondary Colors */
  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  
  /* Error Colors */
  --color-error: #ef4444;
  --color-error-hover: #dc2626;
`

  // Add custom gray colors if enabled
  if (finalOptions.useCustomGray) {
    cssVars += `
  /* Gray Scale - Override Tailwind's default blue-tinted gray */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #262626;
  --color-gray-900: #1a1a1a;
`
  }

  cssVars += `}
`

  // Add dark mode variant if enabled
  if (finalOptions.enableDarkMode) {
    cssVars += `
@variant dark (&:where(.dark, .dark *));
`
  }

  cssVars += `
* {
  box-sizing: border-box;
}

html {
  color-scheme: light dark;
}

html:not(.dark) {
  background-color: #f9fafb;
  color: #111827;
}

html.dark {
  background-color: ${finalOptions.useCustomGray ? '#1a1a1a' : '#111827'};
  color: #f9fafb;
}

body {
  background-color: inherit;
  color: inherit;
  transition: background-color 0.2s ease, color 0.2s ease;
}
`

  // Check if CSS file exists and ask for confirmation to overwrite
  if (await fs.pathExists(cssPath)) {
    const existingCss = await fs.readFile(cssPath, 'utf-8')
    
    // Check if already has Vasig UI config
    if (existingCss.includes('--color-primary') || existingCss.includes('@import "tailwindcss"')) {
      console.log(chalk.gray(`- Tailwind CSS already configured in: ${finalOptions.css}`))
    } else {
      // Ask for confirmation to overwrite existing file
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `⚠️  The file ${finalOptions.css} already exists. Do you want to overwrite it? (This will replace all content)`,
          default: false
        }
      ])

      if (overwrite) {
        await fs.writeFile(cssPath, cssVars)
        console.log(chalk.green(`✓ Overwritten CSS file with Tailwind CSS: ${finalOptions.css}`))
      } else {
        // Append instead
        await fs.appendFile(cssPath, `\n\n${cssVars}`)
        console.log(chalk.green(`✓ Added Tailwind CSS and variables to: ${finalOptions.css}`))
      }
    }
  } else {
    await fs.writeFile(cssPath, cssVars)
    console.log(chalk.green(`✓ Created CSS file with Tailwind CSS: ${finalOptions.css}`))
    }
  }

  // Create config file
  const config = {
    componentsDir: finalOptions.dir,
    cssFile: finalOptions.css,
    utilsDir: finalOptions.utilsDir,
    componentsAlias: finalOptions.componentsAlias,
    utilsAlias: finalOptions.utilsAlias,
    enableDarkMode: finalOptions.enableDarkMode,
    useCustomGray: finalOptions.useCustomGray,
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
      // Configure aliases
      const componentsAliasKey = `${finalOptions.componentsAlias}/*`
      const utilsAliasKey = `${finalOptions.utilsAlias}/*`
      
      let updated = false
      
      if (!tsconfig.compilerOptions.paths[componentsAliasKey]) {
        tsconfig.compilerOptions.paths[componentsAliasKey] = [finalOptions.dir.replace(/\/$/, '') + '/*']
        updated = true
      }
      
      if (!tsconfig.compilerOptions.paths[utilsAliasKey]) {
        tsconfig.compilerOptions.paths[utilsAliasKey] = [finalOptions.utilsDir.replace(/\/$/, '') + '/*']
        updated = true
      }
      
      if (updated) {
        if (!tsconfig.compilerOptions.baseUrl) {
          tsconfig.compilerOptions.baseUrl = '.'
        }
        await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 })
        console.log(chalk.green(`✓ Configured import aliases in tsconfig.json`))
      } else {
        console.log(chalk.gray(`- Import aliases already configured in tsconfig.json`))
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
        
        // Extract alias paths from answers
        // Handle both src/ and resources/ structures (Laravel uses resources/)
        const componentsAliasBase = finalOptions.componentsAlias.replace('@', '').replace('/*', '')
        const utilsAliasBase = finalOptions.utilsAlias.replace('@', '').replace('/*', '')
        
        // Determine base path - check if Laravel (resources/) or standard (src/)
        const componentsDirParts = finalOptions.dir.split('/')
        const basePath = componentsDirParts[0] === 'resources' ? 'resources' : 'src'
        
        const componentsAliasPath = componentsAliasBase.startsWith('/') 
          ? componentsAliasBase.substring(1)
          : `${basePath}${componentsAliasBase}`
        const utilsAliasPath = utilsAliasBase.startsWith('/')
          ? utilsAliasBase.substring(1)
          : `${basePath}${utilsAliasBase}`
        
        // Add resolve.alias configuration
        // Look for existing resolve block
        if (viteConfigContent.includes('resolve:')) {
          // If resolve exists, add alias inside it
          if (!viteConfigContent.includes('alias:')) {
            viteConfigContent = viteConfigContent.replace(
              /(resolve:\s*\{)/,
              `$1\n      alias: {\n        '${finalOptions.componentsAlias.replace('/*', '')}': resolve(__dirname, '${componentsAliasPath}'),\n        '${finalOptions.utilsAlias.replace('/*', '')}': resolve(__dirname, '${utilsAliasPath}')\n      },`
            )
          } else {
            // Add to existing alias object
            const aliasEntries = [
              `'${finalOptions.componentsAlias.replace('/*', '')}': resolve(__dirname, '${componentsAliasPath}')`,
              `'${finalOptions.utilsAlias.replace('/*', '')}': resolve(__dirname, '${utilsAliasPath}')`
            ]
            
            aliasEntries.forEach(entry => {
              if (!viteConfigContent.includes(entry.split(':')[0])) {
                viteConfigContent = viteConfigContent.replace(
                  /(alias:\s*\{)/,
                  `$1\n        ${entry},`
                )
              }
            })
          }
        } else {
          // Add resolve block - try to add after plugins
          if (viteConfigContent.includes('plugins:')) {
            // Find plugins block and add resolve after it
            viteConfigContent = viteConfigContent.replace(
              /(plugins:\s*\[[\s\S]*?\],?)/,
              `$1,\n    resolve: {\n      alias: {\n        '${finalOptions.componentsAlias.replace('/*', '')}': resolve(__dirname, '${componentsAliasPath}'),\n        '${finalOptions.utilsAlias.replace('/*', '')}': resolve(__dirname, '${utilsAliasPath}')\n      }\n    }`
            )
          } else {
            // Add at the end of config object
            viteConfigContent = viteConfigContent.replace(
              /(export default\s+defineConfig\([\s\S]*?\{)/,
              `$1\n    resolve: {\n      alias: {\n        '${finalOptions.componentsAlias.replace('/*', '')}': resolve(__dirname, '${componentsAliasPath}'),\n        '${finalOptions.utilsAlias.replace('/*', '')}': resolve(__dirname, '${utilsAliasPath}')\n      }\n    },`
            )
          }
        }
        
        await fs.writeFile(viteConfigPathToCheck, viteConfigContent)
        console.log(chalk.green(`✓ Configured import aliases in vite.config.ts`))
      } else {
        console.log(chalk.gray(`- Import aliases already configured in vite.config.ts`))
      }
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not automatically update vite.config.ts`))
      console.log(chalk.yellow(`   Please manually add the following:`))
      console.log(chalk.white(`   import { resolve } from 'path'`))
      console.log(chalk.white(`   resolve: { alias: { '${finalOptions.componentsAlias.replace('/*', '')}': resolve(__dirname, '...'), '${finalOptions.utilsAlias.replace('/*', '')}': resolve(__dirname, '...') } }`))
    }
  } else {
    console.log(chalk.yellow(`⚠️  vite.config.ts not found. Please manually configure import aliases.`))
  }

  console.log(chalk.green('✨ Vasig UI initialized successfully!\n'))
  console.log(chalk.cyan('Next steps:'))
  
  let stepNumber = 1
  
  // Only show CSS import step if Tailwind CSS was installed
  if (finalOptions.installTailwind && finalOptions.css) {
    console.log(chalk.gray(`  ${stepNumber}. Import the CSS file in your main.ts or main.js:`))
    console.log(chalk.white(`     import '${finalOptions.css}'`))
    stepNumber++
  }
  
  console.log(chalk.gray(`  ${stepNumber}. Add components using:`))
  console.log(chalk.white('     npx vasig-ui-vue add button'))
  console.log(chalk.white('     npx vasig-ui-vue add badge'))
  console.log(chalk.white('     npx vasig-ui-vue add input'))
  console.log(chalk.white('     npx vasig-ui-vue add card'))
  console.log(chalk.gray('     ... and more! Use "npx vasig-ui-vue list" to see all available components'))
  
  console.log(chalk.cyan('\n📋 Configuration summary:'))
  console.log(chalk.gray(`     Components directory: ${finalOptions.dir}`))
  console.log(chalk.gray(`     Utils directory: ${finalOptions.utilsDir}`))
  console.log(chalk.gray(`     Components alias: ${finalOptions.componentsAlias}`))
  console.log(chalk.gray(`     Utils alias: ${finalOptions.utilsAlias}`))
  if (finalOptions.installTailwind) {
    console.log(chalk.gray(`     CSS file: ${finalOptions.css}`))
    console.log(chalk.gray(`     Dark mode: ${finalOptions.enableDarkMode ? 'Enabled' : 'Disabled'}`))
    console.log(chalk.gray(`     Custom gray: ${finalOptions.useCustomGray ? 'Enabled' : 'Disabled'}`))
  } else {
    console.log(chalk.gray(`     Tailwind CSS: Not configured (skipped)`))
  }
  console.log('')
}
