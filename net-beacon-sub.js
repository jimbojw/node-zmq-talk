'use strict';
const
  net = require('net'),
  client = net.connect({port: 5432});

client.on('data', function(data) {
  let msg = JSON.parse(data);
  console.log(msg.pid + ': ' + new Date(msg.timestamp));
});

