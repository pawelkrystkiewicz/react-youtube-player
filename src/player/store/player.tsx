import create from 'zustand'
import { devtools, redux } from 'zustand/middleware'
import config from '../config'
import { PlayerState } from '../types/types'
import { Action, ActionType } from './types'

function playerReducer(state: PlayerState, action: Action): PlayerState {
  let update: Partial<PlayerState> = {}
  const muted = { volume: 0 }
  const unmuted = { volume: !!state.prevVolume ? state.prevVolume : config.INITIAL_STATE.volume }

  switch (action.type) {
    case ActionType.DURATION:
      update = action.payload
      break
    case ActionType.PROGRESS:
      update = action.payload

      if (!state.seeking) {
        update.current = update.played
        /*
         When seeking we want progress indicator to follow user input
         When playing we update this with actual played % value
        */
      }

      // if (media.mode === 'playlist') {
      //   onProgressPlaylist(progress.playedSeconds)
      // }

      break
    case ActionType.PLAY:
      update = { playing: true }
      break
    case ActionType.BUFFERING_START:
      update = { buffering: true }
      break
    case ActionType.BUFFERING_END:
      update = { buffering: false }
      break
    case ActionType.SEEKER_CHANGE:
      update = action.payload
      break
    case ActionType.SEEKER_CHANGE_START:
      update = { seeking: true, playing: false, ...action.payload }
      break
    case ActionType.SEEKER_CHANGE_END:
      update = { seeking: false, playing: true }
      break
    case ActionType.TOGGLE_PLAY:
      update = { playing: !state.playing }
      break
    case ActionType.TOGGLE_MUTE:
      update = !!state.volume ? muted : unmuted
      break
    case ActionType.VOLUME_CHANGE:
      if (action.payload.volume >= 0 && action.payload.volume <= 1) {
        update = action.payload
      }
      break
    case ActionType.VOLUME_UP:
      const louder = state.volume + config.VOLUME_STEP
      if (louder <= 1) {
        update = { volume: louder, prevVolume: state.volume }
      }
      break
    case ActionType.VOLUME_DOWN:
      const quieter = state.volume - config.VOLUME_STEP
      if (quieter <= 1) {
        update = { volume: quieter, prevVolume: state.volume }
      }
      break
    case ActionType.TITLE:
      update = action.payload
      break
    case ActionType.ERROR:
      update = action.payload
      break
    default:
      break
  }

  return { ...state, ...update }
}

export const useStore = create(
  // Connects store to devtools
  // Without reducers and action-types you would see "setState" logged out instead
  devtools(
    // Transforms our store into a redux action dispatcher ...
    // Adds a dispatch method to the store as well as to the api
    redux(playerReducer, config.INITIAL_STATE),
  ),
)

export const api = useStore as typeof useStore & {
  dispatch: (action: Action) => Action
}
