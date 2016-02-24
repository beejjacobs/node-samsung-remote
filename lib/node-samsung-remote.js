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
     * @default
     */
    this.timer = null;
  }

  /**
   * Set a channel number
   * @param {Number} channel
   */
  setChannel(channel) {
    let channelString = channel.toString();
    for (let i = 0; i < channelString.length; i++) {
      let number = channelString.charAt(i);
      this.send(SamsungRemote.numbers[number]);
    }
  }

  /**
   * Volume up/daown
   * @param {boolean} up True to increase volume, false to decrease
   */
  volume(up) {
    if(up) {
      this.send(SamsungRemote.keys.VOLUP);
    } else {
      this.send(SamsungRemote.keys.VOLDOWN);
    }
  }

  /**
   * Channel up/down
   * @param {boolean} up True for next channel, false for previous
   */
  channel(up) {
    if(up) {
      this.send(SamsungRemote.keys.CHUP);
    } else {
      this.send(SamsungRemote.keys.CHDOWN);
    }
  }

  /**
   * Add to the command buffer
   * @param {string} command from SamsungRemote.keys
   */
  send(command) {
    this.commandBuffer.push(command);
    this.processBuffer();
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
      console.error(('[SamsungRemote] send() missing command'));
    }

    let socket = net.connect(this.port, this.ip);
    let self = this;

    this.processing = true; //stop other commands being sent

    socket.setTimeout(this.timeout);

    socket.on('connect', function() {
      socket.write(self.messageFirst());
      socket.write(self.messageSecond(command));
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
 * @type {object}
 * @default
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
  ENTERTAINMENT: 'KEY_ENTERTAINMENT',
  ESAVING: 'KEY_ESAVING',
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