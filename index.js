var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(require('cors')())
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets')

  socket.on('new-message', function(data) {
    socket.broadcast.emit(data)
  })
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
