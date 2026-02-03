#!/usr/bin/env node

import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { addCommand } from './commands/add.js'
import { listCommand } from './commands/list.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))

const program = new Command()

program
  .name('vasig-ui-vue')
  .description('CLI tool for adding Vasig UI components to your Vue project')
  .version(packageJson.version)

program
  .command('init')
  .description('Initialize Vasig UI in your project')
  .option('-d, --dir <directory>', 'Components directory', 'src/components/vasig')
  .option('-c, --css <file>', 'CSS file path', 'src/style.css')
  .action(initCommand)

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name (e.g., button, modal, card)')
  .option('-o, --overwrite', 'Overwrite existing component', false)
  .action(addCommand)

program
  .command('list')
  .description('List all available components')
  .action(listCommand)

program.parse()
