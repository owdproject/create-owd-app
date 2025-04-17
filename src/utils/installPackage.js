// src/utils/installPackage.js
import { execSync } from 'child_process'
import chalk from 'chalk'
// import { logTitle } from './logging'

export const installPackage = (type, source) => {
    //logTitle()
    console.log(chalk.yellow(`📦 Installing ${type}: ${source}`))
    try {
        execSync(`npm install ${source}`, { stdio: 'inherit' })
        console.log(chalk.green(`✔ ${type} installed successfully`))
    } catch (error) {
        console.log(chalk.red(`✖ Failed to install ${type}`))
    }
}
