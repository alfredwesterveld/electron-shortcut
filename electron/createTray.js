'use strict';

const { Menu, Tray} = require('electron');

module.exports = function createTray() {
    const tray = new Tray('./static/Shortcuts-Folder-icon.png');

    const contextMenu = Menu.buildFromTemplate([
        {label: 'Open in editor', type: 'radio', click() {
            console.log('awesome');
        }},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ]);

    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);

    return tray;
}
