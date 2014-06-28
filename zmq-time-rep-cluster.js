'use strict';
const
  cluster = require('cluster'),
  zmq = require('zmq'),

  workerCount = 3,

  externalEndpoint = 'tcp://127.0.0.1:5433',
  workerEndpoint = 'ipc://filer-dealer.ipc';

if (cluster.isMaster) {
  
  // Master process - create ROUTER and DEALER sockets, bind endpoints.
  let
    router = zmq.socket('router').bind(externalEndpoint), 
    dealer = zmq.socket('dealer').bind(workerEndpoint); 
  
  // Forward messages between router and dealer.
  router.on('message', function() {
    let frames = Array.prototype.slice.call(arguments);
    dealer.send(frames);
  });
  
  dealer.on('message', function() {
    let frames = Array.prototype.slice.call(arguments);
    router.send(frames);
  });
  
  // Listen for workers to come online.
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online.');
  });
  
  // Fork worker processes.
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }
  
} else {
  
  // Worker process - create REP socket, connect to DEALER.
  let responder = zmq.socket('rep').connect(workerEndpoint);
  
  responder.on('message', function(data) {
    
    // Parse incoming message.
    let request = JSON.parse(data);
    console.log(process.pid + ' received request from: ' + request.pid);
    
    // Issue reply.
    responder.send(JSON.stringify({
      pid: process.pid,
      timestamp: Date.now()
    }));
    
  });
  
}

