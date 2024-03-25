import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { io } from 'socket.io-client'
import {
  movePlayer,
  setAvatar,
  setStream,
  removeStream,
} from '../slices/board-slice'
import { store } from './index'

// connexion to the server
const socket = io()
const useTrickle = true

let peer: SimplePeer.Instance

socket.on('action', (msg: any) => {
  msg.payload.user = false
})

export const propagateSocketMiddleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    // socket.emit('action', action)
    // check if we propagate the action.
    if (peer !== undefined && peer !== null) {
      if (action.meta.propagate) {
        // JSON must be serialised with JSON.stringify(objet)
        switch (action.type) {
          case 'board/setStream':
            peer.addStream(action.payload[0])
            break
          case 'board/removeStream':
            peer.removeStream(action.payload[0])
            break
          default:
            peer.send(JSON.stringify(action))
            break
        }
      }
    } else {
      console.log('peer not found')
    }

    // After sending info to the sever, you pass the action down to the next middleware
    next(action)
  }

socket.on('peer', (data: { peerId: string; initiator: boolean }) => {
  const peerId = data.peerId
  const initiator = data.initiator

  peer = new SimplePeer({
    initiator: initiator,
    trickle: true, // useTrickle doit être a true pour que le peer persiste - DONE
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
      ],
    },
  })

  // TODO ajouter tous les listeners au peer - DONE

  socket.on('signal', function (data) {
    console.log('received signal on socket')
    // TODO propagate signal from socket to peer - DONE
    peer.signal(data.signal)
  })

  peer.on('signal', function (data) {
    console.log('Advertising signaling data' + data + 'to Peer ID:' + peerId)
    // TODO propagate signal from peer to socket - DONE
    socket.emit('signal', {
      signal: data,
      peerId: peerId,
    })
  })

  peer.on('error', function (e) {
    console.log('Error sending connection to peer :' + peerId + e)
  })

  peer.on('connect', function () {
    console.log('Peer connection established')
    // checking if it works by sending send("hello") to the peer
    peer.send('Hello, je suis : ' + socket.id)

    const action = {
      type: 'connexion',
      // store.getstate because the hooks version doesn't work.
      // Error: Minified React error
      playerAvatar: store.getState().playerAvatar,
      playerPosition: store.getState().playerPosition,
    }

    peer.send(JSON.stringify(action))
  })

  peer.on('data', function (data) {
    console.log('Received data from peer:' + data)
    let restructuredData
    try {
      restructuredData = JSON.parse(data)
    } catch (e) {
      restructuredData = data
    }
    // TODO take action after receiving data from peer - DONE
    switch (restructuredData.type) {
      case 'board/movePlayer':
        store.dispatch(
          movePlayer([restructuredData.payload[0], 'remote'], false)
        )
        break
      case 'board/setAvatar':
        store.dispatch(
          setAvatar([restructuredData.payload[0], 'remote'], false)
        )
        break
      case 'connexion':
        store.dispatch(
          movePlayer([restructuredData.playerPosition, 'remote'], false)
        )
        store.dispatch(
          setAvatar([restructuredData.playerAvatar, 'remote'], false)
        )
        break
    }
  })

  peer.on('stream', (stream): void => {
    //   TP suivant 3.3 - DONE
    store.dispatch(setStream([stream, 'remote'], false))
  })

  peer.on('disconnect', function (data) {
    console.log('received disconnect on socket')
    peer.destroy()
  })

  peer.on('close', () => {
    socket.close()
    console.log('close peer connection')
  })
})
