import React, { useEffect, useRef, useState } from 'react'
import store from '../store/index'
import { setStream, removeStream } from '../slices/board-slice'
import { useAppSelector } from '../hooks'

function VideoChat() {
  const [startAvailable, setStart] = useState(true)
  const [callAvailable, setCall] = useState(true)
  const [hangupAvailable, setHangup] = useState(false)
  const [callActive, setCallActive] = useState(false) // state to check if the call is active

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
    if (callAvailable) {
      start()
      setCallActive(true)
      setCall(false)
      setHangup(true)
    }
  }

  const hangup = () => {
    setCall(true)
    setHangup(false)
    setCallActive(false)
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

  ///////////////
  //// hooks ////
  ///////////////
  const remoteStream: MediaStream = useAppSelector(
    (state) => state.remoteStream
  )!

  useEffect(() => {
    //called if the value of remoteStream changes
    gotRemoteStream(remoteStream)
  }, [remoteStream])

  const playerPosition: [number, number] = useAppSelector(
    (state) => state.playerPosition
  )

  const remotePlayerPosition: [number, number] = useAppSelector(
    (state) => state.remotePlayerPosition
  )

  const playerAvatar: string = useAppSelector((state) => state.playerAvatar)

  const remotePlayerAvatar: string = useAppSelector(
    (state) => state.remotePlayerAvatar
  )

  ////////////////////
  //////DISTANCE//////
  ////////////////////

  const diffX = (
    playerPosition: [number, number],
    remotePlayerPosition: [number, number]
  ) => {
    return Math.abs(playerPosition[0] - remotePlayerPosition[0])
  }

  const diffY = (
    playerPosition: [number, number],
    remotePlayerPosition: [number, number]
  ) => {
    return Math.abs(playerPosition[1] - remotePlayerPosition[1])
  }

  const distance = () => {
    return (
      diffX(playerPosition, remotePlayerPosition) +
      diffY(playerPosition, remotePlayerPosition)
    )
  }

  // useEffect hook to trigger actions based on changes in player and remote player positions
  useEffect(() => {
    if (distance() < 3) {
      if (callAvailable && playerAvatar != '' && remotePlayerAvatar != '') {
        // Call function if available and players are within 2 squares or less
        call()
      }
    } else if (distance() > 4) {
      if (hangupAvailable) {
        // Hangup function if available and players are 5 squares apart or more
        hangup()
      }
    }
  }, [
    playerPosition,
    remotePlayerPosition,
    callAvailable,
    hangupAvailable,
    callActive,
  ])

  return (
    <div>
      {callActive && (
        <div>
          <div className="relative">
            <video
              className="block mx-auto border-2 border-gray-900 rounded-md w-96 z-10"
              ref={remoteVideoRef}
              autoPlay
            >
              <track kind="captions" srcLang="en" label="english_captions" />
            </video>
            <video
              className="block absolute bottom-0 right-0 border-2 border-gray-900 rounded-md w-32 z-20 mask mask-hexagon-2"
              src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"
              ref={localVideoRef}
              autoPlay
              muted
            >
              <track kind="captions" srcLang="en" label="english_captions" />
            </video>
          </div>
        </div>
      )}
    </div>
  )
}
export default VideoChat
