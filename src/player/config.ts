import { ReactPlayerProps } from 'react-player'
import { CurrentSource, PlayerState } from './types/types'

type Config = {
  INITIAL_STATE: PlayerState
  VOLUME_STEP: number
  REWIND_STEP: number
  PROVIDERS_PREFERENCE: string[]
  STATIC_PLAYER_CONFIG: Partial<ReactPlayerProps>
  INITIAL_SOURCE: CurrentSource
}

const config: Config = {
  PROVIDERS_PREFERENCE: ['yt', 'vimeo', 'soundcloud', 'file'],
  VOLUME_STEP: 0.05,
  REWIND_STEP: 5,
  INITIAL_STATE: {
    loadedSeconds: 0,
    playedSeconds: 0,
    loaded: 0,
    played: 0,
    current: 0,
    duration: 0,
    volume: 1,
    prevVolume: 1,
    playbackRate: 1,
    buffering: false,
    seeking: false,
    playing: false,
    controls: false,
    muted: false,
    loop: false,
    fullscreen: false,
    settings: false,
  },
  STATIC_PLAYER_CONFIG: {
    style: { pointerEvents: 'none' },
    stopOnUnmount: true,
    youtube: {
      embedOptions: {},
      playerVars: {
        controls: 0,
        showInfo: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
      },
    },
  },
  INITIAL_SOURCE: {
    orderId: 0,
    providerId: 'unknown',
    duration: '0:00',
    url: '',
  },
}

export default config
