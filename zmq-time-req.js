'use strict';
const
  zmq = require('zmq'),
  requester = zmq.socket('req');

requester.on("message", function(data) {
  let response = JSON.parse(data);
  console.log("Response from " + response.pid + ': ' +
      new Date(response.timestamp));
});

requester.connect("tcp://localhost:5433");

console.log('Sending request for time.');
requester.send(JSON.stringify({
  pid: process.pid
}));

