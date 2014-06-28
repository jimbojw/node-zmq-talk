'use strict';
const
  zmq = require('zmq'),
  publisher = zmq.socket('pub');

// Send a beacon message to any subscribers.
setInterval(function() {
  let msg = {
    pid: process.pid,
    timestamp: Date.now()
  };
  publisher.send(JSON.stringify(msg));
}, 1000);

// Listen on TCP port 5432.
publisher.bind('tcp://*:5432', function(err) {
  console.log('Listening for zmq subscribers...');
});

