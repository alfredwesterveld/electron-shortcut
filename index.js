#! /usr/bin/env node

'use strict';

const electron  = require('electron');
const proc      = require('child_process');
const args      = process.argv.slice(2);
const child     = proc.spawn(electron, [`${__dirname}/main.js`, args]);

child.stdout.on('data', data => process.stdout.write(`${data}`));
child.stderr.on('data', data => process.stderr.write(`${data}`));
child.on('close',       code => process.stdout.write(`closing code: ${code}`));
