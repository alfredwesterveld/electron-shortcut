require('shelljs/global');


set('-e'); // exit upon first error

const os = require('os');
const BASE_CONFIG_DIR = `${os.homedir()}/.config/electron-shortcut`;

mkdir('-p', BASE_CONFIG_DIR);
touch(`${BASE_CONFIG_DIR}/config.json`);
cp(`${__dirname}/../config/config.json`, `${BASE_CONFIG_DIR}/config.json`);

console.log(`copied  base config file to: ${BASE_CONFIG_DIR}`);
