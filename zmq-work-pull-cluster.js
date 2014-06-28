'use strict';
const
  cluster = require('cluster'),
  zmq = require('zmq'),

  workerCount = 3;

if (cluster.isMaster) {
  
  // Listen for workers to come online.
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online.');
  });
  
  // Fork worker processes.
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }
  
} else {
  
  // Worker process - create PULL socket, connect to PUSH.
  let puller = zmq.socket('pull');

  // Perform work as it comes in.
  puller.on('message', function(data) {
    let msg = JSON.parse(data);
    console.log(msg.pid + ': Job ' + msg.job +' (' + process.pid + ')');
  });

  // Connect to pusher.
  puller.connect('tcp://localhost:5434');

}
