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
import { useStore } from './store/store.player'

interface ControlsProps {
  state: PlayerState
  currentChapter: Chapter
}

const DotSeparator = () => <>&nbsp;&#183;&nbsp;</>

const Controls = ({ state, currentChapter }: ControlsProps) => {
  const { togglePlay, toggleMute, volumeChange } = useStore(({ togglePlay, toggleMute, volumeChange }) => ({
    togglePlay,
    toggleMute,
    volumeChange,
  }))

  return (
    <>
      <PlayerUI.Controls>
        <PlayerUI.Button onClick={togglePlay}>{state.playing ? <PauseIcon /> : <PlayIcon />}</PlayerUI.Button>
        <PlayerUI.VolumeControls>
          <PlayerUI.Button onClick={toggleMute}>
            {!state.volume ? <VolumeMutedIcon /> : state.volume >= 0.5 ? <VolumeFullIcon /> : <VolumeHalfIcon />}
          </PlayerUI.Button>
        </PlayerUI.VolumeControls>
        <PlayerUI.VolumeBarWrapper>
          <VolumeBar volume={state.volume} onChange={volumeChange} />
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
