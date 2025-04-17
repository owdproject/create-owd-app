// src/commands/generate.js
import { logTitle } from '../utils/logging'
import chalk from 'chalk'

export const generateCommand = (program) => {
    program.command('generate')
        .description('Generate deployment files')
        .action(() => {
            logTitle()
            console.log(chalk.yellow('⚡ Generating files'))
        })
}
