#!/usr/bin/env ts-node

var fs = require('../../node_modules/fs-extra');

// tslint:disable-next-line:max-line-length
const configFile = `./node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js`
const newConfig = `node:
  {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }`

  console.log("%%%%%%%%%%%%%%%%%%%%% Modifying aws-iot-device-sdk for browser compatability %%%%%%%%%%%%%%%%%%%%%%%%%%%%")
fs
  .readFile(configFile)
  .then((b) => b.toString())
  .then((contents) => contents.replace(/node: false/g, newConfig))
  .then((config) => fs.writeFile(configFile, config).catch(console.log))