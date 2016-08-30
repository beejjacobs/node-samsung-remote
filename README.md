# Node.js Samsung Smart TV Remote

Based on the [samsung-remote](https://github.com/natalan/samsung-remote) module.

Tested with a Samsung UE39F5300.

See docs/README.md for all functions and detailed usage.

Getting Started
-----

```javascript
let SamsungRemote = require('node-samsung-remote');
//ip address is the minimum required
let remote = new SamsungRemote({ip: '192.168.0.102'});

//Set the channel number
remote.setChannel(104);

//Increase the volume
remote.volumeUp();

//Go to the Smart Hub
remote.smartHub();

```

License
-----
Copyright (c) 2016 Ben Jacobs

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
