// src/commands/installApp.js
import { installPackage } from '../utils/installPackage'
import chalk from 'chalk'

export const installAppCommand = (program) => {
    program.command('install app <source>')
        .description('Install a new application from a Git or NPM source')
        .action((source) => installPackage('Application', source))
}
