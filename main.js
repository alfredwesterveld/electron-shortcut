'use strict';

require('module').globalPaths.push('./');
const { app, BrowserWindow }    = require('electron');
const createTray                = require('electron/createTray');
const createWindow              = require('electron/createWindow');
let win, tray;


app.on('ready', () => {
    tray    = createTray();
    win     = createWindow();
});
