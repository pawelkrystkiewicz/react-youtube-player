import React from 'react'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import SettingsIcon from '@material-ui/icons/Settings'
import * as PlayerUI from './ui/PlayerUI'

export interface SettingsProps {
  isFullscreen: boolean
  toggleSettingsMenu: () => void
  toggleFullscreen: () => void
}

const Settings = ({ isFullscreen, toggleSettingsMenu, toggleFullscreen }: SettingsProps) => (
  <PlayerUI.Settings>
    <PlayerUI.Button>
      <SettingsIcon />
    </PlayerUI.Button>
    <PlayerUI.Button>{isFullscreen ? <FullScreenExitIcon /> : <FullScreenIcon />}</PlayerUI.Button>
  </PlayerUI.Settings>
)

export default Settings
