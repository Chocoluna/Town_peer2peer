/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// socket
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const path = require('path')

const DIST_DIR = path.join(__dirname, '../../client/dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.use(express.static(DIST_DIR))

// initiator is the first one in the board
let idSocket = []

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id)
  idSocket.push(socket.id)

  if (idSocket.length > 1) {
    const initiator = idSocket[0]
    console.log('the initiator is : ', initiator)
    io.sockets.sockets.forEach((socket) => {
      const data = {
        peerId: socket.id,
        initiator: socket.id === initiator,
      }
      console.log(data)
      socket.broadcast.emit('peer', data)
    })
  }

  socket.on('signal', (msg) => {
    const peer2Id = msg.peerId
    msg.peerId = socket.id
    io.to(peer2Id).emit('signal', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id)
    socket.broadcast.emit('PeerDeco', socket.id)
    idSocket = idSocket.filter((socketId) => {
      return socketId !== socket.id
    })
  })
})

server.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}\n`)
})
