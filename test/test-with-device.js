'use strict';
var Samsung = require('./../lib/node-samsung-remote');
var remote = new Samsung({ip: '192.168.0.102'});

//test the command buffer and commandInterval
for(let i = 0; i < 10; i++) {
  remote.send(Samsung.numbers[i]);
}

//test set channel
remote.setChannel(104);

//test volume and channel
remote.volume(true);
remote.volume(false);
remote.channel(true);
remote.channel(false);

//test arrow keys
remote.arrow('left');
remote.arrow('right');
remote.arrow('up');
remote.arrow('down');
