'use strict';
const
  zmq = require('zmq'),
  pusher = zmq.socket('push');

let jobCount = 0;

// Send a job to the work queue.
setInterval(function() {
  jobCount += 1;
  let msg = {
    pid: process.pid,
    job: jobCount
  };
  pusher.send(JSON.stringify(msg));
}, 1000);

// Listen on TCP port 5434.
pusher.bind('tcp://*:5434', function(err) {
  console.log('Listening for zmq pullers...');
});

