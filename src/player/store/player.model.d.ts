import ReactPlayer from 'react-player'
import { PlayerProgress, PlayerState } from '../types/types'

export type SeekInVideoType = 'seconds' | 'fraction'

export type PlayerFunctions = {
  onProgress: (progress: PlayerProgress) => void
  onDuration: (duration: number) => void
  onBuffer: () => void
  onBufferEnd: () => void
  onSeekerChange: (current: number) => void
  onSeekerChangeStart: (current: number) => void
  onSeekerChangeEnd: () => void
  togglePlay: () => void
  toggleMute: () => void
  toggleFullscreen: () => void
  volumeChange: (volume: number) => void
  volumeUp: () => void
  volumeDown: () => void
  setTitle: (title: string) => void
  setError: (error: string) => void
  clearError: () => void
  setPlayerRef: (ref: React.RefObject<ReactPlayer> | null) => void
  setPlaybackRate: (playbackRate: number) => void
  seekTo: (position: number, type: SeekInVideoType) => void
}

export type PlayerStore = PlayerState & PlayerFunctions
