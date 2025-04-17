// src/commands/start.js
import { logTitle, logServerInfo } from '../utils/logging'
import chalk from 'chalk'

export const startCommand = (program) => {
    program.command('start')
        .description('Start the project in development mode')
        .action(() => {
            logTitle()
            console.log(chalk.blue('🚀 Starting development server'))
            logServerInfo()
        })
}
