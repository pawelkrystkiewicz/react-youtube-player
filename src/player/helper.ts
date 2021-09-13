import ReactPlayer from 'react-player'
import config from './config'
import {
  Chapter,
  Marks,
  MeasuredChapter,
  MediaPlaylist,
  PlayerSource,
  PlaylistClip,
} from './types/types'

export const formatDuration = (seconds: number): string => {
  const formatted = new Date(seconds * 1000)
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/)
  return formatted ? formatted[0] : seconds.toString()
}

const padZero = (digit: number): string => `${digit < 10 ? '0' : ''}${digit}`

export const getFormattedTime = (numSeconds: number | string): string => {
  const prefix = numSeconds < 0 ? '-' : ''
  const absNumSeconds = Math.abs(Number(numSeconds))

  const hours = Math.floor(absNumSeconds / 3600)
  const minutes = Math.floor((absNumSeconds % 3600) / 60)
  const seconds = Math.floor(absNumSeconds) % 60

  return hours > 0
    ? `${prefix}${hours}:${padZero(minutes)}:${padZero(seconds)}`
    : `${prefix}${minutes}:${padZero(seconds)}`
}

export const formattedTimeToSeconds = (formatted: string): number => {
  const time = formatted.split(':').reverse()
  const fromSeconds = Number(time[0])
  const fromMinutes = Number(time[1] ?? 0) * 60
  const fromHours = Number(time[2] ?? 0) * 3600

  return fromSeconds + fromMinutes + fromHours
}

export const toInt = (n: number): number => Math.trunc(n)

export const createChapterMarks = (chapters: Chapter[]): Marks => {
  let marks = {}
  chapters.forEach(
    ({ start, title }) => (marks[start] = title.substring(0, 10) + '...')
  )
  return marks
}

export const toProgressPercent = (progress: number): number =>
  Number((progress * 100).toFixed(4))

export const isCurrentInChapterRange =
  (current: number) =>
  (chapter: Chapter): boolean =>
    current >= chapter.start && current < chapter.end

export const getCurrentChapter = (
  chapters: Chapter[],
  current: number
): Chapter => {
  const comparator = isCurrentInChapterRange(current)
  return chapters.filter(comparator)[0]
}

export const measureChapters = (
  duration: number,
  chapters?: Chapter[]
): MeasuredChapter[] =>
  chapters
    ? chapters.map((chapter) => {
        const runtime = chapter.end - chapter.start
        return {
          ...chapter,
          runtime,
          size: +(runtime / duration).toPrecision(2),
        }
      })
    : []

export const getValidSource = (
  sources: PlayerSource[]
): PlayerSource | undefined =>
  sources
    .sort(
      (a, b) =>
        config.PROVIDERS_PREFERENCE.indexOf(a.providerId) -
        config.PROVIDERS_PREFERENCE.indexOf(b.providerId)
    )
    .find(({ url }) => ReactPlayer.canPlay(url))

export const getPlaylistClipByOrderId = (
  playlist: MediaPlaylist,
  orderId: number
): PlaylistClip => playlist.clips.filter(({ order }) => order === orderId)[0]

export const isBetween0And1 = (n: number): boolean => n >= 0 && n <= 1
