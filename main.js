'use strict';

const { app, BrowserWindow }    = require('electron');
const argv                      = require('minimist')(process.argv.slice(2));
const registerShortcut          = require('./register-shortcuts');
let win; // Prevent GC

function createWindow () {
    win = new BrowserWindow({ show: argv.show || false, width: 800, height: 600 });
    win.loadURL(`file://${__dirname}/view/index.html`);

    const contents = win.webContents;
    registerShortcut(contents);
    contents.openDevTools();

    win.on('closed', () => win = null);
}


app.on('ready', createWindow);
