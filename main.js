'use strict';

const {app, BrowserWindow, globalShortcut} = require('electron')
const _ = require('lodash')
const argv = require('minimist')(process.argv.slice(2));
const request = require('request')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, config;

try {
    config = require(`./${argv.config}`)
} catch (e) {
    console.log(`Could not locate config file ${e}`);
    process.exit(1);
}

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: 800,
        height: 600
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    //win.webContents.openDevTools();

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
            request.get(value, (error, response, body) => {
                if (error) {
                    console.log(`request ${key} had error`);
                } else {
                    console.log(JSON.stringify([key, body]));
                    contents.send('request', body);
                }
            });
        });

        if (!ret) {
            console.log(`registration failed for ${key}`)
        }
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    registerShortcuts();
});

app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});
