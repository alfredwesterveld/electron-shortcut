# Global shortcut

Bind global shortcut to go to url or run command. For example with config.json below when pressing `CommandOrControl+Shift+Z` it will return your IP as HTML5 notification and in terminal.

## Requirements

- Linux, MacOsX or Windows
- [node.js](https://nodejs.org/en/download/)
- Basic knowledge terminal/editor

## Configure config.json

Currently It supports:

- Making http requests to specified url
 -Launching programs to specified path. 
 
To get started you should create a config file at `~/.config/electron-shortcut/config.json` where `~` is your home directory with your favorite editor that looks like below:
 
```javascript
{
  "CommandOrControl+Shift+Z": "https://api.ipify.org",
  "CommandOrControl+Shift+X": "whoami"
}
```


## Installation

```bash
$ npm install -g globalshortcut
```

## Usage

```bash
$ globalshortcut
```

Will use default config file `~/.config/electron-shortcut/config.json`
 
```
$ globalshortcut --config=`<config>`
```

will use config file as specified with `<config>`
