#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'ignore'});
  }catch(e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
}

const project = process.argv[2];
if(!project === undefined) {
  console.log('Please choose a project name');
  process.exit(-1);
}
const checkout = `git clone --quiet --depth 1 https://github.com/tulburg/jui-boilerplate ${project}`;
const deps  = `cd ${project} && npm i --silent`;

console.log('Fetching template...');
const runCheckout = runCommand(checkout);
if(!runCheckout) process.exit(-1);

console.log(`Installing dependencies...`);
const runDeps = runCommand(deps);
if(!runDeps) process.exit(-1);

console.log('Installation complete! Use the command to start');
console.log(`cd ${project} && npm start`);
console.log();

