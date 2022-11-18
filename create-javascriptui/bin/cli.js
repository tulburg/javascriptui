#!/usr/bin/env node

const {spawn, execSync, exec} = require('child_process');
const chalk = require('chalk');
const path = require('path');
const {Toggle, Input } = require('enquirer');
const os = require('os');
const fs = require('fs-extra');
const semver = require('semver');
const tmp = require('tmp');

const log = function (...args){
  if(arguments.length === 1) {
    if(typeof arguments[0] === 'string' && arguments[0].match(/\n/)) {
      arguments[0].split(/\n/).forEach(line => {
        console.log(line);
      })
    }else console.log(...args);
  }else console.log(...args);
}

async function callPrompt(message, options = false) {
  return options
    ? await new Toggle({
      message, enabled: 'Yes', disabled: 'No', initial: 'Yes'
      }).run()
    : await new Input({ message }).run()
}

function isUsingYarn() {
  return (process.env.npm_config_user_agent || '').indexOf('yarn') === 0;
}

function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db',
  ];
  // These files should be allowed to remain on a failed install, but then
  // silently removed during the next create.
  const errorLogFilePatterns = [
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
  ];
  const isErrorLog = file => {
    return errorLogFilePatterns.some(pattern => file.startsWith(pattern));
  };

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter(file => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter(file => !isErrorLog(file));

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    console.log();
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(`${file}/`)}`);
        } else {
          console.log(`  ${file}`);
        }
      } catch (e) {
        console.log(`  ${file}`);
      }
    }
    console.log();
    console.log(
      'Either try using a new directory name, or remove the files listed above.'
    );

    return false;
  }

  // Remove any log files from a previous installation.
  fs.readdirSync(root).forEach(file => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file));
    }
  });
  return true;
}

function checkThatNpmCanReadCwd() {
  const cwd = process.cwd();
  let childOutput = null;
  try {
    // Note: intentionally using spawn over exec since
    // the problem doesn't reproduce otherwise.
    // `npm config list` is the only reliable way I could find
    // to reproduce the wrong path. Just printing process.cwd()
    // in a Node process was not enough.
    childOutput = spawn.sync('npm', ['config', 'list']).output.join('');
  } catch (err) {
    // Something went wrong spawning node.
    // Not great, but it means we can't do this check.
    // We might fail later on, but let's continue.
    return true;
  }
  if (typeof childOutput !== 'string') {
    return true;
  }
  const lines = childOutput.split('\n');
  // `npm config list` output includes the following line:
  // "; cwd = C:\path\to\current\dir" (unquoted)
  // I couldn't find an easier way to get it.
  const prefix = '; cwd = ';
  const line = lines.find(line => line.startsWith(prefix));
  if (typeof line !== 'string') {
    // Fail gracefully. They could remove it.
    return true;
  }
  const npmCWD = line.substring(prefix.length);
  if (npmCWD === cwd) {
    return true;
  }
  console.error(
    chalk.red(
      `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD
        )}\n\n` +
        `This is probably caused by a misconfigured system terminal shell.`
    )
  );
  if (process.platform === 'win32') {
    console.error(
      chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
        )
    );
  }
  return false;
}

function getTemporaryDirectory() {
  return new Promise((resolve, reject) => {
    // Unsafe cleanup lets us recursively delete the directory if it contains
    // contents; by default it only allows removal if it's empty
    tmp.dir({ unsafeCleanup: true }, (err, tmpdir, callback) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            try {
              callback();
            } catch (ignored) {
              // Callback might throw and fail, since it's a temp directory the
              // OS will clean it up eventually...
            }
          },
        });
      }
    });
  });
}

function checkForLatestVersion() {
  return new Promise((resolve, reject) => {
    https
      .get(
        'https://registry.npmjs.org/-/package/create-javascriptui/dist-tags',
        res => {
          if (res.statusCode === 200) {
            let body = '';
            res.on('data', data => (body += data));
            res.on('end', () => {
              resolve(JSON.parse(body).latest);
            });
          } else {
            reject();
          }
        }
      )
      .on('error', () => {
        reject();
      });
  });
}

function execFn(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if(err) reject(err);
      else resolve(stderr || stdout);
    })
  })
}

function copyFn(source, dest) {
  return new Promise((resolve, reject) => {
    fs.copy(source, dest, err => {
      if(!err) resolve()
      else reject(err);
    });
  })
}

async function checkAndUpdate(currentVersion) {
  return checkForLatestVersion().catch(() => {
    try {
      return execSync('npm view create-javascriptui version').toString().trim();
    }catch(e) { return null; }
  }).then(latest => {
    if(latest && semver.lt(currentVersion, latest)) {
      log('Updating please wait...');
      // execSync('npm i -g create-javascriptui');
      execSync('npm link create-javascriptui');
      log(`Updated to verion ${chalk.green(latest)}

Please trry again: ${chalk.green('npm init javascriptui')}`)
      process.exit(0);
    }else return Promise.resolve();
  })
}

async function start() {
  const root = path.resolve('');

  const currentVersion = execSync('npm view create-javascriptui version').toString().trim();
  await checkAndUpdate(currentVersion);

  const project = process.argv[2];
  if(project === undefined) {
    const temp_name = await callPrompt('Choose a project name:');
    this.projectName = temp_name.trim().replace(/\s/, '-').toLowerCase();
  }else this.projectName = project;

  fs.ensureDir(path.join(root, this.projectName));

  if(!isSafeToCreateProjectIn(path.join(root, this.projectName), this.projectName)) {
    process.exit(0);
  }

  this.packageJSON = {
    name: this.projectName,
    version: '0.0.1',
    private: true,
  }

  const template = process.argv[3];
  if(template === undefined) {
    const typescript = await callPrompt('Do you want to use Typescript?', true);
    this.template = typescript ? 'jui-template-ts' : 'jui-template';
  }else this.template = template;

  checkThatNpmCanReadCwd();

  const oldDir = path.join(process.cwd(), this.projectName);

  const dir = await getTemporaryDirectory();
  if(dir) {
    const tempDir = dir.tmpdir;
    process.chdir(tempDir);
    log(`Fetching template...`);
    const res = await execFn('npm i ' + this.template);
    if(res) {
      const installDir = path.join(tempDir, 'node_modules/' + this.template);
      fs.readdirSync(installDir).forEach(async file => {
        if(file !== 'package.json') {
          await copyFn(path.join(installDir, file), path.join(oldDir, file))
        }
      });

      const installPackage = require(path.join(installDir, 'package.json'));
      const { dependencies, devDependencies } = installPackage;

      fs.writeFileSync(
        path.join(root, this.projectName, 'package.json'),
        JSON.stringify(Object.assign(installPackage, this.packageJSON), null, 2) + os.EOL
      );

      const allDeps = Object.keys(dependencies).concat(Object.keys(devDependencies));

      log(`Installing...
`);
      process.chdir(oldDir);
      let install;
      if(isUsingYarn()) {
        install = spawn('yarn', ['add'].concat(allDeps), { stdio: 'inherit'});
      }else install = spawn('npm', ['i', '--save'].concat(allDeps), { stdio: 'inherit'});

      install.on('exit', () => {
        log(`
Installation complete!

Run ${chalk.greenBright('cd ' + this.projectName + ' && ' + (isUsingYarn() ? 'yarn' : 'npm') +' start')} to begin`)
      })
    }
  }

}


start();
