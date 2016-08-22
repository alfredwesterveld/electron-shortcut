'use strict';

const {app, BrowserWindow, globalShortcut} = require('electron');
const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));
const request = require('request');
const execFile = require('child_process').execFile;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const config = (function loadConfig() {
    try {
        const _config = argv.config ? argv.config : './config.json';
        return require(_config);
    } catch (e) {
        console.log(`Could not locate config file ${e}`);
        process.exit(1);
    }
}());


function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        show: argv.show || false,
        width: 800,
        height: 600
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

function registerShortcuts () {
    let contents = win.webContents;

    _.mapKeys(config, (value, key) => {
        console.log(JSON.stringify([key, value]));

        const ret = globalShortcut.register(key, () => {
            if (value.startsWith('http')) {
                request.get(value, (error, response, body) => {
                    if (error) {
                        console.log(`request ${key} had error ${error}`);
                    } else {
                        console.log(JSON.stringify([key, body]));
                        contents.send('request', body);
                    }
                });
            } else {
                execFile(value, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`request ${key} had error ${error}`);
                    }
                    console.log(JSON.stringify([key, stdout]));
                    console.log(JSON.stringify([key, stderr]));
                    contents.send('request', stdout);
                });
            }
        });

        if (!ret) {
            console.log(`registration failed for ${key}`)
        }
    });
}

function onReady() {
    createWindow();
    registerShortcuts();
}

function onWillQuit() {
    globalShortcut.unregisterAll();
}

app.on('ready', onReady);
app.on('will-quit', onWillQuit);
