#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import gradient from 'gradient-string'
import inquirer from 'inquirer'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import {cloneRepo} from '../src/utils/cloneRepo.js'

const program = new Command()
const owdGradient = gradient('#0080ff', '#53bdf3', '#0080ff')

const logTitle = () => {
    console.log(owdGradient(`\n
   ___                    __    __     _          ___          _    _              
  /___\\_ __   ___ _ __   / / /\\ \\ \\___| |__      /   \\___  ___| | _| |_ ___  _ __  
 //  // '_ \\ / _ \\ '_ \\  \\ \\/  \\/ / _ \\ '_ \\    / /\\ / _ \\/ __| |/ / __/ _ \\| '_ \\ 
/ \\_//| |_) |  __/ | | |  \\  /\\  /  __/ |_) |  / /_//  __/\\__ \\   <| || (_) | |_) |
\\___/ | .__/ \\___|_| |_|   \\/  \\/ \\___|_.__/  /___,' \\___||___/_|\\_\\\\__\\___/| .__/ 
      |_|                                                                   |_|    
\n`))
    console.log(chalk.white(summonInspiration()))
    console.log(chalk.white('\n──────────────────────────────────────────────────────────────────────────────\n'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx @owdproject/cli create') + chalk.gray('          Create a new project from the template'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx @owdproject/cli start') + chalk.gray('           Start the dev server for local development'))
    console.log(chalk.white('  ➜ ') + chalk.whiteBright('npx @owdproject/cli generate') + chalk.gray('        Generate project for static deployment'))
    console.log(chalk.white('\n──────────────────────────────────────────────────────────────────────────────\n'))
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

function summonInspiration() {
    const phrases = [
        "Launching your digital workspace with Open Web Desktop",
        "Unleashing the potential of your browser with Open Web Desktop",
        "Crafting a better web experience with Open Web Desktop",
        "Transforming how you showcase your portfolio on a browser",
        "Bringing your digital garden to life, right in the browser",
        "Opening up new possibilities with Open Web Desktop",
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

program.parse()
