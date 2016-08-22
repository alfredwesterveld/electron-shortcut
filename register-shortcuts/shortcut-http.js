'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'), { multiArgs: true });

/**
 * Register http request on keybinding
 * @param contents
 * @param keybinding
 * @param url
 */
module.exports = function shortcutHTTP(keybinding, url) {
    return request.getAsync(url).spread((response, body) => {
        if (response.statusCode !== 200) {
            throw new Error('Unsuccessful attempt. Code: ' + response.statusCode);
        } else {
            console.log(JSON.stringify([keybinding, body]));
            return body;
        }
    }).catch(error => console.log(`request ${keybinding} had error ${error}`));
}
