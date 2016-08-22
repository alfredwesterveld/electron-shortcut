#! /usr/bin/env node

var electron = require('electron')
var proc = require('child_process')

var child = proc.spawn(electron, [`${__dirname}/main.js`, '--config=config.json']);

child.stdout.on('data', function(data) {
    console.log(`${data}`);
});

child.stderr.on('data', function(data) {
    console.log(`${data}`);
});

child.on('close', function(code) {
    console.log(`closing code: ${code}`);
    //Here you can get the exit code of the script
});
