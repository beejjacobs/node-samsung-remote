<a name="SamsungRemote"></a>
## SamsungRemote
Samsung Remote class

**Kind**: global class  

* [SamsungRemote](#SamsungRemote)
    * [new SamsungRemote(config)](#new_SamsungRemote_new)
    * _instance_
        * [.debug](#SamsungRemote+debug) : <code>boolean</code>
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
        * [.source()](#SamsungRemote+source)
        * [.setChannel(channel)](#SamsungRemote+setChannel)
        * [.number(number)](#SamsungRemote+number)
        * [.volume(up)](#SamsungRemote+volume)
        * [.mute()](#SamsungRemote+mute)
        * [.channel(up)](#SamsungRemote+channel)
        * [.previousChannel()](#SamsungRemote+previousChannel)
        * [.arrow(direction)](#SamsungRemote+arrow)
        * [.smartHub()](#SamsungRemote+smartHub)
        * [.menu()](#SamsungRemote+menu)
        * [.guide()](#SamsungRemote+guide)
        * [.tools()](#SamsungRemote+tools)
        * [.info()](#SamsungRemote+info)
        * [.back()](#SamsungRemote+back)
        * [.exit()](#SamsungRemote+exit)
        * [.enter()](#SamsungRemote+enter)
        * [.colour(colour)](#SamsungRemote+colour)
        * [.transport(command)](#SamsungRemote+transport)
        * [.tv()](#SamsungRemote+tv)
        * [.hdmi()](#SamsungRemote+hdmi)
        * [.send(command)](#SamsungRemote+send)
        * [.processBuffer()](#SamsungRemote+processBuffer)
        * [.sendToDevice(command)](#SamsungRemote+sendToDevice)
        * [.buildMessage(command)](#SamsungRemote+buildMessage) ⇒ <code>object</code>
        * [.log(message)](#SamsungRemote+log)
        * [.error(message)](#SamsungRemote+error)
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
| [config.debug] | <code>boolean</code> |  |

<a name="SamsungRemote+debug"></a>
### samsungRemote.debug : <code>boolean</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>false</code>  
<a name="SamsungRemote+ip"></a>
### samsungRemote.ip : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+port"></a>
### samsungRemote.port : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>55000</code>  
<a name="SamsungRemote+timeout"></a>
### samsungRemote.timeout : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>5000</code>  
<a name="SamsungRemote+host"></a>
### samsungRemote.host : <code>Object</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>{ip: &quot;127.0.0.1&quot;, mac: &quot;00:00:00:00&quot;, name: &quot;NodeJS Samsung Remote&quot;}</code>  
<a name="SamsungRemote+appString"></a>
### samsungRemote.appString : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>&quot;iphone..iapp.samsung&quot;</code>  
<a name="SamsungRemote+tvAppString"></a>
### samsungRemote.tvAppString : <code>string</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>&quot;iphone.UN60D6000.iapp.samsung&quot;</code>  
<a name="SamsungRemote+commandInterval"></a>
### samsungRemote.commandInterval : <code>Number</code>
**Kind**: instance property of <code>[SamsungRemote](#SamsungRemote)</code>  
**Default**: <code>500</code>  
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
**Default**: <code>null</code>  
<a name="SamsungRemote+source"></a>
### samsungRemote.source()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+setChannel"></a>
### samsungRemote.setChannel(channel)
Set a channel number

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| channel | <code>Number</code> | 

<a name="SamsungRemote+number"></a>
### samsungRemote.number(number)
Number key

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> &#124; <code>string</code> | 0-9 |

<a name="SamsungRemote+volume"></a>
### samsungRemote.volume(up)
Volume up/down

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| up | <code>boolean</code> | true to increase volume, false to decrease |

<a name="SamsungRemote+mute"></a>
### samsungRemote.mute()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+channel"></a>
### samsungRemote.channel(up)
Channel up/down

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| up | <code>boolean</code> | true for next channel, false for previous |

<a name="SamsungRemote+previousChannel"></a>
### samsungRemote.previousChannel()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+arrow"></a>
### samsungRemote.arrow(direction)
Arrow keys

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>string</code> | left,right,up,down |

<a name="SamsungRemote+smartHub"></a>
### samsungRemote.smartHub()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+menu"></a>
### samsungRemote.menu()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+guide"></a>
### samsungRemote.guide()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+tools"></a>
### samsungRemote.tools()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+info"></a>
### samsungRemote.info()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+back"></a>
### samsungRemote.back()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+exit"></a>
### samsungRemote.exit()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+enter"></a>
### samsungRemote.enter()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+colour"></a>
### samsungRemote.colour(colour)
Colour buttons (also labelled A,B,C,D)

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| colour | <code>string</code> | red, green, yellow, blue, a, b, c, d |

<a name="SamsungRemote+transport"></a>
### samsungRemote.transport(command)
Transport keys

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>string</code> | play, pause, stop, record, forward, backward, skip-forward, skip-backward |

<a name="SamsungRemote+tv"></a>
### samsungRemote.tv()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote+hdmi"></a>
### samsungRemote.hdmi()
**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
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

<a name="SamsungRemote+buildMessage"></a>
### samsungRemote.buildMessage(command) ⇒ <code>object</code>
Encode the command

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  
**Returns**: <code>object</code> - message  

| Param | Type |
| --- | --- |
| command | <code>string</code> | 

<a name="SamsungRemote+log"></a>
### samsungRemote.log(message)
Log to console.log if this.debug is true

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| message | <code>\*</code> | 

<a name="SamsungRemote+error"></a>
### samsungRemote.error(message)
Log to console.error if this.debug is true

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param | Type |
| --- | --- |
| message | <code>\*</code> | 

<a name="SamsungRemote.numbers"></a>
### SamsungRemote.numbers : <code>object</code>
**Kind**: static property of <code>[SamsungRemote](#SamsungRemote)</code>  
<a name="SamsungRemote.keys"></a>
### SamsungRemote.keys : <code>object</code>
Known/tested keys:<table>  <tr><th>Object Key</th><th>Description</th></tr>  <tr><td>NUM_0 - NUM_9</td><td>Numbers</td></tr>  <tr><td>W_LINK</td><td>Smart Hub</td></tr>  <tr><td>VOLUP, VOLDOWN</td><td>Volume</td></tr>  <tr><td>MUTE</td><td>Mute</td></tr>  <tr><td>CHUP, CHDOWN</td><td>Channel</td></tr>  <tr><td>CH_LIST</td><td>Channel List</td></tr>  <tr><td>PRECH</td><td>Previous Channel</td></tr>  <tr><td>LEFT, RIGHT, UP, DOWN</td><td>Arrow keys</td></tr>  <tr><td>ENTER</td><td>Enter</td></tr>  <tr><td>EXIT</td><td>Exit</td></tr>  <tr><td>MENU</td><td>Menu</td></tr>  <tr><td>GUIDE</td><td>Guide</td></tr>  <tr><td>TOOLS</td><td>Tools</td></tr>  <tr><td>INFO</td><td>Info</td></tr>  <tr><td>RETURN</td><td>Return</td></tr>  <tr><td>RED, GREEN, YELLOW, CYAN</td><td>Colour buttons</td></tr>  <tr><td>PLAY, PAUSE, STOP, RECORD< FF, FF_, REWIND, REWIND_</td><td>Transports</td></tr>  <tr><td>PLAY, PAUSE, STOP, RECORD< FF, FF_, REWIND, REWIND_</td><td>Transports</td></tr>  <tr><td>TV</td><td>TV</td></tr>  <tr><td>HDMI</td><td>HDMI 1</td></tr></table>

**Kind**: static property of <code>[SamsungRemote](#SamsungRemote)</code>  
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

