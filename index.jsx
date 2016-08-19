require('electron').ipcRenderer.on('request', (event, message) => {
    let myNotification = new Notification('Alert', {
        body: message
    });
});
