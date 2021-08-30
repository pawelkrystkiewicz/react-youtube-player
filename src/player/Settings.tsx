import React from 'react'
import { ReactComponent as FullScreenIcon } from './icons/fullscreen.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'
import * as PlayerUI from './ui/PlayerUI'

const Settings = () => (
  <PlayerUI.Settings>
    <PlayerUI.Button>
      <SettingsIcon />
    </PlayerUI.Button>
    <PlayerUI.Button>
      <FullScreenIcon />
    </PlayerUI.Button>
  </PlayerUI.Settings>
)

export default Settings
