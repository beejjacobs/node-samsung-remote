'use strict';
var Samsung = require('./../lib/node-samsung-remote');

class Test extends Samsung {
  constructor(config) {
    super(config);
  }

  //override the send to device to just log commands
  sendToDevice(command) {
    this.processing = true;

    console.log(command);

    let self = this;
    //Success, process next
    self.timer = setTimeout(function() {
      self.timer = null;
      self.processing = false;
      self.processBuffer();
    }, self.commandInterval);
  }
}

//test the command buffer and commandInterval
var remote = new Test({commandInterval: 100});

for(let i = 0; i < 10; i++) {
  remote.send(i);
}

//test set channel
remote.setChannel(104);

//test volume and channel
remote.volume(true);
remote.volume(false);
remote.channel(true);
remote.channel(false);