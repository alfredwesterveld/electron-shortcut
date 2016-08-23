'use strict';

const Promise               = require('bluebird');
const _                     = require('lodash');
const config                = require('config/config');
const shortcutHttp          = require('register-shortcuts/shortcut-http');
const shortcutExec          = require('register-shortcuts/shortcut-exec');
const { globalShortcut }    = require('electron');

/**
 *
 * @param contents
 */
module.exports = function registerShortcuts (contents) {
    _.mapKeys(config, (value, key) => {
        console.log(JSON.stringify([key, value]));

        globalShortcut.register(key, () => {
            Promise.try(() => {
                if (value.startsWith('http')) {
                    return shortcutHttp(key, value);
                } else {
                    return shortcutExec(key, value);
                }
            }).then(value => {
                contents.send('keybinding', value);
            });
        }) || console.log(`registration failed for ${key}`);
    });
}
