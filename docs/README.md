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
        * [.send(command)](#SamsungRemote+send)
        * [.sendToDevice(command)](#SamsungRemote+sendToDevice)
        * [.messageFirst()](#SamsungRemote+messageFirst) ⇒ <code>string</code>
        * [.messageSecond(command)](#SamsungRemote+messageSecond) ⇒ <code>string</code>
    * _static_
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
<a name="SamsungRemote+send"></a>
### samsungRemote.send(command)
Add to the command buffer

**Kind**: instance method of <code>[SamsungRemote](#SamsungRemote)</code>  

| Param |
| --- |
| command | 

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

