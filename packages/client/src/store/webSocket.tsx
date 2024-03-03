import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { io } from 'socket.io-client'
import { movePlayer, setAvatar } from 'src/slices/board-slice'
import { store } from './index'

// on se connecte au serveur
const socket = io()
const useTrickle = true

let peer: SimplePeer.Instance

socket.on('action', (msg: any) => {
  console.log('action', msg)
  msg.payload.user = false
})

export const propagateSocketMiddleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    // Explorez la structure de l'objet action :
    // console.log('propagateSocketMiddleware', action)
    // socket.emit('action', action)
    // verifie si on propage l'action.
    console.log('peer : ', peer)
    if (peer !== undefined && peer !== null) {
      // if (action.meta.propagate) {
      // JSON doit etre  serialise avec JSON.stringify(objet)
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
      // }
    } else {
      console.log('peer not found')
    }

    // Après diffusion au serveur on fait suivre l'action au prochain middleware
    next(action)
  }

socket.on('peer', (data: { peerId: string; initiator: boolean }) => {
  console.log('peer receive', data)
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

  console.log(' function socket.on(peer : ', peer)

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
    // vous pouvez essayer d'envoyer des donnees au pair avec send("hello") pour voir si ça marche - DONE
    peer.send('Hello, je suis : ' + socket.id)

    const action = {
      type: 'connexion',
      // store.getstate obligatoire car la version hooks ne marche pas.
      // erreur => Error: Minified React error
      playerAvatar: store.getState().playerAvatar,
      playerPosition: store.getState().playerPosition,
    }

    peer.send(JSON.stringify(action))
  })

  peer.on('data', function (data) {
    console.log('Received data from peer:' + data)
    // les donnees arrivent sous forme de string,
    // si le string est un objet JSON serialise avec JSON.stringify(objet)
    // JSON.parse(string) permet de reconstruire l'objet
    let restructuredData
    try {
      restructuredData = JSON.parse(data)
    } catch (e) {
      restructuredData = data
    }
    // TODO take action after receiving data from peer
    // switch (restructuredData.type) {
    //   case 'board/movePlayer':
    //     store.dispatch(
    //       movePlayer([restructuredData.payload[0], 'remote'], false)
    //     )
    //     break
    //   case 'board/setAvatar':
    //     store.dispatch(
    //       setAvatar([restructuredData.payload[0], 'remote'], false)
    //     )
    //     break
    //   case 'connexion':
    //     // type: 'connexion',
    //     // playerAvatar: playerAvatar,
    //     // playerPosition: playerPosition,
    //     store.dispatch(
    //       movePlayer([restructuredData.playerPosition, 'remote'], false)
    //     )
    //     store.dispatch(
    //       setAvatar([restructuredData.playerAvatar, 'remote'], false)
    //     )
    // }
  })
  peer.on('stream', (stream): void => {
    //   TP suivant 3.3
    console.log('got stream ' + stream)
  })

  // TODO ajouter ce peer à une liste de tous les pairs auxquels vous êtes connecté
})
