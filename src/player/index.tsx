import React, { useEffect, useRef, useState, useReducer } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'
import ChaptersList from './ChaptersList'
import config from './config'
import Controls from './Controls'
import { getCurrentChapter, measureChapters } from './helper'
import { PlaylistList } from './PlaylistList'
import SeekerBar from './SeekerBar'
import Settings from './Settings'
import { KeyCode } from './shortcuts'
import {
  CurrentSource,
  MediaClip,
  MediaPlaylist,
  MediaSource,
  PlayerConfig,
  PlayerProgress,
  PlayerState,
  PlaylistClip,
} from './types/types'
import { PlayerContainer } from './ui/Container'
import produce from 'immer'
import * as PlayerUI from './ui/PlayerUI'

const { INITIAL_STATE, VOLUME_STEP, REWIND_STEP } = config
enum ActionType {
  'PROGRESS',
  'PLAY',
  'PAUSE',
  'SEEK',
  'NEXT',
  'PREVIOUS',
  'DURATION',
}
type Action = { type: ActionType; payload: Partial<PlayerState> }

function playerReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionType.PLAY:
      return { ...state, playing: true }

    default:
      return state
  }
}

const Player = (media: PlayerConfig) => {
  const playerRef = useRef<ReactPlayer>(null)
  const [source, setSource] = useState<CurrentSource | null>(null)
  const [state, setState] = useState<PlayerState>(INITIAL_STATE)

  /* EVENTS of react-player */
  const onDuration = (duration: number): void => setState({ ...state, duration })

  const onProgress = (progress: PlayerProgress): void => {
    let payload: PlayerState = { ...state, ...progress }

    if (!state.seeking) {
      payload.current = progress.played
      /* When seeking we want progress indicator to follow user input
         When playing we update this with actual played % value
      */
    }

    if (media.mode === 'playlist') {
      onProgressPlaylist(progress.playedSeconds)
    }

    setState(payload)
  }

  /* LOADING / BUFFERING */
  const onBuffer = (): void => setState({ ...state, buffering: true })
  const onBufferEnd = (): void => setState({ ...state, buffering: false })

  /* PROGRESS BAR functions  */
  const handleSeekerChange = (sliderPosition: number): void => setState({ ...state, current: sliderPosition })

  const handleSeekerChangeStart = (sliderPosition: number): void =>
    setState({
      ...state,
      seeking: true,
      playing: false,
      current: sliderPosition,
    })

  const handleSeekerChangeEnd = (): void => {
    seekToFraction(state.current)
    setState({
      ...state,
      seeking: false,
      playing: true,
    })
  }

  /* BASIC CONTROLS */
  const togglePlay = (): void => setState({ ...state, playing: !state.playing })
  const toggleMute = (): void => (!!state.volume ? mute() : unmute())
  const mute = (): void => setState({ ...state, volume: 0 })
  const unmute = (): void =>
    setState({
      ...state,
      volume: !!state.prevVolume ? state.prevVolume : INITIAL_STATE.volume,
    })

  // const setPlaybackRate = (playbackRate): void => setState({ ...state, playbackRate })
  type SeekInVideoType = 'seconds' | 'fraction'
  /* POSITION */
  const seekToSeconds = (secondsOrPercent: number, type: SeekInVideoType = 'seconds') => {
    playerRef.current && playerRef.current.seekTo(secondsOrPercent, type)
    // secondsOrPercent < 1 && handleSeekerChange(secondsOrPercent)
  }
  const jumpForward = (): void | null => seekToSeconds(state.playedSeconds + REWIND_STEP)
  const jumpBackward = (): void | null => seekToSeconds(state.playedSeconds - REWIND_STEP)
  const jumpToStart = (): void | null => seekToSeconds(0)
  const jumpToEnd = (): void | null => seekToSeconds(1, 'fraction')
  const seekToFraction = (percent: number): void | null => seekToSeconds(percent, 'fraction')

  /* VOLUME */
  const changeVolume = (volume: number): void => {
    if (volume >= 0 && volume <= 1) setState({ ...state, volume, prevVolume: volume })
  }
  const stepUpVolume = (): void => changeVolume(state.volume + VOLUME_STEP)
  const stepDownVolume = (): void => changeVolume(state.volume - VOLUME_STEP)

  /* KEYBOARD HANDLER*/
  const handleKeyboardShortcut = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log(event.code)
    switch (event.code) {
      case KeyCode.Space:
        togglePlay()
        break
      case KeyCode.ArrowUp:
        stepUpVolume()
        break
      case KeyCode.ArrowDown:
        stepDownVolume()
        break
      case KeyCode.ArrowLeft:
        jumpBackward()
        break
      case KeyCode.ArrowRight:
        jumpForward()
        break
      case KeyCode.F:
        console.log('toggleFullscreen')
        break
      case KeyCode.M:
        toggleMute()
        break
      case KeyCode.K:
        togglePlay()
        break
      case KeyCode.Home:
      case KeyCode.Digit0:
        jumpToStart()
        break
      case KeyCode.End:
        jumpToEnd()
        break
      case KeyCode.Digit1:
        jumpToStart()
        break
      case KeyCode.Digit2:
        seekToFraction(0.2)
        break
      case KeyCode.Digit3:
        seekToFraction(0.3)
        break
      case KeyCode.Digit4:
        seekToFraction(0.4)
        break
      case KeyCode.Digit5:
        seekToFraction(0.5)
        break
      case KeyCode.Digit6:
        seekToFraction(0.6)
        break
      case KeyCode.Digit7:
        seekToFraction(0.7)
        break
      case KeyCode.Digit8:
        seekToFraction(0.8)
        break
      case KeyCode.Digit9:
        seekToFraction(0.9)
        break
      default:
        break
    }
  }

  /* CONFIG react-player */
  const playerConfig: Partial<ReactPlayerProps> = {
    style: { pointerEvents: 'none' },
    ref: playerRef,
    fallback: <span>Loading...</span>,
    stopOnUnmount: true,
    onProgress,
    onDuration,
    onBuffer,
    onBufferEnd,
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
  }

  const showErrorOnInvalidSources = (): void =>
    setState({
      ...state,
      error: 'An error occured. Please contact support',
    })

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
      showErrorOnInvalidSources()
    }
  }
  // SOURCE HANDLING
  const initClip = (clip: MediaClip) => {
    setState({ ...state, title: clip.title })
    setValidSourceOrError(clip.sources, 1)
  }

  const initPlaylist = (playlist: MediaPlaylist) => {
    setState({ ...state, title: playlist.title })
    const firstClip = playlist.clips.filter(({ order }) => order === 1)[0]
    setValidSourceOrError(firstClip.sources, firstClip.order)
  }
  // PLAYLIST FEATURES
  const onProgressPlaylist = (seconds: number) => {
    const currentClip = getCurrentPlaylistClip()
    if (currentClip) {
      const { start, end } = currentClip
      seconds < start && seekToSeconds(start)
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
      {state.title && <h2>{state.title}</h2>}
      {media.mode === 'playlist' && (
        <PlaylistList onClick={jumpToPlaylistClip} clips={media.playlist.clips} source={source} />
      )}

      <PlayerUI.Body>
        <PlayerUI.ClickCatcher onClick={togglePlay}>
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
          <SeekerBar
            duration={state.duration}
            current={state.current}
            loaded={state.loaded}
            chapters={chapters}
            onChange={handleSeekerChange}
            onChangeEnd={handleSeekerChangeEnd}
            onChangeStart={handleSeekerChangeStart}
          />
          <PlayerUI.ControlPanel>
            <Controls
              state={state}
              currentChapter={currentChapter}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onVolumeChange={changeVolume}
            />
            <Settings
              isFullscreen={false}
              toggleSettingsMenu={() => console.log('toggleSettingsMenu')}
              toggleFullscreen={() => console.log('toggleFullscreen')}
            />
          </PlayerUI.ControlPanel>
        </PlayerUI.Container>
      </PlayerUI.Body>
      <ChaptersList chapters={chapters} played={state.playedSeconds} goToChapter={seekToSeconds} />
      {state.error && <PlayerUI.ErrorMessage>{state.error}</PlayerUI.ErrorMessage>}
    </PlayerContainer>
  )
}

export default Player
