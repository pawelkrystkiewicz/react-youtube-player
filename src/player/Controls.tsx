import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import VolumeHalfIcon from '@material-ui/icons/VolumeDown'
import VolumeMutedIcon from '@material-ui/icons/VolumeOff'
import VolumeFullIcon from '@material-ui/icons/VolumeUp'
import React from 'react'
import { usePlayerStore } from './store/player.store'
import TimeTracker from './TimeTracker'
import { Chapter } from './types/types'
import * as PlayerUI from './ui/PlayerUI'
import VolumeBar from './VolumeBar'
import Tooltip from '@material-ui/core/Tooltip'

interface ControlsProps {
  duration: string
  currentChapter: Chapter
  hasNext: boolean
  hasPrevious: boolean
  next: () => void
  previous: () => void
}

const DotSeparator = () => <>&nbsp;&#183;&nbsp;</>

const Controls = ({ currentChapter, duration }: ControlsProps) => {
  const {
    togglePlay,
    toggleMute,
    volumeChange,
    playing,
    volume,
    playedSeconds,
  } = usePlayerStore((state) => ({
    togglePlay: state.togglePlay,
    toggleMute: state.toggleMute,
    volumeChange: state.volumeChange,
    playing: state.playing,
    volume: state.volume,
    playedSeconds: state.playedSeconds,
  }))

  return (
    <>
      <PlayerUI.Controls>
        <Tooltip
          title={playing ? 'Wstrzymaj (k)' : 'Odtwórz (k)'}
          placement="top-start"
        >
          <PlayerUI.Button onClick={togglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </PlayerUI.Button>
        </Tooltip>
        <PlayerUI.VolumeControls>
          <Tooltip
            title={!volume ? 'Wyłącz wyciszenie (m)' : 'Wycisz (m)'}
            placement="top"
          >
            <PlayerUI.Button onClick={toggleMute}>
              {!volume ? (
                <VolumeMutedIcon />
              ) : volume >= 0.5 ? (
                <VolumeFullIcon />
              ) : (
                <VolumeHalfIcon />
              )}
            </PlayerUI.Button>
          </Tooltip>
        </PlayerUI.VolumeControls>
        <PlayerUI.VolumeBarWrapper>
          <VolumeBar volume={volume} onChange={volumeChange} />
        </PlayerUI.VolumeBarWrapper>
        <TimeTracker playedSeconds={playedSeconds} duration={duration} />
      </PlayerUI.Controls>
      <PlayerUI.Chapters>
        {currentChapter && (
          <span>
            <DotSeparator />
            {currentChapter.title}
          </span>
        )}
      </PlayerUI.Chapters>
    </>
  )
}
export default Controls
