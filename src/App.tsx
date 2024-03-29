import { AppBar, Container, Tab, Tabs } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import LagRadar from 'react-lag-radar'
import hosted_file from './data/hosted_file.json'
import playlist_json from './data/playlist.json'
import without_chapters from './data/without_chapters.json'
import with_chapters from './data/with_chapters.json'
import Player from './player'
import { MediaMode, PlayerConfig } from './player/types/types'
import SettingsModal from './player/SettingsModal'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

interface TabPanelProps {
  children?: any
  dir?: string
  index: any
  value: any
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Container maxWidth="sm">{children}</Container>}
    </div>
  )
}

export default function App() {
  const hosted: PlayerConfig = { ...hosted_file, mode: MediaMode.CLIP }
  const withChapters: PlayerConfig = { ...with_chapters, mode: MediaMode.CLIP }
  const withoutChapters: PlayerConfig = {
    ...without_chapters,
    mode: MediaMode.CLIP,
  }
  const playlist: PlayerConfig = { ...playlist_json, mode: MediaMode.PLAYLIST }

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <div className="radar">
          <LagRadar size={300} frames={120} />
        </div>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered
          value={value}
          onChange={handleChange}
        >
          <Tab label="With chapters" />
          <Tab label="Without chapters" />
          <Tab label="Hosted file" />
          <Tab label="Playlist" />
          <Tab label="Change Log" />
          <Tab label="SettingsModal" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Player {...withChapters} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Player {...withoutChapters} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Player {...hosted} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Player {...playlist} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h2>ChangeLog</h2>
        <ol className="change-log-list">
          <li>Add react-player</li>
          <li>Add slider and dot as styled-components</li>
          <li>Show volume bar on sound control hover</li>
          <li>Add player UI</li>
          <li>Add chapter segments on progress bar</li>
          <li>Style chapters list</li>
          <li>Add playlist features</li>
          <li>Move repo to react-youtube-player</li>
          <li>Add material-ui and swap icons</li>
          <li>Add tooltips</li>
          <li>
            Add jumping to video % on number key press: <kbd>1</kbd> &rarr; 10%
            etc.
          </li>
        </ol>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SettingsModal />
      </TabPanel>
    </div>
  )
}
