"use strict";
const
  zmq = require('zmq'),
  puller = zmq.socket('pull');

// Perform work as it comes in.
puller.on('message', function(data) {
  let msg = JSON.parse(data);
  console.log(msg.pid + ': Job received - ' + msg.job);
});

// Connect to pusher.
puller.connect('tcp://localhost:5434');
