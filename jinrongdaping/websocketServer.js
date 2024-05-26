// websocketServer.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

console.log('WebSocket server is running on ws://localhost:8080');