import Left from '@mui/icons-material/ArrowBackIos'
import Right from '@mui/icons-material/ArrowForwardIos'
import CheckIcon from '@mui/icons-material/Check'
import React from 'react'
import { usePlayerStore } from './store/player.store'
import {
  Button,
  SettingsBox,
  SettingsIcon,
  SettingsName,
  SettingsOption,
  SettingsRow,
  SettingsValue,
  SettingsValuesGrid,
} from './ui/PlayerUI'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && [children]}
    </div>
  )
}

const playbackSpeeds = [
  { speed: 0.25 },
  { speed: 0.5 },
  { speed: 0.75 },
  { speed: 1, title: 'Normalna' },
  { speed: 1.25 },
  { speed: 1.5 },
  { speed: 1.75 },
  { speed: 2 },
]

const getSpeedDisplayName = (speed: number) => {
  const option = playbackSpeeds.filter((option) => option.speed === speed)[0]
  return (option && option.title ? option.title : option.speed) ?? speed
}

const SettingsModal = (props: any) => {
  const [value, setValue] = React.useState(0)
  const goToHome = () => setValue(0)
  const goToSpeeds = () => setValue(1)

  const { playbackRate, setPlaybackRate } = usePlayerStore((state) => ({
    playbackRate: state.playbackRate,
    setPlaybackRate: state.setPlaybackRate,
  }))

  return (
    <SettingsBox>
      <TabPanel value={value} index={0}>
        <SettingsRow>
          <SettingsName>Prędkość odtwarzania</SettingsName>
          <SettingsOption>
            {getSpeedDisplayName(1)}
            <Button onClick={goToSpeeds}>
              <Right fontSize="small" />
            </Button>
          </SettingsOption>
        </SettingsRow>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsOption>
          <Button onClick={goToHome}>
            <Left fontSize="small" />
          </Button>
          <SettingsName>Prędkość odtwarzania</SettingsName>
        </SettingsOption>
        {playbackSpeeds.map(({ speed }) => (
          <SettingsValuesGrid>
            {speed === playbackRate && (
              <SettingsIcon>
                <CheckIcon fontSize="small" />
              </SettingsIcon>
            )}
            <SettingsValue onClick={() => setPlaybackRate(speed)}>
              {getSpeedDisplayName(speed)}
            </SettingsValue>
          </SettingsValuesGrid>
        ))}
      </TabPanel>
    </SettingsBox>
  )
}

export default SettingsModal
