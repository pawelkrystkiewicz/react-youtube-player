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
  ref?: React.RefObject<ReactPlayer> | null
}

export type Marks = { [key: number]: string }

export type PlayerConfig = OnlyClip | OnlyPlaylist

export interface PlayerProps {
  clip: MediaClip
  playlist?: null
  mode: 'clip'
}

export interface OnlyClip {
  clip: MediaClip
  playlist?: null
  mode: 'clip'
}

export interface OnlyPlaylist {
  clip?: null
  playlist: MediaPlaylist
  mode: 'playlist'
}

export type MediaFragment = {
  cover?: string
  backdrop?: string
  title: string
  tags: string[]
}

export type MediaClip = MediaFragment & {
  chapters?: Chapter[]
  sources: MediaSource[]
}

export type MediaPlaylist = MediaFragment & {
  clips: PlaylistClip[]
}

export type PlaylistClip = {
  title: string
  start: number
  end: number
  order: number
  cover?: string
  chapters?: Chapter[]
  sources: MediaSource[]
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

export type MediaSource = {
  providerId: string
  url: string
  type: string
}

export type CurrentSource = {
  url: string
  orderId: number
  providerId: string
}
