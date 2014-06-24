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
  let message = JSON.stringify({ timestamp: Date.now() });
  connections.forEach(function(connection) {
    connection.write(message);
  });
}, 1000);

server.listen(5432, function() {
  console.log('Listening for subscribers...');
});

