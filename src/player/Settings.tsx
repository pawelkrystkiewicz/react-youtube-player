import Tooltip from '@material-ui/core/Tooltip'
import FullScreenIcon from '@material-ui/icons/Fullscreen'
import FullScreenExitIcon from '@material-ui/icons/FullscreenExit'
import SettingsIcon from '@material-ui/icons/Settings'
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
