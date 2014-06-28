"use strict";
const
  zmq = require('zmq'),
  subscriber = zmq.socket('sub');

// Subscribe to all messages.
subscriber.subscribe('');

// Handle messages from publisher.
subscriber.on('message', function(data) {
  let msg = JSON.parse(data);
  console.log(msg.pid + ': ' + new Date(msg.timestamp));
});

// Connect to publisher.
subscriber.connect('tcp://localhost:5432');
