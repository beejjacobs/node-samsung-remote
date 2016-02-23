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

  /**
   * First section of the encoded command
   * @returns {string}
   */
  messageFirst() {
    let ipEncoded = this.base64Encode(this.host.ip);
    let macEncoded = this.base64Encode(this.host.mac);
    let hostNameEncoded = this.base64Encode(this.host.name);
    let NUL = this.chr(0x00);

    let message = this.chr(0x64) +
        NUL + this.chr(ipEncoded.length) +
        NUL + ipEncoded + this.chr(macEncoded.length) +
        NUL + macEncoded + this.chr(hostNameEncoded.length) +
        NUL + hostNameEncoded;

    return NUL + this.chr(this.appString.length) +
        NUL + this.appString + this.chr(message.length) +
        NUL + message;
  }

  /**
   * Second section of the encoded command
   * @param {string} command
   * @returns {string}
   */
  messageSecond(command) {
    let commandEncoded = this.base64Encode(command);
    let NUL = this.chr(0x00);

    let message = NUL + NUL +
        NUL + this.chr(commandEncoded.length) +
        NUL + commandEncoded;

    return NUL + this.chr(this.tvAppString.length) +
        NUL + this.tvAppString + this.chr(message.length) +
        NUL + message;
  }


  /**
   * Get a string from a character code
   * @param {Number} charCode
   * @returns {string}
   */
  static chr(charCode) {
    return String.fromCharCode(charCode);
  }

  /**
   * Return a string encoded in base 64
   * @param {String} string
   * @returns {String}
   */
  static base64Encode(string) {
    return new Buffer(string).toString('base64');
  }

}

//Export the class
module.exports = SamsungRemote;