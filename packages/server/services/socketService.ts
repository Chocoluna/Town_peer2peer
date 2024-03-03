'use strict'

import { Server } from 'socket.io'

export class SocketService {
  private io: Server

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    })

    let idSocket = []
    const getMinSockId = () => {
      return idSocket.reduce((acc, curr) => {
        return acc < curr ? acc : curr
      })
    }

    this.io.on('connection', (socket) => {
      console.log('a user connected ' + socket.id)
      idSocket.push(socket.id)

      if (idSocket.length > 1) {
        const minSocketId = getMinSockId()
        this.io.sockets.sockets.forEach((socket) => {
          const payload = {
            peerId: socket.id,
            initiator: socket.id === minSocketId, // true ou false selon la situation
          }
          socket.broadcast.emit('peer', payload)
        })
      }

      socket.on('disconnect', () => {
        console.log('user disconnected ' + socket.id)
        socket.broadcast.emit('PeerDeco', socket.id)
        idSocket = idSocket.filter((socketId) => {
          return socketId !== socket.id
        })
      })

      socket.on('signal', (msg) => {
        const peer2Id = msg.peerId
        msg.peerId = socket.id
        this.io.to(peer2Id).emit('signal', msg)
      })

      // Broadcast message to all clients except the sender
      socket.on('message', (msg: string) => {
        socket.broadcast.emit('message', msg)
      })
    })
  }
}
