import create from 'zustand'
import config from '../config'
import { isBetween0And1 } from '../helper'
import { PlayerProgress } from '../types/types'
import { PlayerStore, SeekInVideoType } from './player.model'

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  ...config.INITIAL_STATE,
  ref: null,
  setPlayerRef: (ref) => set((state) => ({ ...state, ref })),
  onProgress: (progress: PlayerProgress) => {
    let update = progress
    /*
       When seeking we want progress indicator to follow user input
       When playing we update this with actual played % value
      */

    !get().seeking && (update.current = progress.played)
    set((state) => ({ ...state, ...update }))
  },
  onBuffer: () => set({ buffering: true }),
  onDuration: (duration) => set({ duration }),
  onBufferEnd: () => set({ buffering: false }),
  onSeekerChange: (current: number) => set({ current }),
  onSeekerChangeStart: (current: number) =>
    set({ current, seeking: true, playing: false }),
  onSeekerChangeEnd: () => {
    get().seekTo(get().current, 'fraction')
    set({ seeking: false, playing: true })
  },
  togglePlay: () => set({ playing: !get().playing }),
  toggleMute: () => {
    const muted = { volume: 0 }
    const unmuted = {
      volume: !!get().prevVolume
        ? get().prevVolume
        : config.INITIAL_STATE.volume,
    }
    const update = !!get().volume ? muted : unmuted
    set({ ...update })
  },
  toggleFullscreen: () => set({ fullscreen: !get().fullscreen }),
  volumeChange: (volume: number) =>
    isBetween0And1(volume) && set(() => ({ volume, prevVolume: volume })),
  volumeUp: () => {
    const volume = get().volume
    const louder = volume + config.VOLUME_STEP
    isBetween0And1(louder) &&
      set(() => ({ volume: louder, prevVolume: volume }))
  },
  volumeDown: () => {
    const volume = get().volume
    const quieter = volume - config.VOLUME_STEP
    isBetween0And1(quieter) &&
      set(() => ({ volume: quieter, prevVolume: volume }))
  },
  setTitle: (title: string) => set({ title }),
  setError: (error: string) => set({ error }),
  clearError: () => set({ error: undefined }),
  seekTo: (secondsOrPercent: number, type: SeekInVideoType = 'seconds') => {
    const playerRef = get().ref

    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(secondsOrPercent, type)
    }
  },
  setPlaybackRate: (playbackRate: number): void => {
    isBetween0And1(playbackRate) && set({ playbackRate })
  },
}))
