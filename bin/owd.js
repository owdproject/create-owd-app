#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import gradient from 'gradient-string'
import inquirer from 'inquirer'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import {cloneRepo} from '../src/utils/cloneRepo.js'
import {installPackage} from "../src/utils/installPackage.js";

const program = new Command()
const owdGradient = gradient('#0080ff', '#0A4C92')

const logTitle = () => {
    console.log(owdGradient(`\n
   ___                    __    __     _          ___          _    _              
  /___\\_ __   ___ _ __   / / /\\ \\ \\___| |__      /   \\___  ___| | _| |_ ___  _ __  
 //  // '_ \\ / _ \\ '_ \\  \\ \\/  \\/ / _ \\ '_ \\    / /\\ / _ \\/ __| |/ / __/ _ \\| '_ \\ 
/ \\_//| |_) |  __/ | | |  \\  /\\  /  __/ |_) |  / /_//  __/\\__ \\   <| || (_) | |_) |
\\___/ | .__/ \\___|_| |_|   \\/  \\/ \\___|_.__/  /___,' \\___||___/_|\\_\\\\__\\___/| .__/ 
      |_|                                                                   |_|    
\n`))
    console.log(chalk.white('Launching Open Web Desktop on your computer'))
    console.log(chalk.white('\n───────────────────────────────────────────────────────────\n'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx owd create') + chalk.gray('          Create a new project from the template'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx owd start') + chalk.gray('           Start the dev server for local development'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx owd generate') + chalk.gray('        Generate project for static deployment'))
    console.log(chalk.white('\n───────────────────────────────────────────────────────────\n'))
}

const logServerInfo = () => {
    console.log(`\n  ${chalk.red.bold('➜  Local:')}    ${chalk.white('http://localhost:3000/')}`)
    console.log(`  ${chalk.red.bold('➜  Network:')}  ${chalk.white('http://localhost:3000/')} \n`)
}

program.command('create')
    .description('Create a new project')
    .action(async () => {
        logTitle()
        console.log(chalk.green('✨ Creating new project\n'))

        const { projectDir } = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectDir',
                message: 'Enter the directory name for your new project:',
                default: 'owd-client'
            }
        ])

        const targetDir = path.join(process.cwd(), projectDir)

        if (fs.existsSync(targetDir)) {
            console.log(chalk.red(`Directory ${projectDir} already exists!`))
            return
        }

        fs.mkdirSync(targetDir, { recursive: true })

        try {
            await cloneRepo(targetDir)

            process.chdir(targetDir)

            console.log(chalk.green('Installing dependencies...'))
            execSync('npm install', { stdio: 'inherit' })

            console.log(chalk.blue('Starting development server...'))
            execSync('npm run dev', { stdio: 'inherit' })
        } catch (error) {
            console.error(error)
            console.log(chalk.red('✖ Error during project setup'))
        }
    })

program.command('start')
    .description('Start the project in development mode')
    .action(() => {
        logTitle()

        try {
            execSync('npx nuxi dev --host --qr=false', { stdio: 'inherit' })
            console.log(chalk.blue('🚀 Starting development server'))
            logServerInfo()
        } catch (error) {
            console.log(chalk.red('✖ Error starting Nuxt server'))
            console.log(chalk.yellow(error.message))
        } finally {
            console.log(chalk.white('👨‍💻 If you need help, check the logs or visit our docs'))
        }
    })

program.command('generate')
    .description('Generate deployment files')
    .action(() => {
        logTitle()

        try {
            execSync('npx nuxi generate', { stdio: 'inherit' })
            console.log(chalk.green('✅ Static site generated successfully!'))
        } catch (error) {
            console.log(chalk.red('✖ Error generating static site'))
        }
    })

export const installAppCommand = (program) => {
    program.command('install:app <source>')
        .description('Install a new application from a Git or NPM source')
        .action((source) => installPackage('Application', source))
}

export const installThemeCommand = (program) => {
    program.command('install:theme <source>')
        .description('Install a new theme from a Git or NPM source')
        .action((source) => installPackage('Theme', source))
}

program.parse()
