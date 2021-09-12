import React, { useCallback } from 'react'
import FormattedTime from './FormattedTime'
import { isCurrentInChapterRange } from './helper'
import { usePlayerStore } from './store/player.store'
import * as Chapters from './ui/ChapterList'

const ChapterList = ({ chapters }) => {
  return (
    <Chapters.List>
      {chapters.map(chapter => (
        <Entry chapter={chapter} />
      ))}
    </Chapters.List>
  )
}

const Entry = ({ chapter }) => {
  const { playedSeconds, seekTo } = usePlayerStore(state => ({ playedSeconds: state.playedSeconds, seekTo: state.seekTo }))
  const { start, title } = chapter

  const goToChapterCallback = useCallback(() => seekTo(start, 'seconds'), [start, seekTo])
  const isCurrent = isCurrentInChapterRange(playedSeconds)(chapter)

  return (
    <Chapters.Row>
      <Chapters.Timestamp onClick={goToChapterCallback} showMarker={isCurrent}>
        <FormattedTime seconds={start} />
      </Chapters.Timestamp>
      <Chapters.Title>{title}</Chapters.Title>
    </Chapters.Row>
  )
}

export default ChapterList
