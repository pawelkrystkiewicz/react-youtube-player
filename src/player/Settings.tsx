import Tooltip from '@mui/material/Tooltip'
import FullScreenIcon from '@mui/icons-material/Fullscreen'
import FullScreenExitIcon from '@mui/icons-material/FullscreenExit'
import SettingsIcon from '@mui/icons-material/Settings'
import React from 'react'
import { usePlayerStore } from './store/player.store'
import * as PlayerUI from './ui/PlayerUI'

const Settings = () => {
  const {
    fullscreen,
    toggleFullscreen,
    toggleSettings,
    settings,
  } = usePlayerStore((state) => ({
    fullscreen: state.fullscreen,
    settings: state.settings,
    toggleFullscreen: state.toggleFullscreen,
    toggleSettings: state.toggleSettings,
  }))

  return (
    <PlayerUI.Settings>
      <Tooltip title="Ustawienia" placement="top">
        <PlayerUI.Button onClick={toggleSettings}>
          <SettingsIcon
            style={{
              transform: settings ? 'rotate(-90deg)' : 'rotate(0deg)',
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
