import React from 'react'
import Player from './components/player'
import { OnlyClip, OnlyPlaylist } from './components/player/types/types'
import videos from './data/videos.json'

export default function App() {
  const videoYT: OnlyClip = { ...videos.youtube, __mode: 'clip' }
  const videoMP4: OnlyClip = { ...videos.mp4, __mode: 'clip' }
  const videoYTNoChapters: OnlyClip = {
    ...videos.youtube_without_chapters,
    __mode: 'clip',
  }
  const playlist: OnlyPlaylist = { ...videos.playlist, __mode: 'playlist' }
  return (
    <div>
      <Player {...videoYT} />
      <Player {...videoMP4} />
      <Player {...videoYTNoChapters} />
      <Player {...playlist} />
    </div>
  )
}
