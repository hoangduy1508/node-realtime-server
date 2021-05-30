const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9898);
console.log("Connent to websocket server on: ws://localhost:9898/");

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {

      console.log('Received Message:', message.utf8Data);

      let name = JSON.parse(message.utf8Data).text;

      console.log("name from client", name)

      connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
