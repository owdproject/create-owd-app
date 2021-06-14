#!/usr/bin/env node
const { execSync } = require('child_process');
const execSyncOptions = {stdio : 'pipe' };
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk')
const cliSpinners = require('cli-spinners');
const { version } = require('../package.json')

if (process.argv.length < 3) {
  console.log('You should provide a name for your app.');
  console.log('For example:');
  console.log('npx create-owd-app my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const outDir = path.join(currentPath, projectName);
const gitRepo = 'https://github.com/owdproject/owd-client';

function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout? stdout : stderr);
    });
  });
}

async function main() {
  try {
    console.log()
    console.log(chalk`{cyan create-owd-app v${version}}`)

    if (fs.existsSync(outDir) && fs.readdirSync(outDir).length) {
      console.log(`The folder ${projectName} already exist in the current directory, please give it another name.`);
    }

    console.log(chalk`✨  Generating OWD project in {cyan ${projectName}}`)
    console.log()

    let spinner

    spinner = ora(`Downloading files`).start();
    try {
      await execShellCommand(`git clone --depth 1 ${gitRepo} ${projectName}/.tmp`);
      spinner.succeed()
    } catch (e) {
      spinner.fail(e.stderr)
    }

    spinner = ora(`Preparing workspace`).start();
    try {
      process.chdir(outDir);
      await execShellCommand(`cp -a .tmp/app/. .`);
      await execShellCommand(`rm -rf .tmp`);
      spinner.succeed()
    } catch (e) {
      spinner.fail(e.stderr)
    }

    spinner = ora(`Installing dependencies`).start();
    try {
      await execShellCommand(`npm install`);
      spinner.succeed()
    } catch (e) {
      spinner.fail(e.stderr)
    }

    console.log()
    console.log(`You just created an Open Web Desktop instance!\nNow you can start it by typing "npm run serve"`);
    console.log()
  } catch (error) {
    console.log(error);
  }
}
main();