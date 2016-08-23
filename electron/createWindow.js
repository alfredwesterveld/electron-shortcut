//require('module').globalPaths.push('./');
const { BrowserWindow, Tray}    = require('electron');
const registerShortcut          = require('register-shortcuts');
const argv                      = require('minimist')(process.argv.slice(2));

module.exports = function createWindow() {
    win = new BrowserWindow({ show: argv.show || false, width: 800, height: 600 });
    win.loadURL(`file://${__dirname}/../view/index.html`);

    const contents = win.webContents;
    registerShortcut(contents);
    contents.openDevTools();

    win.on('closed', () => win = null);

    return win;
}
