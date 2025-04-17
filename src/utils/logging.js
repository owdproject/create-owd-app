// src/utils/logging.js
import figlet from 'figlet'
import gradient from 'gradient-string'
import chalk from 'chalk'

export const logTitle = () => {
    console.log(gradient.pastel.multiline(figlet.textSync('OWD', { horizontalLayout: 'full' })))
    console.log(chalk.red.bold('\n  ➜  Main Commands'))
    console.log(chalk.red.bold('  ───────────────────────────────────'))
}

export const logServerInfo = () => {
    console.log(`\n  ${chalk.red.bold('➜  Local:')}    ${chalk.white('http://localhost:3000/')}`)
    console.log(`  ${chalk.red.bold('➜  Network:')}  ${chalk.white('http://localhost:3000/')} \n`)
}
