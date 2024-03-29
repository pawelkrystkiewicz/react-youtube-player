import React from 'react'
import FormattedTime from './FormattedTime'
import * as PlayerUI from './ui/PlayerUI'

interface TimeTrackerProps {
  playedSeconds: number
  duration: string
}

const TimeTracker = ({ playedSeconds, duration }: TimeTrackerProps) => (
  <PlayerUI.TimeTracker>
    <FormattedTime seconds={playedSeconds} />
    &nbsp;/&nbsp;
    {duration}
  </PlayerUI.TimeTracker>
)

export default TimeTracker
