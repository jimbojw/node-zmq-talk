'use strict';
const
  net = require('net'),
  client = net.connect({port: 5432});

client.on('data', function(data) {
  let message = JSON.parse(data);
  console.log(new Date(message.timestamp));
});

