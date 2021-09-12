import React from 'react'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import SettingsIcon from '@material-ui/icons/Settings'
import * as PlayerUI from './ui/PlayerUI'
import { usePlayerStore } from './store/player.store'

const Settings = () => {
  const { fullscreen, toggleSettingsMenu, toggleFullscreen } = usePlayerStore(
    (state) => ({
      fullscreen: state.fullscreen,
      toggleSettingsMenu: () => {},
      toggleFullscreen: state.toggleFullscreen,
    })
  )

  return (
    <PlayerUI.Settings>
      <PlayerUI.Button onClick={toggleSettingsMenu}>
        <SettingsIcon />
      </PlayerUI.Button>
      <PlayerUI.Button onClick={toggleFullscreen}>
        {fullscreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
      </PlayerUI.Button>
    </PlayerUI.Settings>
  )
}

export default Settings
