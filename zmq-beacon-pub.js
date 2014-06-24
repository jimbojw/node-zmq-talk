"use strict";
const
  zmq = require('zmq'),
  publisher = zmq.socket('pub');

// Send a beacon message to any subscribers.
setInterval(function() {
  publisher.send(JSON.stringify({
    timestamp: Date.now()
  }));
}, 1000);

// listen on TCP port 5432
publisher.bind('tcp://*:5432', function(err) {
  console.log('Listening for zmq subscribers...');
});

