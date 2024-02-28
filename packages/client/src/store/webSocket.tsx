import { Action, Dispatch, Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { io } from 'socket.io-client'

const socket = io()
const useTrickle = true

socket.on('peer', (data) => {
  const peerId = data.peerId
  const initiator = data.initiator

  const peer: SimplePeer.Instance = new SimplePeer({
    initiator: initiator,
    trickle: useTrickle, // useTrickle doit être a true pour que le peer persiste - DONE
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
      ],
    },
  })

  // TODO ajouter tous les listeners au peer,

  socket.on('signal', function (data) {
    console.log('received signal on socket')
    // TODO propagate signal from socket to peer
  })

  peer.on('signal', function (data) {
    console.log('Advertising signaling data' + data + 'to Peer ID:' + peerId)
    // TODO propagate signal from peer to socket
  })
  peer.on('error', function (e) {
    console.log('Error sending connection to peer :' + peerId + e)
  })
  peer.on('connect', function () {
    console.log('Peer connection established')
    // vous pouvez essayer d'envoyer des donnees au pair avec send("hello") pour voir si ça marche
  })
  peer.on('data', function (data) {
    console.log('Received data from peer:' + data)
    // les donnees arrivent sous forme de string,
    // si le string est un objet JSON serialise avec JSON.stringify(objet)
    // JSON.parse(string) permet de reconstruire l'objet
    const restructuredData = JSON.parse(data)
    // TODO take action after receiving data from peer
  })
  peer.on('stream', (stream): void => {
    //   TP suivant 3.3
    console.log('got stream ' + stream)
  })

  // TODO ajouter ce peer à une liste de tous les pairs auxquels vous êtes connecté
})
