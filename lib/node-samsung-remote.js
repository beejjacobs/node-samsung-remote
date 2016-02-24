'use strict';

var net = require('net');

/**
 * Samsung Remote class
 */
class SamsungRemote {
  /**
   *
   * @param {object} config
   * @param {string} config.ip IP of the TV
   * @param {Number} [config.port] port to connect to the TV
   * @param {Number} [config.timeout] socket timeout when sending commands
   * @param {object} [config.host]
   * @param {string} [config.host.ip] host (server) IP
   * @param {string} [config.host.mac] host (server) MAC address
   * @param {string} [config.host.name] host (server) name
   * @param {string} [config.appString] app string sent to the TV
   * @param {string} [config.tvAppString] tv string sent to the TV
   * @param {Number} [config.commandInterval] minimum interval between commands
   */
  constructor(config) {
    if(!('ip' in config)) {
      console.error('[SamsungRemote] IP address required.');
    }

    //Set up defaults or overwrite with given values
    /**
     * @type {string}
     * @default
     */
    this.ip = config.ip;
    /**
     * @type {Number}
     * @default
     */
    this.port = config.port || 55000;
    /**
     * @type {Number}
     * @default
     */
    this.timeout = config.timeout || 5000;
    /**
     * @type {{ip: string, mac: string, name: string}}
     * @default
     */
    this.host = config.host || {ip: "127.0.0.1", mac: "00:00:00:00", name: "NodeJS Samsung Remote"};
    /**
     * @type {string}
     * @default
     */
    this.appString = config.appString || "iphone..iapp.samsung";
    /**
     * @type {string}
     * @default
     */
    this.tvAppString = config.tvAppString || "iphone.UN60D6000.iapp.samsung";
    /**
     * @type {Number}
     * @default
     */
    this.commandInterval = config.commandInterval || 500;

    this.commandBuffer = [];
  }

  /**
   * Add to the command buffer
   * @param command
   */
  send(command) {

  }

  /**
   * Send the command to the device
   * @param {string} command
   */
  sendToDevice(command) {
    if (!command) {
      console.error(('[SamsungRemote] send() missing command'));
    }

    let socket = net.connect(this.port, this.ip);
    let self = this;

    socket.setTimeout(this.timeout);

    socket.on('connect', function() {
      socket.write(self.messageFirst());
      socket.write(self.messageSecond(command));
      socket.end();
      socket.destroy();
    });

    socket.on('close', function () {
      console.log('[SamsungRemote] disconnected from ' + self.ip + ':' + self.port);
    });

    socket.on('error', function(error) {
      let errorMsg;

      if (error.code === 'EHOSTUNREACH' || error.code === 'ECONNREFUSED') {
        errorMsg = 'Device is off or unreachable';
      } else {
        errorMsg = error.code;
      }
      console.error('[SamsungRemote]' + errorMsg);
    });

    socket.on('timeout', function() {
      console.error('[SamsungRemote] socket timeout');
    });
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