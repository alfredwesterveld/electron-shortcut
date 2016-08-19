#! /usr/bin/env node

var electron = require('electron')
var proc = require('child_process')

// will something similar to print /Users/maf/.../Electron
console.log(electron)

// spawn Electron
var child = proc.spawn(electron, [`${__dirname}/main.js`, '--config=config.json']);

child.stdout.on('data', function(data) {
    console.log(`${data}`);
    //Here is where the output goes
});

child.stderr.on('data', function(data) {
    console.log(`${data}`);
    //Here is where the error output goes
});

child.on('close', function(code) {
    console.log('closing code: ' + code);
    //Here you can get the exit code of the script
});
