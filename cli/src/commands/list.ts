import chalk from 'chalk'
import { getAvailableComponents } from '../utils/components.js'

export async function listCommand() {
  const components = await getAvailableComponents()

  console.log(chalk.blue('📦 Available Vasig UI Components:\n'))

  components.forEach((component) => {
    console.log(chalk.white(`  • ${component}`))
  })

  console.log()
  console.log(chalk.cyan('To add a component:'))
  console.log(chalk.gray('  npx vasig-ui-vue add <component-name>\n'))
}
