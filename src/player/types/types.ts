import ReactPlayer from 'react-player'
import { Direction } from 'react-player-controls'

export type PlayerProgress = {
  playedSeconds: number
  loadedSeconds: number
  played: number
  loaded: number
  current?: number
}

export type PlayerState = PlayerProgress & {
  current: number
  duration: number
  playing: boolean
  controls: boolean
  muted: boolean
  playbackRate: number
  volume: number
  prevVolume: number
  loop: boolean
  seeking: boolean
  buffering: boolean
  title?: string
  url?: string
  error?: string
  fullscreen: boolean
  settings: boolean
  ref?: React.RefObject<ReactPlayer> | null
}

export type Marks = { [key: number]: string }

export type PlayerConfig = OnlyClip | OnlyPlaylist

export enum MediaMode {
  CLIP = 'clip',
  PLAYLIST = 'playlist',
}

export interface PlayerProps {
  clip: MediaClip
  playlist?: null
  mode: MediaMode.CLIP
}

export interface OnlyClip {
  clip: MediaClip
  playlist?: null
  mode: MediaMode.CLIP
}

export interface OnlyPlaylist {
  clip?: null
  playlist: MediaPlaylist
  mode: MediaMode.PLAYLIST
}

export type MediaFragment = {
  cover?: string
  backdrop?: string
  title: string
  tags: string[]
  duration: string
}
export type OptionalChapters = {
  chapters?: Chapter[]
}

export type MediaClip = MediaFragment &
  OptionalChapters & {
    sources: PlayerSource[]
  }

export type MediaPlaylist = Omit<MediaFragment, 'duration'> & {
  clips: PlaylistClip[]
}

export type PlaylistClip = Omit<MediaFragment, 'backdrop'> &
  OptionalChapters & {
    order: number
    sources: PlayerSource[]
  }

export type Chapter = {
  title: string
  start: number
  end: number
}

export type MeasuredChapter = Chapter & { runtime: number; size: number }

export type SliderCommonProps = {
  value: number
  background?: string
  direction?: Direction
  z?: number
}

export type PlayerSource = {
  type: string
  url: string
  providerId: string
}

export type CurrentSource = {
  url: string
  orderId: number
  providerId: string
  duration: string
}
