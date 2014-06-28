'use strict';
const
  zmq = require('zmq'),
  responder = zmq.socket('rep');

responder.on('message', function(data) {
  
  let request = JSON.parse(data);
  console.log('Received request from: ' + request.pid);
  
  responder.send(JSON.stringify({
    pid: process.pid,
    timestamp: Date.now()
  }));
  
});

// Listen on TCP port 5433.
responder.bind('tcp://127.0.0.1:5433', function(err) {
  console.log('Listening for zmq requesters...');
});

