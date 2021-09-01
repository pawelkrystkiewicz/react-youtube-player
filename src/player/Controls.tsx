import React from 'react'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import VolumeHalfIcon from '@material-ui/icons/VolumeDown'
import VolumeFullIcon from '@material-ui/icons/VolumeUp'
import VolumeMutedIcon from '@material-ui/icons/VolumeOff'
import TimeTracker from './TimeTracker'
import { Chapter, PlayerState } from './types/types'
import * as PlayerUI from './ui/PlayerUI'
import VolumeBar from './VolumeBar'

interface ControlsProps {
  state: PlayerState
  currentChapter: Chapter
  onTogglePlay: () => void
  onToggleMute: () => void
  onVolumeChange: (volume: number) => void
}

const DotSeparator = () => <>&nbsp;&#183;&nbsp;</>

const Controls = ({ state, currentChapter, onTogglePlay, onToggleMute, onVolumeChange }: ControlsProps) => {
  return (
    <>
      <PlayerUI.Controls>
        <PlayerUI.Button onClick={onTogglePlay}>{state.playing ? <PauseIcon /> : <PlayIcon />}</PlayerUI.Button>
        <PlayerUI.VolumeControls>
          <PlayerUI.Button onClick={onToggleMute}>
            {!state.volume ? <VolumeMutedIcon /> : state.volume >= 0.5 ? <VolumeFullIcon /> : <VolumeHalfIcon />}
          </PlayerUI.Button>
        </PlayerUI.VolumeControls>
        <PlayerUI.VolumeBarWrapper>
          <VolumeBar volume={state.volume} onChange={onVolumeChange} />
        </PlayerUI.VolumeBarWrapper>

        <TimeTracker playedSeconds={state.playedSeconds} duration={state.duration} />
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
