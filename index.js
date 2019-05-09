var express = require('express');
var app = express();
var server = require('http').Server(app);
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const path = require('path');
const PORT = process.env.PORT || 5000

app.use(require('cors')())
app.use(express.static(path.join(__dirname, 'public')))

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Someone connected');
  
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(data);
        let dataT= data.split("\n");
        for (let valueT of dataT){
          client.send(valueT);
        }
      }
    });
  });
  
  ws.on('close', () => console.log('Someone disconnected'));
});



server.listen(PORT, () => console.log(`Listening on ${PORT}`))