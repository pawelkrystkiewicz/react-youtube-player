import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'
import ChaptersList from './ChaptersList'
import config from './config'
import Controls from './Controls'
import {
  formattedTimeToSeconds,
  getCurrentChapter,
  getPlaylistClipByOrderId,
  getValidSource,
  measureChapters,
} from './helper'
import { PlaylistList } from './PlaylistList'
import SeekerBar from './SeekerBar'
import Settings from './Settings'
import { handleKeyboardShortcut } from './shortcuts'
import { usePlayerStore } from './store/player.store'
import { CurrentSource, MediaMode, PlayerConfig } from './types/types'
import { PlayerContainer } from './ui/Container'
import * as PlayerUI from './ui/PlayerUI'
import SettingsModal from './SettingsModal'

const Player = (media: PlayerConfig) => {
  const playerRef = useRef<ReactPlayer>(null)
  const fpsRef = useRef<any>(null)

  const [source, setSource] = useState<CurrentSource>(config.INITIAL_SOURCE)
  const [lastSourceId, setLastSourceId] = useState<number>(1)

  const state = usePlayerStore()

  useEffect(() => {
    state.setPlayerRef(playerRef)
    initSource()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let lastCalledTime = Date.now()
    let fps = 0
    function renderLoop() {
      let delta = (Date.now() - lastCalledTime) / 1000
      lastCalledTime = Date.now()
      fps = 1 / delta
      if (fpsRef.current) {
        fpsRef.current.innerText = 'fps ' + fps.toFixed()
      }
      requestAnimationFrame(renderLoop)
    }
    renderLoop()
    // eslint-disable-next-line
  }, [])

  const onEnded = () => {
    console.log('ended')
    if (media.mode === MediaMode.PLAYLIST) {
      hasNext && playlistNext()
    }
  }

  /* CONFIG react-player */
  const playerConfig: Partial<ReactPlayerProps> = {
    ...config.STATIC_PLAYER_CONFIG,
    ref: playerRef,
    fallback: <span>Loading...</span>,
    onProgress: state.onProgress,
    onBuffer: state.onBuffer,
    onBufferEnd: state.onBufferEnd,
    onDuration: state.onDuration,
    onEnded,
  }

  // PLAYLIST FEATURES
  const hasNext = source.orderId < lastSourceId
  const hasPrev = source.orderId > 1
  const playlistGoTo = (orderId: number) => setValidSourceOrError(orderId)
  const playlistNext = () => hasNext && playlistGoTo(source!.orderId + 1)
  const playlistPrev = () => hasPrev && playlistGoTo(source!.orderId - 1)

  // SOURCE HANDLING
  const initSource = () => {
    setValidSourceOrError(1)
    media.mode === MediaMode.PLAYLIST &&
      setLastSourceId(media.playlist!.clips.length - 1)
  }

  const setValidSourceOrError = (orderId: number) => {
    if (!media) return
    const clip =
      media.mode === MediaMode.CLIP
        ? media.clip!
        : getPlaylistClipByOrderId(media.playlist!, orderId)

    const firstValidSource = getValidSource(clip.sources)

    if (firstValidSource) {
      setSource({
        orderId,
        providerId: firstValidSource.providerId,
        url: firstValidSource.url,
        duration: clip.duration,
      })
    } else {
      state.setError('Could not load source. Please contact support')
    }
  }

  const chapters = measureChapters(state.duration, media.clip?.chapters)
  const currentChapter = getCurrentChapter(chapters, state.playedSeconds)
  const onKeyDownCapture = handleKeyboardShortcut(state)

  return (
    <PlayerContainer onKeyDownCapture={onKeyDownCapture} tabIndex={0}>
      <div ref={fpsRef} className="fps" />
      <h2>{state.title}</h2>

      <PlayerUI.Body onMouseLeave={state.hideSettings}>
        <PlayerUI.ClickCatcher onClick={state.togglePlay}>
          <ReactPlayer
            {...playerConfig}
            url={source?.url ?? ''}
            playing={state.playing}
            controls={state.controls}
            playbackRate={state.playbackRate}
            volume={state.volume}
            muted={state.muted}
            config={playerConfig.config}
          />
        </PlayerUI.ClickCatcher>
        <PlayerUI.Container>
          {state.settings && <SettingsModal />}
          <SeekerBar
            chapters={chapters}
            duration={formattedTimeToSeconds(source.duration)}
          />
          <PlayerUI.ControlPanel>
            <Controls
              duration={source.duration}
              currentChapter={currentChapter}
              hasNext={hasNext}
              hasPrevious={hasPrev}
              next={playlistNext}
              previous={playlistPrev}
            />
            <Settings />
          </PlayerUI.ControlPanel>
        </PlayerUI.Container>
      </PlayerUI.Body>
      {state.error && (
        <PlayerUI.ErrorMessage>{state.error}</PlayerUI.ErrorMessage>
      )}
      {chapters && <ChaptersList chapters={chapters} />}
      {media.mode === MediaMode.PLAYLIST && (
        <PlaylistList
          clips={media.playlist.clips}
          onClick={playlistGoTo}
          source={source}
        />
      )}
    </PlayerContainer>
  )
}

export default Player
