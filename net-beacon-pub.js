'use strict';
const
  net = require('net'),
  connections = [],
  server = net.createServer(function(connection) {
    connections.push(connection);
    connection.on('close', function() {
      let index = connections.indexOf(connection);
      connections.splice(index, 1);
    });
  });

setInterval(function() {
  let data = JSON.stringify({
    pid: process.pid,
    timestamp: Date.now()
  });
  connections.forEach(function(connection) {
    connection.write(data);
  });
}, 1000);

server.listen(5432, function() {
  console.log('Listening for subscribers...');
});

