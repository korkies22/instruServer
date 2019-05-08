var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(require('cors')())
app.use(express.static(path.join(__dirname, 'public')))

const wss = new SocketServer({ app });

wss.on('connection', (ws) => {
  console.log('Arduino connected');
  ws.on('close', () => console.log('Arduino disconnected'));
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets')

  socket.on('message', function(data) {
      console.log('Llego '+ data)
	wss.clients.forEach((client) => {
    client.send(data);
  });
  })
})

wss.on('message', function incoming(data) {
  console.log(data);
	io.sockets.emit('message',data)
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
