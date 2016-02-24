<a name="SamsungRemote"></a>
## SamsungRemote
Samsung Remote class

**Kind**: global class  

* [SamsungRemote](#SamsungRemote)
    * [new SamsungRemote(config)](#new_SamsungRemote_new)
    * _instance_
        * [.ip](#SamsungRemote+ip) : <code>string</code>
        * [.port](#SamsungRemote+port) : <code>Number</code>
        * [.timeout](#SamsungRemote+timeout) : <code>Number</code>
        * [.host](#SamsungRemote+host) : <code>Object</code>
        * [.appString](#SamsungRemote+appString) : <code>string</code>
        * [.tvAppString](#SamsungRemote+tvAppString) : <code>string</code>
        * [.commandInterval](#SamsungRemote+commandInterval) : <code>Number</code>
        * [.commandBuffer](#SamsungRemote+commandBuffer) : <code>Array</code>
        * [.processing](#SamsungRemote+processing) : <code>boolean</code>
        * [.timer](#SamsungRemote+timer) : <code>object</code>
        * [.setChannel(channel)](#SamsungRemote+setChannel)
        * [.volume(up)](#SamsungRemote+volume)
        * [.channel(up)](#SamsungRemote+channel)
        * [.send(command)](#SamsungRemote+send)
        * [.processBuffer()](#SamsungRemote+processBuffer)
        * [.sendToDevice(command)](#SamsungRemote+sendToDevice)
        * [.messageFirst()](#SamsungRemote+messageFirst) ⇒ <code>string</code>
        * [.messageSecond(command)](#SamsungRemote+messageSecond) ⇒ <code>string</code>
    * _static_
        * [.numbers](#SamsungRemote.numbers) : <code>object</code>
        * [.keys](#SamsungRemote.keys) : <code>object</code>
        * [.chr(charCode)](#SamsungRemote.chr) ⇒ <code>string</code>
        * [.base64Encode(string)](#SamsungRemote.base64Encode) ⇒ <code>String</code>

<a name="new_SamsungRemote_new"></a>
### new SamsungRemote(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> |  |
| config.ip | <code>string</code> | IP of the TV |
| [config.port] | <code>Number</code> | port to connect to the TV |
| [config.timeout] | <code>Number</code> | socket timeout when sending commands |
| [config.host] | <code>object</code> |  |
| [config.host.ip] | <code>string</code> | host (server) IP |
| [config.host.mac] | <code>string</code> | host (server) MAC address |
| [config.host.name] | <code>string</code> | host (server) name |
| [config.appString] | <code>string</code> | app string sent to the TV |
| [config.tvAppString] | <code>string</code> | tv string sent to the TV |
| [config.commandInterval] | <code>Number</code> | minimum interval between commands |

<a name="SamsungRemote+ip"></a>
### samsungRemote.ip : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+port"></a>
### samsungRemote.port : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+timeout"></a>
### samsungRemote.timeout : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+host"></a>
### samsungRemote.host : <code>Object</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+appString"></a>
### samsungRemote.appString : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+tvAppString"></a>
### samsungRemote.tvAppString : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+commandInterval"></a>
### samsungRemote.commandInterval : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+commandBuffer"></a>
### samsungRemote.commandBuffer : <code>Array</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>[]</code>  
<a name="SamsungRemote+processing"></a>
### samsungRemote.processing : <code>boolean</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>false</code>  
<a name="SamsungRemote+timer"></a>
### samsungRemote.timer : <code>object</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code></code>  
<a name="SamsungRemote+setChannel"></a>
### samsungRemote.setChannel(channel)
Set a channel number

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| channel | <code>Number</code> | 

<a name="SamsungRemote+volume"></a>
### samsungRemote.volume(up)
True to increase volume, false to decrease

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| up | <code>boolean</code> | 

<a name="SamsungRemote+channel"></a>
### samsungRemote.channel(up)
True for next channel, false for previous

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| up | <code>boolean</code> | 

<a name="SamsungRemote+send"></a>
### samsungRemote.send(command)
Add to the command buffer

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>string</code> | from SamsungRemote.keys |

<a name="SamsungRemote+processBuffer"></a>
### samsungRemote.processBuffer()
Process the command buffer and send to the device

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+sendToDevice"></a>
### samsungRemote.sendToDevice(command)
Send the command to the device

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| command | <code>string</code> | 

<a name="SamsungRemote+messageFirst"></a>
### samsungRemote.messageFirst() ⇒ <code>string</code>
First section of the encoded command

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+messageSecond"></a>
### samsungRemote.messageSecond(command) ⇒ <code>string</code>
Second section of the encoded command

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| command | <code>string</code> | 

<a name="SamsungRemote.numbers"></a>
### SamsungRemote.numbers : <code>object</code>
**Kind**: static property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote.keys"></a>
### SamsungRemote.keys : <code>object</code>
**Kind**: static property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>{&quot;NUM_0&quot;:&quot;KEY_0&quot;,&quot;NUM_1&quot;:&quot;KEY_1&quot;,&quot;NUM_2&quot;:&quot;KEY_2&quot;,&quot;NUM_3&quot;:&quot;KEY_3&quot;,&quot;NUM_4&quot;:&quot;KEY_4&quot;,&quot;NUM_5&quot;:&quot;KEY_5&quot;,&quot;NUM_6&quot;:&quot;KEY_6&quot;,&quot;NUM_7&quot;:&quot;KEY_7&quot;,&quot;NUM_8&quot;:&quot;KEY_8&quot;,&quot;NUM_9&quot;:&quot;KEY_9&quot;,&quot;NUM_11&quot;:&quot;KEY_11&quot;,&quot;NUM_12&quot;:&quot;KEY_12&quot;,&quot;NUM_16_9&quot;:&quot;KEY_16_9&quot;,&quot;NUM_3SPEED&quot;:&quot;KEY_3SPEED&quot;,&quot;NUM_4_3&quot;:&quot;KEY_4_3&quot;,&quot;AD&quot;:&quot;KEY_AD&quot;,&quot;ADDDEL&quot;:&quot;KEY_ADDDEL&quot;,&quot;ALT_MHP&quot;:&quot;KEY_ALT_MHP&quot;,&quot;ANGLE&quot;:&quot;KEY_ANGLE&quot;,&quot;ANTENA&quot;:&quot;KEY_ANTENA&quot;,&quot;ANYNET&quot;:&quot;KEY_ANYNET&quot;,&quot;ANYVIEW&quot;:&quot;KEY_ANYVIEW&quot;,&quot;APP_LIST&quot;:&quot;KEY_APP_LIST&quot;,&quot;ASPECT&quot;:&quot;KEY_ASPECT&quot;,&quot;AUTO_ARC_ANTENNA_AIR&quot;:&quot;KEY_AUTO_ARC_ANTENNA_AIR&quot;,&quot;AUTO_ARC_ANTENNA_CABLE&quot;:&quot;KEY_AUTO_ARC_ANTENNA_CABLE&quot;,&quot;AUTO_ARC_ANTENNA_SATELLITE&quot;:&quot;KEY_AUTO_ARC_ANTENNA_SATELLITE&quot;,&quot;AUTO_ARC_ANYNET_AUTO_START&quot;:&quot;KEY_AUTO_ARC_ANYNET_AUTO_START&quot;,&quot;AUTO_ARC_ANYNET_MODE_OK&quot;:&quot;KEY_AUTO_ARC_ANYNET_MODE_OK&quot;,&quot;AUTO_ARC_AUTOCOLOR_FAIL&quot;:&quot;KEY_AUTO_ARC_AUTOCOLOR_FAIL&quot;,&quot;AUTO_ARC_AUTOCOLOR_SUCCESS&quot;:&quot;KEY_AUTO_ARC_AUTOCOLOR_SUCCESS&quot;,&quot;AUTO_ARC_CAPTION_ENG&quot;:&quot;KEY_AUTO_ARC_CAPTION_ENG&quot;,&quot;AUTO_ARC_CAPTION_KOR&quot;:&quot;KEY_AUTO_ARC_CAPTION_KOR&quot;,&quot;AUTO_ARC_CAPTION_OFF&quot;:&quot;KEY_AUTO_ARC_CAPTION_OFF&quot;,&quot;AUTO_ARC_CAPTION_ON&quot;:&quot;KEY_AUTO_ARC_CAPTION_ON&quot;,&quot;AUTO_ARC_C_FORCE_AGING&quot;:&quot;KEY_AUTO_ARC_C_FORCE_AGING&quot;,&quot;AUTO_ARC_JACK_IDENT&quot;:&quot;KEY_AUTO_ARC_JACK_IDENT&quot;,&quot;AUTO_ARC_LNA_OFF&quot;:&quot;KEY_AUTO_ARC_LNA_OFF&quot;,&quot;AUTO_ARC_LNA_ON&quot;:&quot;KEY_AUTO_ARC_LNA_ON&quot;,&quot;AUTO_ARC_PIP_CH_CHANGE&quot;:&quot;KEY_AUTO_ARC_PIP_CH_CHANGE&quot;,&quot;AUTO_ARC_PIP_DOUBLE&quot;:&quot;KEY_AUTO_ARC_PIP_DOUBLE&quot;,&quot;AUTO_ARC_PIP_LARGE&quot;:&quot;KEY_AUTO_ARC_PIP_LARGE&quot;,&quot;AUTO_ARC_PIP_LEFT_BOTTOM&quot;:&quot;KEY_AUTO_ARC_PIP_LEFT_BOTTOM&quot;,&quot;AUTO_ARC_PIP_LEFT_TOP&quot;:&quot;KEY_AUTO_ARC_PIP_LEFT_TOP&quot;,&quot;AUTO_ARC_PIP_RIGHT_BOTTOM&quot;:&quot;KEY_AUTO_ARC_PIP_RIGHT_BOTTOM&quot;,&quot;AUTO_ARC_PIP_RIGHT_TOP&quot;:&quot;KEY_AUTO_ARC_PIP_RIGHT_TOP&quot;,&quot;AUTO_ARC_PIP_SMALL&quot;:&quot;KEY_AUTO_ARC_PIP_SMALL&quot;,&quot;AUTO_ARC_PIP_SOURCE_CHANGE&quot;:&quot;KEY_AUTO_ARC_PIP_SOURCE_CHANGE&quot;,&quot;AUTO_ARC_PIP_WIDE&quot;:&quot;KEY_AUTO_ARC_PIP_WIDE&quot;,&quot;AUTO_ARC_RESET&quot;:&quot;KEY_AUTO_ARC_RESET&quot;,&quot;AUTO_ARC_USBJACK_INSPECT&quot;:&quot;KEY_AUTO_ARC_USBJACK_INSPECT&quot;,&quot;AUTO_FORMAT&quot;:&quot;KEY_AUTO_FORMAT&quot;,&quot;AUTO_PROGRAM&quot;:&quot;KEY_AUTO_PROGRAM&quot;,&quot;AV1&quot;:&quot;KEY_AV1&quot;,&quot;AV2&quot;:&quot;KEY_AV2&quot;,&quot;AV3&quot;:&quot;KEY_AV3&quot;,&quot;BACK_MHP&quot;:&quot;KEY_BACK_MHP&quot;,&quot;BOOKMARK&quot;:&quot;KEY_BOOKMARK&quot;,&quot;CALLER_ID&quot;:&quot;KEY_CALLER_ID&quot;,&quot;CAPTION&quot;:&quot;KEY_CAPTION&quot;,&quot;CATV_MODE&quot;:&quot;KEY_CATV_MODE&quot;,&quot;CHDOWN&quot;:&quot;KEY_CHDOWN&quot;,&quot;CHUP&quot;:&quot;KEY_CHUP&quot;,&quot;CH_LIST&quot;:&quot;KEY_CH_LIST&quot;,&quot;CLEAR&quot;:&quot;KEY_CLEAR&quot;,&quot;CLOCK_DISPLAY&quot;:&quot;KEY_CLOCK_DISPLAY&quot;,&quot;COMPONENT1&quot;:&quot;KEY_COMPONENT1&quot;,&quot;COMPONENT2&quot;:&quot;KEY_COMPONENT2&quot;,&quot;CONTENTS&quot;:&quot;KEY_CONTENTS&quot;,&quot;CONVERGENCE&quot;:&quot;KEY_CONVERGENCE&quot;,&quot;CONVERT_AUDIO_MAINSUB&quot;:&quot;KEY_CONVERT_AUDIO_MAINSUB&quot;,&quot;CUSTOM&quot;:&quot;KEY_CUSTOM&quot;,&quot;CYAN&quot;:&quot;KEY_CYAN&quot;,&quot;DEVICE_CONNECT&quot;:&quot;KEY_DEVICE_CONNECT&quot;,&quot;DISC_MENU&quot;:&quot;KEY_DISC_MENU&quot;,&quot;DMA&quot;:&quot;KEY_DMA&quot;,&quot;DNET&quot;:&quot;KEY_DNET&quot;,&quot;DNIe&quot;:&quot;KEY_DNIe&quot;,&quot;DNSe&quot;:&quot;KEY_DNSe&quot;,&quot;DOOR&quot;:&quot;KEY_DOOR&quot;,&quot;DOWN&quot;:&quot;KEY_DOWN&quot;,&quot;DSS_MODE&quot;:&quot;KEY_DSS_MODE&quot;,&quot;DTV&quot;:&quot;KEY_DTV&quot;,&quot;DTV_LINK&quot;:&quot;KEY_DTV_LINK&quot;,&quot;DTV_SIGNAL&quot;:&quot;KEY_DTV_SIGNAL&quot;,&quot;DVD_MODE&quot;:&quot;KEY_DVD_MODE&quot;,&quot;DVI&quot;:&quot;KEY_DVI&quot;,&quot;DVR&quot;:&quot;KEY_DVR&quot;,&quot;DVR_MENU&quot;:&quot;KEY_DVR_MENU&quot;,&quot;DYNAMIC&quot;:&quot;KEY_DYNAMIC&quot;,&quot;ENTERTAINMENT&quot;:&quot;KEY_ENTERTAINMENT&quot;,&quot;ESAVING&quot;:&quot;KEY_ESAVING&quot;,&quot;EXT1&quot;:&quot;KEY_EXT1&quot;,&quot;EXT10&quot;:&quot;KEY_EXT10&quot;,&quot;EXT11&quot;:&quot;KEY_EXT11&quot;,&quot;EXT12&quot;:&quot;KEY_EXT12&quot;,&quot;EXT13&quot;:&quot;KEY_EXT13&quot;,&quot;EXT14&quot;:&quot;KEY_EXT14&quot;,&quot;EXT15&quot;:&quot;KEY_EXT15&quot;,&quot;EXT16&quot;:&quot;KEY_EXT16&quot;,&quot;EXT17&quot;:&quot;KEY_EXT17&quot;,&quot;EXT18&quot;:&quot;KEY_EXT18&quot;,&quot;EXT19&quot;:&quot;KEY_EXT19&quot;,&quot;EXT2&quot;:&quot;KEY_EXT2&quot;,&quot;EXT20&quot;:&quot;KEY_EXT20&quot;,&quot;EXT21&quot;:&quot;KEY_EXT21&quot;,&quot;EXT22&quot;:&quot;KEY_EXT22&quot;,&quot;EXT23&quot;:&quot;KEY_EXT23&quot;,&quot;EXT24&quot;:&quot;KEY_EXT24&quot;,&quot;EXT25&quot;:&quot;KEY_EXT25&quot;,&quot;EXT26&quot;:&quot;KEY_EXT26&quot;,&quot;EXT27&quot;:&quot;KEY_EXT27&quot;,&quot;EXT28&quot;:&quot;KEY_EXT28&quot;,&quot;EXT29&quot;:&quot;KEY_EXT29&quot;,&quot;EXT3&quot;:&quot;KEY_EXT3&quot;,&quot;EXT30&quot;:&quot;KEY_EXT30&quot;,&quot;EXT31&quot;:&quot;KEY_EXT31&quot;,&quot;EXT32&quot;:&quot;KEY_EXT32&quot;,&quot;EXT33&quot;:&quot;KEY_EXT33&quot;,&quot;EXT34&quot;:&quot;KEY_EXT34&quot;,&quot;EXT35&quot;:&quot;KEY_EXT35&quot;,&quot;EXT36&quot;:&quot;KEY_EXT36&quot;,&quot;EXT37&quot;:&quot;KEY_EXT37&quot;,&quot;EXT38&quot;:&quot;KEY_EXT38&quot;,&quot;EXT39&quot;:&quot;KEY_EXT39&quot;,&quot;EXT4&quot;:&quot;KEY_EXT4&quot;,&quot;EXT40&quot;:&quot;KEY_EXT40&quot;,&quot;EXT41&quot;:&quot;KEY_EXT41&quot;,&quot;EXT5&quot;:&quot;KEY_EXT5&quot;,&quot;EXT6&quot;:&quot;KEY_EXT6&quot;,&quot;EXT7&quot;:&quot;KEY_EXT7&quot;,&quot;EXT8&quot;:&quot;KEY_EXT8&quot;,&quot;EXT9&quot;:&quot;KEY_EXT9&quot;,&quot;FACTORY&quot;:&quot;KEY_FACTORY&quot;,&quot;FAVCH&quot;:&quot;KEY_FAVCH&quot;,&quot;FF&quot;:&quot;KEY_FF&quot;,&quot;FF_&quot;:&quot;KEY_FF_&quot;,&quot;FM_RADIO&quot;:&quot;KEY_FM_RADIO&quot;,&quot;GAME&quot;:&quot;KEY_GAME&quot;,&quot;GREEN&quot;:&quot;KEY_GREEN&quot;,&quot;GUIDE&quot;:&quot;KEY_GUIDE&quot;,&quot;HDMI&quot;:&quot;KEY_HDMI&quot;,&quot;HDMI1&quot;:&quot;KEY_HDMI1&quot;,&quot;HDMI2&quot;:&quot;KEY_HDMI2&quot;,&quot;HDMI3&quot;:&quot;KEY_HDMI3&quot;,&quot;HDMI4&quot;:&quot;KEY_HDMI4&quot;,&quot;HELP&quot;:&quot;KEY_HELP&quot;,&quot;HOME&quot;:&quot;KEY_HOME&quot;,&quot;ID_INPUT&quot;:&quot;KEY_ID_INPUT&quot;,&quot;ID_SETUP&quot;:&quot;KEY_ID_SETUP&quot;,&quot;INFO&quot;:&quot;KEY_INFO&quot;,&quot;INSTANT_REPLAY&quot;:&quot;KEY_INSTANT_REPLAY&quot;,&quot;LEFT&quot;:&quot;KEY_LEFT&quot;,&quot;LINK&quot;:&quot;KEY_LINK&quot;,&quot;LIVE&quot;:&quot;KEY_LIVE&quot;,&quot;MAGIC_BRIGHT&quot;:&quot;KEY_MAGIC_BRIGHT&quot;,&quot;MAGIC_CHANNEL&quot;:&quot;KEY_MAGIC_CHANNEL&quot;,&quot;MDC&quot;:&quot;KEY_MDC&quot;,&quot;MENU&quot;:&quot;KEY_MENU&quot;,&quot;MIC&quot;:&quot;KEY_MIC&quot;,&quot;MORE&quot;:&quot;KEY_MORE&quot;,&quot;MOVIE1&quot;:&quot;KEY_MOVIE1&quot;,&quot;MS&quot;:&quot;KEY_MS&quot;,&quot;MTS&quot;:&quot;KEY_MTS&quot;,&quot;MUTE&quot;:&quot;KEY_MUTE&quot;,&quot;NINE_SEPERATE&quot;:&quot;KEY_NINE_SEPERATE&quot;,&quot;OPEN&quot;:&quot;KEY_OPEN&quot;,&quot;PANNEL_CHDOWN&quot;:&quot;KEY_PANNEL_CHDOWN&quot;,&quot;PANNEL_CHUP&quot;:&quot;KEY_PANNEL_CHUP&quot;,&quot;PANNEL_ENTER&quot;:&quot;KEY_PANNEL_ENTER&quot;,&quot;PANNEL_MENU&quot;:&quot;KEY_PANNEL_MENU&quot;,&quot;PANNEL_POWER&quot;:&quot;KEY_PANNEL_POWER&quot;,&quot;PANNEL_SOURCE&quot;:&quot;KEY_PANNEL_SOURCE&quot;,&quot;PANNEL_VOLDOW&quot;:&quot;KEY_PANNEL_VOLDOW&quot;,&quot;PANNEL_VOLUP&quot;:&quot;KEY_PANNEL_VOLUP&quot;,&quot;PANORAMA&quot;:&quot;KEY_PANORAMA&quot;,&quot;PAUSE&quot;:&quot;KEY_PAUSE&quot;,&quot;PCMODE&quot;:&quot;KEY_PCMODE&quot;,&quot;PERPECT_FOCUS&quot;:&quot;KEY_PERPECT_FOCUS&quot;,&quot;PICTURE_SIZE&quot;:&quot;KEY_PICTURE_SIZE&quot;,&quot;PIP_CHDOWN&quot;:&quot;KEY_PIP_CHDOWN&quot;,&quot;PIP_CHUP&quot;:&quot;KEY_PIP_CHUP&quot;,&quot;PIP_ONOFF&quot;:&quot;KEY_PIP_ONOFF&quot;,&quot;PIP_SCAN&quot;:&quot;KEY_PIP_SCAN&quot;,&quot;PIP_SIZE&quot;:&quot;KEY_PIP_SIZE&quot;,&quot;PIP_SWAP&quot;:&quot;KEY_PIP_SWAP&quot;,&quot;PLAY&quot;:&quot;KEY_PLAY&quot;,&quot;PLUS100&quot;:&quot;KEY_PLUS100&quot;,&quot;PMODE&quot;:&quot;KEY_PMODE&quot;,&quot;POWER&quot;:&quot;KEY_POWER&quot;,&quot;POWEROFF&quot;:&quot;KEY_POWEROFF&quot;,&quot;POWERON&quot;:&quot;KEY_POWERON&quot;,&quot;PRECH&quot;:&quot;KEY_PRECH&quot;,&quot;PRINT&quot;:&quot;KEY_PRINT&quot;,&quot;PROGRAM&quot;:&quot;KEY_PROGRAM&quot;,&quot;QUICK_REPLAY&quot;:&quot;KEY_QUICK_REPLAY&quot;,&quot;REC&quot;:&quot;KEY_REC&quot;,&quot;RED&quot;:&quot;KEY_RED&quot;,&quot;REPEAT&quot;:&quot;KEY_REPEAT&quot;,&quot;RESERVED1&quot;:&quot;KEY_RESERVED1&quot;,&quot;RETURN&quot;:&quot;KEY_RETURN&quot;,&quot;REWIND&quot;:&quot;KEY_REWIND&quot;,&quot;REWIND_&quot;:&quot;KEY_REWIND_&quot;,&quot;RIGHT&quot;:&quot;KEY_RIGHT&quot;,&quot;RSS&quot;:&quot;KEY_RSS&quot;,&quot;RSURF&quot;:&quot;KEY_RSURF&quot;,&quot;SCALE&quot;:&quot;KEY_SCALE&quot;,&quot;SEFFECT&quot;:&quot;KEY_SEFFECT&quot;,&quot;SETUP_CLOCK_TIMER&quot;:&quot;KEY_SETUP_CLOCK_TIMER&quot;,&quot;SLEEP&quot;:&quot;KEY_SLEEP&quot;,&quot;SOURCE&quot;:&quot;KEY_SOURCE&quot;,&quot;SRS&quot;:&quot;KEY_SRS&quot;,&quot;STANDARD&quot;:&quot;KEY_STANDARD&quot;,&quot;STB_MODE&quot;:&quot;KEY_STB_MODE&quot;,&quot;STILL_PICTURE&quot;:&quot;KEY_STILL_PICTURE&quot;,&quot;STOP&quot;:&quot;KEY_STOP&quot;,&quot;SUB_TITLE&quot;:&quot;KEY_SUB_TITLE&quot;,&quot;SVIDEO1&quot;:&quot;KEY_SVIDEO1&quot;,&quot;SVIDEO2&quot;:&quot;KEY_SVIDEO2&quot;,&quot;SVIDEO3&quot;:&quot;KEY_SVIDEO3&quot;,&quot;TOOLS&quot;:&quot;KEY_TOOLS&quot;,&quot;TOPMENU&quot;:&quot;KEY_TOPMENU&quot;,&quot;TTX_MIX&quot;:&quot;KEY_TTX_MIX&quot;,&quot;TTX_SUBFACE&quot;:&quot;KEY_TTX_SUBFACE&quot;,&quot;TURBO&quot;:&quot;KEY_TURBO&quot;,&quot;TV&quot;:&quot;KEY_TV&quot;,&quot;TV_MODE&quot;:&quot;KEY_TV_MODE&quot;,&quot;UP&quot;:&quot;KEY_UP&quot;,&quot;VCHIP&quot;:&quot;KEY_VCHIP&quot;,&quot;VCR_MODE&quot;:&quot;KEY_VCR_MODE&quot;,&quot;VOLDOWN&quot;:&quot;KEY_VOLDOWN&quot;,&quot;VOLUP&quot;:&quot;KEY_VOLUP&quot;,&quot;WHEEL_LEFT&quot;:&quot;KEY_WHEEL_LEFT&quot;,&quot;WHEEL_RIGHT&quot;:&quot;KEY_WHEEL_RIGHT&quot;,&quot;W_LINK&quot;:&quot;KEY_W_LINK&quot;,&quot;YELLOW&quot;:&quot;KEY_YELLOW&quot;,&quot;ZOOM1&quot;:&quot;KEY_ZOOM1&quot;,&quot;ZOOM2&quot;:&quot;KEY_ZOOM2&quot;,&quot;ZOOM_IN&quot;:&quot;KEY_ZOOM_IN&quot;,&quot;ZOOM_MOVE&quot;:&quot;KEY_ZOOM_MOVE&quot;,&quot;ZOOM_OUT&quot;:&quot;KEY_ZOOM_OUT&quot;}</code>  
<a name="SamsungRemote.chr"></a>
### SamsungRemote.chr(charCode) ⇒ <code>string</code>
Get a string from a character code

**Kind**: static method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| charCode | <code>Number</code> | 

<a name="SamsungRemote.base64Encode"></a>
### SamsungRemote.base64Encode(string) ⇒ <code>String</code>
Return a string encoded in base 64

**Kind**: static method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

