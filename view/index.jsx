const {ipcRenderer} = require('electron');

ipcRenderer.on('keybinding', (event, message) => {
    new Notification('Alert', { body: message });
});
