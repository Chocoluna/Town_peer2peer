import React, { useEffect, useRef, useState } from 'react'
import store from '../store/index'
import { setStream, removeStream } from '../slices/board-slice'
import { useAppSelector } from '../hooks'

function VideoChat() {
  const [startAvailable, setStart] = useState(true)
  const [callAvailable, setCall] = useState(false)
  const [hangupAvailable, setHangup] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // get the video stream
  const start = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(gotStream)
      .catch((e) => {
        console.log(e)
        alert('getUserMedia() error:' + e.name)
      })
  }

  const call = () => {
    // TODO voir la doc de simple-peer
    // vous pouvez passer par un dispatch pour gérer ça dans le middleware
    if (callAvailable) {
      setCall(false)
      setHangup(true)
    }
  }

  const hangup = () => {
    setCall(true)
    setHangup(false)
    store.dispatch(removeStream(null, false))
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
  }

  const gotStream = (stream: MediaStream | null) => {
    if (stream) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream // on injecte le flux vidéo local dans l'element video qui a pour ref 'localVideoRef'
        store.dispatch(setStream([stream, 'local'], true)) // sera utile plus tard pour avoir accès au flux dans le middleware
      }
    } else {
      console.error("Impossible d'obtenir le flux vidéo.")
    }
  }

  const gotRemoteStream = (remoteStream: MediaProvider | null) => {
    const remoteVideo = remoteVideoRef.current
    if (remoteVideo) {
      if (remoteVideo.srcObject !== remoteStream) {
        remoteVideo.srcObject = remoteStream
      }
    }
  }

  return (
    <div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          // style=
        >
          <track kind="captions" srcLang="en" label="english_captions" />
        </video>
        <video
          ref={remoteVideoRef}
          autoPlay
          // style=
        >
          <track kind="captions" srcLang="en" label="english_captions" />
        </video>
      </div>
      <div>
        <button onClick={start} disabled={!startAvailable}>
          Start
        </button>
        <button onClick={call} disabled={!callAvailable}>
          Call
        </button>
        <button onClick={hangup} disabled={!hangupAvailable}>
          HangUp
        </button>
      </div>
    </div>
  )
}
export default VideoChat
