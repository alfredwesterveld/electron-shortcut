const {ipcRenderer} = require('electron');

ipcRenderer.on('keybinding', (event, message) => {
    console.log('got keybinding');
    new Notification('Alert', { body: message });
});
