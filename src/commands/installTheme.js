// src/commands/installTheme.js
import { installPackage } from '../utils/installPackage'
import chalk from 'chalk'

export const installThemeCommand = (program) => {
    program.command('install theme <source>')
        .description('Install a new theme from a Git or NPM source')
        .action((source) => installPackage('Theme', source))
}
