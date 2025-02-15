import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useAppSelector } from '../hooks'
import { setAvatar } from '../slices/board-slice'
import alex from '@/img/Alex.png'
import bob from '@/img/Bob.png'
import adam from '@/img/Adam.png'
import amelia from '@/img/Amelia.png'
import { useCallback } from 'react'

export const AvatarPicker: React.FC = () => {
  const playerAvatar: string = useAppSelector((state) => state.playerAvatar)

  const dispatch = useDispatch<AppDispatch>()

  const avatarSelected: React.MouseEventHandler = useCallback(
    (event) => {
      console.log(event)
      const name = event.currentTarget.id
      dispatch(setAvatar([name, 'local'], true))
    },
    [playerAvatar]
  )

  return (
    <div
      className="card-compact mt-4 my-2 w-48 h-8 items-center"
      id="avatarList"
    >
      <h2 className="card-title">Pick an Avatar !</h2>
      <div
        className="card-body flex flex-row space-x-2 items-center"
        style={{ backgroundColor: 'revert-layer' }}
      >
        <button
          id="Adam"
          onClick={avatarSelected}
          className={playerAvatar === 'Adam' ? 'selected' : ''}
        >
          <img className="m-1" src={adam}></img>
        </button>
        <button
          id="Alex"
          onClick={avatarSelected}
          className={playerAvatar === 'Alex' ? 'selected' : ''}
        >
          <img className="m-1" src={alex}></img>
        </button>
        <button
          id="Amelia"
          onClick={avatarSelected}
          className={playerAvatar === 'Amelia' ? 'selected' : ''}
        >
          <img className="m-1" src={amelia}></img>
        </button>
        <button
          id="Bob"
          onClick={avatarSelected}
          className={playerAvatar === 'Bob' ? 'selected' : ''}
        >
          <img className="m-1" src={bob}></img>
        </button>
      </div>
    </div>
  )
}
