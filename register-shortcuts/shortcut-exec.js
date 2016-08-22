'use strict';

const Promise   = require('bluebird');
const execFile  = Promise.promisify(require('child_process').execFile, { multiArgs: true });

/**
 * Register exec process on keybinding
 * @param keybinding
 * @param path
 */
module.exports = function shortcutExec(keybinding, path) {
    return execFile(path).spread((stdout, stderr) => {
        !stdout || console.log(JSON.stringify([keybinding, stdout]));
        !stderr || console.log(JSON.stringify([keybinding, stderr]));
        return stdout;
    }).catch(error => console.log(`request ${keybinding} had error ${error}`));
}
