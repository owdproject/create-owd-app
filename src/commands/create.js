import { logTitle } from '../utils/logging'
import chalk from 'chalk'

export const createCommand = (program) => {
    program.command('create')
        .description('Create a new project')
        .action(() => {
            logTitle()
            console.log(chalk.green('✨ Creating new project'))
        })
}