var express = require('express')
var app = express()
var server = require('http').Server(app)
const SocketServer = require('ws').Server;
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(require('cors')())
app.use(express.static(path.join(__dirname, 'public')))

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Someone connected');
  ws.on('close', () => console.log('Someone disconnected'));
});


wss.on('message', function incoming(data) {
    console.log(data);
    wss.send(data);
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
