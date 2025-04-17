import chalk from "chalk";
import fs from 'fs-extra';
import path from 'path';
import simpleGit from 'simple-git'

export const cloneRepo = async (targetPath) => {
    const git = simpleGit()
    const tempDir = path.join(process.cwd(), 'owd-temp')

    try {
        await git.clone('https://github.com/owdproject/client', tempDir)

        const templatePath = path.join(tempDir, 'template')
        if (fs.existsSync(templatePath)) {
            fs.copySync(templatePath, targetPath)
        } else {
            console.log(chalk.red('Template directory does not exist in the cloned repo!'))
        }

        fs.removeSync(tempDir)
    } catch (error) {
        console.error(error)
        console.log(chalk.red('✖ Error cloning or copying the template'))
    }
}