'use strict';
var Samsung = require('./../lib/node-samsung-remote');

class Test extends Samsung {
  constructor(config) {
    super(config);
  }

  //override the send to device to just log commands
  sendToDevice(command) {
    this.processing = true;

    this.log('sending: ' + command);

    let self = this;
    //Success, process next
    self.timer = setTimeout(function() {
      self.timer = null;
      self.processing = false;
      self.processBuffer();
    }, self.commandInterval);
  }
}

var remote = new Test({commandInterval: 100, debug: true});

remote.send(undefined);
remote.send(null);
remote.send('');

remote.source();

//test the command buffer and commandInterval
for(let i = 0; i < 10; i++) {
  remote.number(i);
}

remote.setChannel(104);

remote.volume(true);
remote.volume(false);
remote.mute();
remote.channel(true);
remote.channel(false);

remote.arrow('left');
remote.arrow('right');
remote.arrow('up');
remote.arrow('down');

remote.smartHub();
remote.menu();
remote.guide();
remote.tools();
remote.info();
remote.back();
remote.exit();
remote.enter();

remote.colour('red');
remote.colour('green');
remote.colour('yellow');
remote.colour('blue');

remote.transport('play');
remote.transport('pause');
remote.transport('stop');
remote.transport('backward');
remote.transport('forward');
remote.transport('skip-backward');
remote.transport('record');
