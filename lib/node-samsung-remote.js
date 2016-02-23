'use strict';

var net = require('net');

/**
 * Samsung Remote class
 */
class SamsungRemote {
  /**
   *
   * @param {object} config
   * @param {string} config.ip
   * @param {Number} [config.port]
   * @param {Number} [config.timeout]
   * @param {object} [config.host]
   * @param {string} [config.host.ip]
   * @param {string} [config.host.mac]
   * @param {string} [config.host.name]
   * @param {string} [config.appString]
   * @param {string} [config.tvAppString]
   */
  constructor(config) {
    if(!('ip' in config)) {
      console.error('[SamsungRemote] IP address required.');
    }

    //Set up defaults or overwrite with given values
    this.ip = config.ip;
    this.port = config.port || 55000;
    this.timeout = config.timeout || 5000;
    this.host = config.host || {ip: "127.0.0.1", mac: "00:00:00:00", name: "NodeJS Samsung Remote"};
    this.appString = config.appString || "iphone..iapp.samsung";
    this.tvAppString = config.tvAppString || "iphone.UN60D6000.iapp.samsung";
  }

  static chr(charCode) {
    return String.fromCharCode(charCode);
  }

  static base64Encode(string) {
    return new Buffer(string).toString('base64');
  }

}

//Export the class
module.exports = SamsungRemote;