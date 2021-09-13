import React, { useState } from 'react'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import SettingsIcon from '@material-ui/icons/Settings'
import * as PlayerUI from './ui/PlayerUI'
import { usePlayerStore } from './store/player.store'
import Tooltip from '@material-ui/core/Tooltip'

const Settings = () => {
  const { fullscreen, toggleFullscreen } = usePlayerStore((state) => ({
    fullscreen: state.fullscreen,
    toggleFullscreen: state.toggleFullscreen,
  }))

  const [settingsOpen, setSettingsMenu] = useState<boolean>(false)
  const toggleSettingsMenu = () => setSettingsMenu(!settingsOpen)

  return (
    <PlayerUI.Settings>
      <Tooltip title="Ustawienia" placement="top">
        <PlayerUI.Button onClick={toggleSettingsMenu}>
          <SettingsIcon
            style={{
              transform: settingsOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
            }}
          />
        </PlayerUI.Button>
      </Tooltip>
      <Tooltip
        title={!fullscreen ? 'Pełny ekran (f)' : 'Zamknij pełny ekran (f)'}
        placement="top-end"
      >
        <PlayerUI.Button onClick={toggleFullscreen}>
          {fullscreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
        </PlayerUI.Button>
      </Tooltip>
    </PlayerUI.Settings>
  )
}

export default Settings
