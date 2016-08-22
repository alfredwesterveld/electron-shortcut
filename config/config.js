'use strict';

const os    = require('os');
const path  = require('path');
const argv  = require('minimist')(process.argv.slice(2));

module.exports = function () {
    try {
        const cfg = argv.config ? argv.config : `${os.homedir()}/.config/electron-shortcut/config.json`;
        return path.isAbsolute(cfg) ? require(cfg) : require(process.cwd() + '/' + cfg);
    } catch (error) {
        console.log(`Could not locate config file ${error}`);
        process.exit(1);
    }
}();
