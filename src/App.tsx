import React from 'react'
import Player from './player'
import { OnlyClip, OnlyPlaylist, PlayerConfig } from './player/types/types'
import hosted_file from './data/hosted_file.json'
import playlist_json from './data/playlist.json'
import with_chapters from './data/with_chapters.json'
import without_chapters from './data/without_chapters.json'

export default function App() {
  const hosted: PlayerConfig = { ...hosted_file, mode: 'clip' }
  const withChapters: PlayerConfig = { ...with_chapters, mode: 'clip' }
  const withoutChapters: PlayerConfig = { ...without_chapters, mode: 'clip' }
  const playlist: PlayerConfig = { ...playlist_json, mode: 'playlist' }

  return (
    <div>
      <Player {...withChapters} />
      <Player {...hosted} />
      <Player {...withoutChapters} />
      <Player {...playlist} />
    </div>
  )
}
