var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(require('cors')())
app.use(express.static('public'));


io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');

  socket.on('new-message', function(data) {
    socket.broadcast.emit(data);
  });
});

server.listen(80, function() {
  console.log("Servidor corriendo ");
});