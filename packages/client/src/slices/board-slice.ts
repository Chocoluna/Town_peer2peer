import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AppState {
  playerPosition: [number, number]
  playerAvatar: string
  remotePlayerPosition: [number, number]
  remotePlayerAvatar: string
  board: {
    width: number
    height: number
    tiles: Tile[]
  }
  localStream: MediaStream | null
  remoteStream: MediaStream | null
}

// Define the initial state using that type
const initialState: AppState = {
  playerPosition: [10, 24],
  playerAvatar: '',
  remotePlayerPosition: [0, 0],
  remotePlayerAvatar: '',
  board: {
    width: 60,
    height: 60,
    tiles: [], // unused for now, could be useful for collision management
  },
  localStream: null,
  remoteStream: null,
}

export const boardSlice = createSlice({
  name: 'board',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    movePlayer: {
      reducer(state, action: PayloadAction<[[number, number], string]>) {
        console.log(action)
        switch (action.payload[1]) {
          case 'local':
            state.playerPosition = action.payload[0]
            break
          case 'remote':
            state.remotePlayerPosition = action.payload[0]
            break
        }
      },
      prepare(payload: [[number, number], string], propagate: boolean) {
        return { payload, meta: { propagate } }
      },
    },
    setAvatar: {
      reducer(state, action: PayloadAction<[string, string]>) {
        console.log(action)
        if (action.payload[1] === 'local') {
          state.playerAvatar = action.payload[0]
        }
        if (action.payload[1] === 'remote') {
          state.remotePlayerAvatar = action.payload[0]
        }
      },
      prepare(payload: [string, string], propagate: boolean) {
        return { payload, meta: { propagate } }
      },
    },
    setHeight: {
      reducer(state, action: PayloadAction<[string, string]>) {
        console.log(action)
        //TODO?
      },
      prepare(payload: [string, string], propagate: boolean) {
        return { payload, meta: { propagate } }
      },
    },
    setWidth: {
      reducer(state, action: PayloadAction<[string, string]>) {
        console.log(action)
        //TODO?
      },
      prepare(payload: [string, string], propagate: boolean) {
        return { payload, meta: { propagate } }
      },
    },
    setStream: {
      reducer(state, action: PayloadAction<[MediaStream, string]>) {
        console.log('payload ' + JSON.stringify(action.payload[0]))
        if (action.payload[1] === 'local') {
          state.localStream = action.payload[0]
        }
        if (action.payload[1] === 'remote') {
          state.remoteStream = action.payload[0]
        }
      },
      prepare(payload: [MediaStream, string], propagate: boolean) {
        return { payload, meta: { propagate } }
      },
    },
    removeStream: {
      reducer(state) {
        state.localStream = null
        state.remoteStream = null
      },
      prepare(payload: MediaStream | null = null, propagate: boolean = true) {
        return { payload, meta: { propagate } }
      },
    },
  },
})

export const {
  movePlayer,
  setAvatar,
  setHeight,
  setWidth,
  setStream,
  removeStream,
} = boardSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.slidesApp.value

export default boardSlice.reducer
