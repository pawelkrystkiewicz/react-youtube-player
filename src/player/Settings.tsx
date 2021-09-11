import React from 'react'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import SettingsIcon from '@material-ui/icons/Settings'
import * as PlayerUI from './ui/PlayerUI'
import { useStore } from './store/store.player'

const Settings = () => {
  const { fullscreen, toggleSettingsMenu } = useStore(state => ({
    fullscreen: state.fullscreen,
    toggleSettingsMenu: () => {},
    toggleFullscreen: state.toggleFullscreen,
  }))

  return (
    <PlayerUI.Settings>
      <PlayerUI.Button>
        <SettingsIcon />
      </PlayerUI.Button>
      <PlayerUI.Button>{fullscreen ? <FullScreenExitIcon /> : <FullScreenIcon />}</PlayerUI.Button>
    </PlayerUI.Settings>
  )
}

export default Settings
