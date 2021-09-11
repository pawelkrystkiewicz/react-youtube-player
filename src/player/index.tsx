import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'
import ChaptersList from './ChaptersList'
import config from './config'
import Controls from './Controls'
import { getCurrentChapter, measureChapters } from './helper'
import { PlaylistList } from './PlaylistList'
import SeekerBar from './SeekerBar'
import Settings from './Settings'
import { KeyCode } from './shortcuts'
// import { useStore, api } from './store/player'
import { useStore } from './store/store.player'
import { CurrentSource, MediaClip, MediaPlaylist, MediaSource, PlayerConfig, PlaylistClip } from './types/types'
import { PlayerContainer } from './ui/Container'
import * as PlayerUI from './ui/PlayerUI'
const { REWIND_STEP } = config

const Player = (media: PlayerConfig) => {
  const playerRef = useRef<ReactPlayer>(null)
  const fpsRef = useRef<any>(null)
  const [source, setSource] = useState<CurrentSource | null>(null)
  const state = useStore()

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
  }, [])

  useEffect(() => {
    state.setPlayerRef(playerRef)
  }, [])

  /* PROGRESS BAR functions  */
  const handleSeekerChange = (current: number): void => state.onSeekerChange(current)
  const handleSeekerChangeStart = (current: number): void => state.onSeekerChangeStart(current)
  const handleSeekerChangeEnd = (): void => state.onSeekerChangeEnd()

  // const setPlaybackRate = (playbackRate): void => setState({ ...state, playbackRate })
  type SeekInVideoType = 'seconds' | 'fraction'

  /* POSITION */
  const seekToSeconds = (secondsOrPercent: number, type: SeekInVideoType = 'seconds') => {
    playerRef.current && playerRef.current.seekTo(secondsOrPercent, type)
  }

  /* KEYBOARD HANDLER*/
  const handleKeyboardShortcut = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    switch (e.code) {
      case KeyCode.Space:
        state.togglePlay()
        break
      case KeyCode.ArrowUp:
        state.volumeUp()
        break
      case KeyCode.ArrowDown:
        state.volumeDown()
        break
      case KeyCode.ArrowLeft:
        state.seekTo(state.playedSeconds - REWIND_STEP, 'seconds')
        break
      case KeyCode.ArrowRight:
        state.seekTo(state.playedSeconds + REWIND_STEP, 'seconds')
        break
      case KeyCode.F:
        console.log('toggleFullscreen')
        break
      case KeyCode.M:
        state.toggleMute()
        break
      case KeyCode.K:
        state.togglePlay()
        break
      case KeyCode.Home:
      case KeyCode.Digit0 || KeyCode.Numpad0:
        state.seekTo(0, 'fraction')
        break
      case KeyCode.End:
        state.seekTo(1, 'fraction')
        break
      case KeyCode.Digit1 || KeyCode.Numpad1:
        state.seekTo(0.1, 'fraction')
        break
      case KeyCode.Digit2 || KeyCode.Numpad2:
        state.seekTo(0.2, 'fraction')
        break
      case KeyCode.Digit3 || KeyCode.Numpad3:
        state.seekTo(0.3, 'fraction')
        break
      case KeyCode.Digit4 || KeyCode.Numpad4:
        state.seekTo(0.4, 'fraction')
        break
      case KeyCode.Digit5 || KeyCode.Numpad5:
        state.seekTo(0.5, 'fraction')
        break
      case KeyCode.Digit6 || KeyCode.Numpad6:
        state.seekTo(0.6, 'fraction')
        break
      case KeyCode.Digit7 || KeyCode.Numpad7:
        state.seekTo(0.7, 'fraction')
        break
      case KeyCode.Digit8 || KeyCode.Numpad8:
        state.seekTo(0.8, 'fraction')
        break
      case KeyCode.Digit9 || KeyCode.Numpad9:
        state.seekTo(0.9, 'fraction')
        break
      default:
        console.log('keyboard handler: exited without action')
        break
    }
  }

  /* CONFIG react-player */
  const playerConfig: Partial<ReactPlayerProps> = {
    style: { pointerEvents: 'none' },
    ref: playerRef,
    fallback: <span>Loading...</span>,
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
    onProgress: state.onProgress,
    onDuration: state.onDuration,
    onBuffer: state.onBuffer,
    onBufferEnd: state.onBufferEnd,
  }

  /* SOURCE HANDLING */
  const getValidSource = (sources: MediaSource[]): MediaSource | undefined =>
    sources
      .sort(
        (a, b) => config.PROVIDERS_PREFERENCE.indexOf(a.providerId) - config.PROVIDERS_PREFERENCE.indexOf(b.providerId),
      )
      .find(({ url }) => ReactPlayer.canPlay(url))

  const setValidSourceOrError = (sources: MediaSource[], orderId: number) => {
    const firstValidSource = getValidSource(sources)

    if (firstValidSource) {
      setSource({
        orderId,
        providerId: firstValidSource.providerId,
        url: firstValidSource.url,
      })
    } else {
      state.setError('An error occurred. Please contact support')
    }
  }
  // SOURCE HANDLING
  const initClip = ({ sources, title }: MediaClip) => {
    state.setTitle(title)
    setValidSourceOrError(sources, 1)
  }

  const initPlaylist = ({ title, clips }: MediaPlaylist) => {
    state.setTitle(title)
    const firstClip = clips.filter(({ order }) => order === 1)[0]
    setValidSourceOrError(firstClip.sources, firstClip.order)
  }
  // PLAYLIST FEATURES
  const onProgressPlaylist = (seconds: number) => {
    const currentClip = getCurrentPlaylistClip()
    if (currentClip) {
      const { start, end } = currentClip
      seconds < start && state.seekTo(start, 'seconds')
      seconds >= end && playlistNext()
    }
  }

  const getCurrentPlaylistClip = (): PlaylistClip | undefined => {
    const { playlist } = media
    if (source && playlist) {
      return playlist.clips.find(({ order }) => order === source.orderId)
    }
  }

  const jumpToPlaylistClip = (orderId: number) => {
    const { playlist } = media
    if (source && playlist) {
      const clip: PlaylistClip = playlist.clips.filter(({ order }) => order === orderId)[0]
      clip && setValidSourceOrError(clip.sources, clip.order)
    }
  }
  const playlistNext = () => jumpToPlaylistClip(source!.orderId + 1)
  // const playlistPrevious = () => jumpToPlaylistClip(source!.orderId - 1)
  useEffect(() => {
    if (media.mode === 'clip') {
      initClip(media.clip)
    }
    if (media.mode === 'playlist') {
      initPlaylist(media.playlist)
    }
    // eslint-disable-next-line
  }, [])

  const chapters = measureChapters(state.duration, media.clip?.chapters)
  const currentChapter = getCurrentChapter(chapters, state.playedSeconds)

  return (
    <PlayerContainer onKeyDownCapture={handleKeyboardShortcut} tabIndex={0}>
      <div ref={fpsRef} className="fps" />
      {state.title && <h2>{state.title}</h2>}
      {media.mode === 'playlist' && (
        <PlaylistList onClick={jumpToPlaylistClip} clips={media.playlist.clips} source={source} />
      )}

      <PlayerUI.Body>
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
          <SeekerBar chapters={chapters} />
          <PlayerUI.ControlPanel>
            <Controls state={state} currentChapter={currentChapter} />
            <Settings />
          </PlayerUI.ControlPanel>
        </PlayerUI.Container>
      </PlayerUI.Body>
      <ChaptersList chapters={chapters} />
      {state.error && <PlayerUI.ErrorMessage>{state.error}</PlayerUI.ErrorMessage>}
    </PlayerContainer>
  )
}

export default Player
