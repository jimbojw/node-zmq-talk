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
  connections.forEach(function(connection) {
    connection.write(JSON.stringify({
      timestamp: Date.now()
    }));
  });
}, 1000);

server.listen(5432, function() {
  console.log('Listening for subscribers...');
});

