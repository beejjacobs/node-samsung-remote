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
   * @param {boolean} [config.debug]
   */
  constructor(config) {
    if(!('ip' in config)) {
      this.error('IP address required');
    }

    //Set up defaults or overwrite with given values
    /**
     * @type {boolean}
     * @default false
     */
    this.debug = config.debug || false;
    /**
     * @type {string}
     * @default
     */
    this.ip = config.ip;
    /**
     * @type {Number}
     * @default 55000
     */
    this.port = config.port || 55000;
    /**
     * @type {Number}
     * @default 5000
     */
    this.timeout = config.timeout || 5000;
    /**
     * @type {{ip: string, mac: string, name: string}}
     * @default {ip: "127.0.0.1", mac: "00:00:00:00", name: "NodeJS Samsung Remote"}
     */
    this.host = config.host || {ip: "127.0.0.1", mac: "00:00:00:00", name: "NodeJS Samsung Remote"};
    /**
     * @type {string}
     * @default iphone..iapp.samsung
     */
    this.appString = config.appString || "iphone..iapp.samsung";
    /**
     * @type {string}
     * @default iphone.UN60D6000.iapp.samsung
     */
    this.tvAppString = config.tvAppString || "iphone.UN60D6000.iapp.samsung";
    /**
     * @type {Number}
     * @default 500
     */
    this.commandInterval = config.commandInterval || 500;

    /**
     * @type {Array}
     * @default
     */
    this.commandBuffer = [];
    /**
     * @type {boolean}
     * @default
     */
    this.processing = false;
    /**
     * @type {object}
     * @default null
     */
    this.timer = null;

    this.connected = false;
    this.socket = null;
  }

  /**
   *
   */
  source() {
    this.log('source');
    this.send(SamsungRemote.keys.SOURCE);
  }

  /**
   * Set a channel number
   * @param {Number} channel
   */
  setChannel(channel) {
    this.log('setChannel: ' + channel);
    let channelString = channel.toString();
    for (let i = 0; i < channelString.length; i++) {
      let number = channelString.charAt(i);
      this.number(number);
    }
  }

  /**
   * Number key
   * @param {Number|string} number 0-9
   */
  number(number) {
    this.log('number: ' + number);
    this.send(SamsungRemote.numbers[number]);
  }

  /**
   * Volume up/down
   * @param {boolean} up true to increase volume, false to decrease
   */
  volume(up) {
    this.log('volume: ' + up);
    if(up) {
      this.send(SamsungRemote.keys.VOLUP);
    } else {
      this.send(SamsungRemote.keys.VOLDOWN);
    }
  }

  /**
   *
   */
  mute() {
    this.log('mute');
    this.send(SamsungRemote.keys.MUTE);
  }

  /**
   * Channel up/down
   * @param {boolean} up true for next channel, false for previous
   */
  channel(up) {
    this.log('channel: ' + up);
    if(up) {
      this.send(SamsungRemote.keys.CHUP);
    } else {
      this.send(SamsungRemote.keys.CHDOWN);
    }
  }

  /**
   * Arrow keys
   * @param {string} direction left,right,up,down
   */
  arrow(direction) {
    this.log('arrow: ' + direction);
    let key = '';
    switch(direction) {
      case 'left':
          key = SamsungRemote.keys.LEFT;
        break;
      case 'right':
          key = SamsungRemote.keys.RIGHT;
        break;
      case 'up':
          key = SamsungRemote.keys.UP;
        break;
      case 'down':
          key = SamsungRemote.keys.DOWN;
        break;
    }
    this.send(key);
  }

  /**
   *
   */
  smartHub() {
    this.log('smartHub');
    this.send(SamsungRemote.keys.W_LINK);
  }

  /**
   *
   */
  menu() {
    this.log('menu');
    this.send(SamsungRemote.keys.MENU);
  }

  /**
   *
   */
  guide() {
    this.log('guide');
    this.send(SamsungRemote.keys.GUIDE);
  }

  /**
   *
   */
  tools() {
    this.log('tools');
    this.send(SamsungRemote.keys.TOOLS);
  }

  /**
   *
   */
  info() {
    this.log('info');
    this.send(SamsungRemote.keys.INFO);
  }

  /**
   *
   */
  back() {
    this.log('back');
    this.send(SamsungRemote.keys.RETURN);
  }

  /**
   *
   */
  exit() {
    this.log('exit');
    this.send(SamsungRemote.keys.EXIT);
  }

  /**
   *
   */
  enter() {
    this.log('enter');
    this.send(SamsungRemote.keys.ENTER);
  }

  /**
   * Colour buttons (also labelled A,B,C,D)
   * @param {string} colour red, green, yellow, blue, a, b, c, d
   */
  colour(colour) {
    this.log('colour: ' + colour);
    let key = '';
    switch(colour) {
      case 'red':
      case 'a':
        key = SamsungRemote.keys.RED;
        break;
      case 'green':
      case 'b':
        key = SamsungRemote.keys.GREEN;
        break;
      case 'yellow':
      case 'c':
        key = SamsungRemote.keys.YELLOW;
        break;
      case 'blue':
      case 'd':
        key = SamsungRemote.keys.CYAN;
        break;
    }
    this.send(key);
  }

  /**
   * Transport keys
   * @param {string} command play, pause, stop, record, forward, backward, skip-forward, skip-backward
   */
  transport(command) {
    this.log('transport: ' + command);
    let key = '';
    switch(command) {
      case 'play':
        key = SamsungRemote.keys.PLAY;
        break;
      case 'pause':
        key = SamsungRemote.keys.PAUSE;
        break;
      case 'stop':
        key = SamsungRemote.keys.STOP;
        break;
      case 'record':
        key = SamsungRemote.keys.REC;
        break;
      case 'forward':
        key = SamsungRemote.keys.FF;
        break;
      case 'backward':
        key = SamsungRemote.keys.REWIND;
        break;
      case 'skip-forward':
        key = SamsungRemote.keys.FF_;
        break;
      case 'skip-backward':
        key = SamsungRemote.keys.REWIND_;
        break;
    }
    this.send(key)
  }

  /**
   * Add to the command buffer
   * @param {string} command from SamsungRemote.keys
   */
  send(command) {
    if(command && command != '') {
      this.commandBuffer.push(command);
      this.processBuffer();
    } else {
      this.error('command empty or undefined: ' + command);
    }
  }

  /**
   * Process the command buffer and send to the device
   */
  processBuffer() {
    if(this.commandBuffer.length > 0) {
      if(!this.processing) {
        //process first command in the buffer
        this.sendToDevice(this.commandBuffer.shift());
      } else {
        //still processing, set a timer if one doesn't exist
        if(this.timer == null) {
          //no timer set and we have commands to process in the future
          let self = this;
          this.timer = setTimeout(function() {
            self.timer = null;
            self.processBuffer();
          }, self.commandInterval);
        }
      }
    } else {
      if(this.timer != null) {
        clearTimeout(this.timer);
      }
    }
  }

  /**
   * Send the command to the device
   * @param {string} command
   */
  sendToDevice(command) {
    if (!command) {
      this.error('send() missing command');
    }

    let socket = net.connect(this.port, this.ip);
    let self = this;

    this.processing = true; //stop other commands being sent

    socket.setTimeout(this.timeout);

    socket.on('connect', function() {
      let message = self.buildMessage(command);
      socket.write(message.first);
      socket.write(message.second);
      socket.end();
      socket.destroy();

      //Success, process next
      self.timer = setTimeout(function() {
        self.timer = null;
        self.processing = false;
        self.processBuffer();
      }, self.commandInterval);
    });

    socket.on('close', function () {
      self.log('disconnected from ' + self.ip + ':' + self.port);
    });

    socket.on('error', function(error) {
      let errorMsg;

      if (error.code === 'EHOSTUNREACH' || error.code === 'ECONNREFUSED') {
        errorMsg = 'Device is off or unreachable';
      } else {
        errorMsg = error.code;
      }
      self.error(errorMsg);
    });

    socket.on('timeout', function() {
      self.error('socket timeout');
    });
  }

  /**
   * Encode the command
   * @param {string} command
   * @returns {object} message
   */
  buildMessage(command) {
    let ipEncoded = SamsungRemote.base64Encode(this.host.ip);
    let macEncoded = SamsungRemote.base64Encode(this.host.mac);
    let hostNameEncoded = SamsungRemote.base64Encode(this.host.name);
    let commandEncoded = SamsungRemote.base64Encode(command);
    let NUL = SamsungRemote.chr(0x00);

    let message = {first: '', second: ''};

    let temp = SamsungRemote.chr(0x64) +
        NUL + SamsungRemote.chr(ipEncoded.length) +
        NUL + ipEncoded + SamsungRemote.chr(macEncoded.length) +
        NUL + macEncoded + SamsungRemote.chr(hostNameEncoded.length) +
        NUL + hostNameEncoded;

    message.first = NUL + SamsungRemote.chr(this.appString.length) +
        NUL + this.appString + SamsungRemote.chr(temp.length) +
        NUL + temp;

    temp = NUL + NUL +
        NUL + SamsungRemote.chr(commandEncoded.length) +
        NUL + commandEncoded;

    message.second = NUL + SamsungRemote.chr(this.tvAppString.length) +
        NUL + this.tvAppString + SamsungRemote.chr(temp.length) +
        NUL + temp;

    return message;
  }

  /**
   * Log to console.log if this.debug is true
   * @param {*} message
   */
  log(message) {
    if(this.debug) {
      console.log('[SamsungRemote] ' + message);
    }
  }

  /**
   * Log to console.error if this.debug is true
   * @param {*} message
   */
  error(message) {
    if(this.debug) {
      console.error('[SamsungRemote] ' +message);
    }
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

/**
 * @type {object}
 */
SamsungRemote.numbers = {
  0: 'KEY_0',
  1: 'KEY_1',
  2: 'KEY_2',
  3: 'KEY_3',
  4: 'KEY_4',
  5: 'KEY_5',
  6: 'KEY_6',
  7: 'KEY_7',
  8: 'KEY_8',
  9: 'KEY_9'
};

/**
 * Known/tested keys:
 * <table>
 *   <tr><th>Object Key</th><th>Description</th></tr>
 *   <tr><td>NUM_0 - NUM_9</td><td>Numbers</td></tr>
 *   <tr><td>W_LINK</td><td>Smart Hub</td></tr>
 *   <tr><td>VOLUP, VOLDOWN</td><td>Volume</td></tr>
 *   <tr><td>MUTE</td><td>Mute</td></tr>
 *   <tr><td>CHUP, CHDOWN</td><td>Channel</td></tr>
 *   <tr><td>CH_LIST</td><td>Channel List</td></tr>
 *   <tr><td>LEFT, RIGHT, UP, DOWN</td><td>Arrow keys</td></tr>
 *   <tr><td>ENTER</td><td>Enter</td></tr>
 *   <tr><td>EXIT</td><td>Exit</td></tr>
 *   <tr><td>MENU</td><td>Menu</td></tr>
 *   <tr><td>GUIDE</td><td>Guide</td></tr>
 *   <tr><td>TOOLS</td><td>Tools</td></tr>
 *   <tr><td>INFO</td><td>Info</td></tr>
 *   <tr><td>RETURN</td><td>Return</td></tr>
 *   <tr><td>RED, GREEN, YELLOW, CYAN</td><td>Colour buttons</td></tr>
 *   <tr><td>PLAY, PAUSE, STOP, RECORD< FF, FF_, REWIND, REWIND_</td><td>Transports</td></tr>
 * </table>
 * @type {object}
 */
SamsungRemote.keys = {
  NUM_0: 'KEY_0',
  NUM_1: 'KEY_1',
  NUM_2: 'KEY_2',
  NUM_3: 'KEY_3',
  NUM_4: 'KEY_4',
  NUM_5: 'KEY_5',
  NUM_6: 'KEY_6',
  NUM_7: 'KEY_7',
  NUM_8: 'KEY_8',
  NUM_9: 'KEY_9',
  NUM_11: 'KEY_11',
  NUM_12: 'KEY_12',
  NUM_16_9: 'KEY_16_9',
  NUM_3SPEED: 'KEY_3SPEED',
  NUM_4_3: 'KEY_4_3',
  AD: 'KEY_AD',
  ADDDEL: 'KEY_ADDDEL',
  ALT_MHP: 'KEY_ALT_MHP',
  ANGLE: 'KEY_ANGLE',
  ANTENA: 'KEY_ANTENA',
  ANYNET: 'KEY_ANYNET',
  ANYVIEW: 'KEY_ANYVIEW',
  APP_LIST: 'KEY_APP_LIST',
  ASPECT: 'KEY_ASPECT',
  AUTO_ARC_ANTENNA_AIR: 'KEY_AUTO_ARC_ANTENNA_AIR',
  AUTO_ARC_ANTENNA_CABLE: 'KEY_AUTO_ARC_ANTENNA_CABLE',
  AUTO_ARC_ANTENNA_SATELLITE: 'KEY_AUTO_ARC_ANTENNA_SATELLITE',
  AUTO_ARC_ANYNET_AUTO_START: 'KEY_AUTO_ARC_ANYNET_AUTO_START',
  AUTO_ARC_ANYNET_MODE_OK: 'KEY_AUTO_ARC_ANYNET_MODE_OK',
  AUTO_ARC_AUTOCOLOR_FAIL: 'KEY_AUTO_ARC_AUTOCOLOR_FAIL',
  AUTO_ARC_AUTOCOLOR_SUCCESS: 'KEY_AUTO_ARC_AUTOCOLOR_SUCCESS',
  AUTO_ARC_CAPTION_ENG: 'KEY_AUTO_ARC_CAPTION_ENG',
  AUTO_ARC_CAPTION_KOR: 'KEY_AUTO_ARC_CAPTION_KOR',
  AUTO_ARC_CAPTION_OFF: 'KEY_AUTO_ARC_CAPTION_OFF',
  AUTO_ARC_CAPTION_ON: 'KEY_AUTO_ARC_CAPTION_ON',
  AUTO_ARC_C_FORCE_AGING: 'KEY_AUTO_ARC_C_FORCE_AGING',
  AUTO_ARC_JACK_IDENT: 'KEY_AUTO_ARC_JACK_IDENT',
  AUTO_ARC_LNA_OFF: 'KEY_AUTO_ARC_LNA_OFF',
  AUTO_ARC_LNA_ON: 'KEY_AUTO_ARC_LNA_ON',
  AUTO_ARC_PIP_CH_CHANGE: 'KEY_AUTO_ARC_PIP_CH_CHANGE',
  AUTO_ARC_PIP_DOUBLE: 'KEY_AUTO_ARC_PIP_DOUBLE',
  AUTO_ARC_PIP_LARGE: 'KEY_AUTO_ARC_PIP_LARGE',
  AUTO_ARC_PIP_LEFT_BOTTOM: 'KEY_AUTO_ARC_PIP_LEFT_BOTTOM',
  AUTO_ARC_PIP_LEFT_TOP: 'KEY_AUTO_ARC_PIP_LEFT_TOP',
  AUTO_ARC_PIP_RIGHT_BOTTOM: 'KEY_AUTO_ARC_PIP_RIGHT_BOTTOM',
  AUTO_ARC_PIP_RIGHT_TOP: 'KEY_AUTO_ARC_PIP_RIGHT_TOP',
  AUTO_ARC_PIP_SMALL: 'KEY_AUTO_ARC_PIP_SMALL',
  AUTO_ARC_PIP_SOURCE_CHANGE: 'KEY_AUTO_ARC_PIP_SOURCE_CHANGE',
  AUTO_ARC_PIP_WIDE: 'KEY_AUTO_ARC_PIP_WIDE',
  AUTO_ARC_RESET: 'KEY_AUTO_ARC_RESET',
  AUTO_ARC_USBJACK_INSPECT: 'KEY_AUTO_ARC_USBJACK_INSPECT',
  AUTO_FORMAT: 'KEY_AUTO_FORMAT',
  AUTO_PROGRAM: 'KEY_AUTO_PROGRAM',
  AV1: 'KEY_AV1',
  AV2: 'KEY_AV2',
  AV3: 'KEY_AV3',
  BACK_MHP: 'KEY_BACK_MHP',
  BOOKMARK: 'KEY_BOOKMARK',
  CALLER_ID: 'KEY_CALLER_ID',
  CAPTION: 'KEY_CAPTION',
  CATV_MODE: 'KEY_CATV_MODE',
  CHDOWN: 'KEY_CHDOWN',
  CHUP: 'KEY_CHUP',
  CH_LIST: 'KEY_CH_LIST',
  CLEAR: 'KEY_CLEAR',
  CLOCK_DISPLAY: 'KEY_CLOCK_DISPLAY',
  COMPONENT1: 'KEY_COMPONENT1',
  COMPONENT2: 'KEY_COMPONENT2',
  CONTENTS: 'KEY_CONTENTS',
  CONVERGENCE: 'KEY_CONVERGENCE',
  CONVERT_AUDIO_MAINSUB: 'KEY_CONVERT_AUDIO_MAINSUB',
  CUSTOM: 'KEY_CUSTOM',
  CYAN: 'KEY_CYAN',
  DEVICE_CONNECT: 'KEY_DEVICE_CONNECT',
  DISC_MENU: 'KEY_DISC_MENU',
  DMA: 'KEY_DMA',
  DNET: 'KEY_DNET',
  DNIe: 'KEY_DNIe',
  DNSe: 'KEY_DNSe',
  DOOR: 'KEY_DOOR',
  DOWN: 'KEY_DOWN',
  DSS_MODE: 'KEY_DSS_MODE',
  DTV: 'KEY_DTV',
  DTV_LINK: 'KEY_DTV_LINK',
  DTV_SIGNAL: 'KEY_DTV_SIGNAL',
  DVD_MODE: 'KEY_DVD_MODE',
  DVI: 'KEY_DVI',
  DVR: 'KEY_DVR',
  DVR_MENU: 'KEY_DVR_MENU',
  DYNAMIC: 'KEY_DYNAMIC',
  ENTER: 'KEY_ENTER',
  ENTERTAINMENT: 'KEY_ENTERTAINMENT',
  ESAVING: 'KEY_ESAVING',
  EXIT: 'KEY_EXIT',
  EXT1: 'KEY_EXT1',
  EXT10: 'KEY_EXT10',
  EXT11: 'KEY_EXT11',
  EXT12: 'KEY_EXT12',
  EXT13: 'KEY_EXT13',
  EXT14: 'KEY_EXT14',
  EXT15: 'KEY_EXT15',
  EXT16: 'KEY_EXT16',
  EXT17: 'KEY_EXT17',
  EXT18: 'KEY_EXT18',
  EXT19: 'KEY_EXT19',
  EXT2: 'KEY_EXT2',
  EXT20: 'KEY_EXT20',
  EXT21: 'KEY_EXT21',
  EXT22: 'KEY_EXT22',
  EXT23: 'KEY_EXT23',
  EXT24: 'KEY_EXT24',
  EXT25: 'KEY_EXT25',
  EXT26: 'KEY_EXT26',
  EXT27: 'KEY_EXT27',
  EXT28: 'KEY_EXT28',
  EXT29: 'KEY_EXT29',
  EXT3: 'KEY_EXT3',
  EXT30: 'KEY_EXT30',
  EXT31: 'KEY_EXT31',
  EXT32: 'KEY_EXT32',
  EXT33: 'KEY_EXT33',
  EXT34: 'KEY_EXT34',
  EXT35: 'KEY_EXT35',
  EXT36: 'KEY_EXT36',
  EXT37: 'KEY_EXT37',
  EXT38: 'KEY_EXT38',
  EXT39: 'KEY_EXT39',
  EXT4: 'KEY_EXT4',
  EXT40: 'KEY_EXT40',
  EXT41: 'KEY_EXT41',
  EXT5: 'KEY_EXT5',
  EXT6: 'KEY_EXT6',
  EXT7: 'KEY_EXT7',
  EXT8: 'KEY_EXT8',
  EXT9: 'KEY_EXT9',
  FACTORY: 'KEY_FACTORY',
  FAVCH: 'KEY_FAVCH',
  FF: 'KEY_FF',
  FF_: 'KEY_FF_',
  FM_RADIO: 'KEY_FM_RADIO',
  GAME: 'KEY_GAME',
  GREEN: 'KEY_GREEN',
  GUIDE: 'KEY_GUIDE',
  HDMI: 'KEY_HDMI',
  HDMI1: 'KEY_HDMI1',
  HDMI2: 'KEY_HDMI2',
  HDMI3: 'KEY_HDMI3',
  HDMI4: 'KEY_HDMI4',
  HELP: 'KEY_HELP',
  HOME: 'KEY_HOME',
  ID_INPUT: 'KEY_ID_INPUT',
  ID_SETUP: 'KEY_ID_SETUP',
  INFO: 'KEY_INFO',
  INSTANT_REPLAY: 'KEY_INSTANT_REPLAY',
  LEFT: 'KEY_LEFT',
  LINK: 'KEY_LINK',
  LIVE: 'KEY_LIVE',
  MAGIC_BRIGHT: 'KEY_MAGIC_BRIGHT',
  MAGIC_CHANNEL: 'KEY_MAGIC_CHANNEL',
  MDC: 'KEY_MDC',
  MENU: 'KEY_MENU',
  MIC: 'KEY_MIC',
  MORE: 'KEY_MORE',
  MOVIE1: 'KEY_MOVIE1',
  MS: 'KEY_MS',
  MTS: 'KEY_MTS',
  MUTE: 'KEY_MUTE',
  NINE_SEPERATE: 'KEY_NINE_SEPERATE',
  OPEN: 'KEY_OPEN',
  PANNEL_CHDOWN: 'KEY_PANNEL_CHDOWN',
  PANNEL_CHUP: 'KEY_PANNEL_CHUP',
  PANNEL_ENTER: 'KEY_PANNEL_ENTER',
  PANNEL_MENU: 'KEY_PANNEL_MENU',
  PANNEL_POWER: 'KEY_PANNEL_POWER',
  PANNEL_SOURCE: 'KEY_PANNEL_SOURCE',
  PANNEL_VOLDOW: 'KEY_PANNEL_VOLDOW',
  PANNEL_VOLUP: 'KEY_PANNEL_VOLUP',
  PANORAMA: 'KEY_PANORAMA',
  PAUSE: 'KEY_PAUSE',
  PCMODE: 'KEY_PCMODE',
  PERPECT_FOCUS: 'KEY_PERPECT_FOCUS',
  PICTURE_SIZE: 'KEY_PICTURE_SIZE',
  PIP_CHDOWN: 'KEY_PIP_CHDOWN',
  PIP_CHUP: 'KEY_PIP_CHUP',
  PIP_ONOFF: 'KEY_PIP_ONOFF',
  PIP_SCAN: 'KEY_PIP_SCAN',
  PIP_SIZE: 'KEY_PIP_SIZE',
  PIP_SWAP: 'KEY_PIP_SWAP',
  PLAY: 'KEY_PLAY',
  PLUS100: 'KEY_PLUS100',
  PMODE: 'KEY_PMODE',
  POWER: 'KEY_POWER',
  POWEROFF: 'KEY_POWEROFF',
  POWERON: 'KEY_POWERON',
  PRECH: 'KEY_PRECH',
  PRINT: 'KEY_PRINT',
  PROGRAM: 'KEY_PROGRAM',
  QUICK_REPLAY: 'KEY_QUICK_REPLAY',
  REC: 'KEY_REC',
  RED: 'KEY_RED',
  REPEAT: 'KEY_REPEAT',
  RESERVED1: 'KEY_RESERVED1',
  RETURN: 'KEY_RETURN',
  REWIND: 'KEY_REWIND',
  REWIND_: 'KEY_REWIND_',
  RIGHT: 'KEY_RIGHT',
  RSS: 'KEY_RSS',
  RSURF: 'KEY_RSURF',
  SCALE: 'KEY_SCALE',
  SEFFECT: 'KEY_SEFFECT',
  SETUP_CLOCK_TIMER: 'KEY_SETUP_CLOCK_TIMER',
  SLEEP: 'KEY_SLEEP',
  SOURCE: 'KEY_SOURCE',
  SRS: 'KEY_SRS',
  STANDARD: 'KEY_STANDARD',
  STB_MODE: 'KEY_STB_MODE',
  STILL_PICTURE: 'KEY_STILL_PICTURE',
  STOP: 'KEY_STOP',
  SUB_TITLE: 'KEY_SUB_TITLE',
  SVIDEO1: 'KEY_SVIDEO1',
  SVIDEO2: 'KEY_SVIDEO2',
  SVIDEO3: 'KEY_SVIDEO3',
  TOOLS: 'KEY_TOOLS',
  TOPMENU: 'KEY_TOPMENU',
  TTX_MIX: 'KEY_TTX_MIX',
  TTX_SUBFACE: 'KEY_TTX_SUBFACE',
  TURBO: 'KEY_TURBO',
  TV: 'KEY_TV',
  TV_MODE: 'KEY_TV_MODE',
  UP: 'KEY_UP',
  VCHIP: 'KEY_VCHIP',
  VCR_MODE: 'KEY_VCR_MODE',
  VOLDOWN: 'KEY_VOLDOWN',
  VOLUP: 'KEY_VOLUP',
  WHEEL_LEFT: 'KEY_WHEEL_LEFT',
  WHEEL_RIGHT: 'KEY_WHEEL_RIGHT',
  W_LINK: 'KEY_W_LINK',
  YELLOW: 'KEY_YELLOW',
  ZOOM1: 'KEY_ZOOM1',
  ZOOM2: 'KEY_ZOOM2',
  ZOOM_IN: 'KEY_ZOOM_IN',
  ZOOM_MOVE: 'KEY_ZOOM_MOVE',
  ZOOM_OUT: 'KEY_ZOOM_OUT'
};

//Export the class
module.exports = SamsungRemote;