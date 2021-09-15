import React, { useCallback, useState } from 'react'
import { Direction, Slider } from 'react-player-controls'
import FormattedTime from './FormattedTime'
import { getCurrentChapter } from './helper'
import { usePlayerStore } from './store/player.store'
import { Chapter as ChapterType, MeasuredChapter } from './types/types'
import { COLORS } from './ui/colors'
import {
  Bar,
  Chapter,
  ChaptersContainer,
  Dot,
  FollowingTooltip,
  FollowingTooltipProps,
  TooltipChapter
} from './ui/Sliders'
const { YT_RED, BLACK_ALPHA, GREY_ALPHA } = COLORS

interface SeekerBarProps {
  chapters: MeasuredChapter[]
  duration: number
}

const SeekerBar = ({ chapters, duration }: SeekerBarProps) => {
  const {
    loaded,
    current,
    seeking,
    onSeekerChange,
    onSeekerChangeStart,
    onSeekerChangeEnd,
  } = usePlayerStore((state) => ({
    loaded: state.loaded,
    current: state.current,
    seeking: state.seeking,
    onSeekerChange: state.onSeekerChange,
    onSeekerChangeStart: state.onSeekerChangeStart,
    onSeekerChangeEnd: state.onSeekerChangeEnd,
  }))

  const [lastIntent, setLastIntent] = useState<number>(0)
  const hasChapters = chapters.length > 0
  const set0 = useCallback(() => setLastIntent(0), [])
  const intentTooltipValue = lastIntent * duration
  const dotTooltipValue = current * duration
  const intentTooltipChapter = getCurrentChapter(chapters, intentTooltipValue)
  const dotTooltipChapter = getCurrentChapter(chapters, dotTooltipValue)

  return (
    <Slider
      direction={Direction.HORIZONTAL}
      style={{
        width: 'auto',
        height: 4,
        borderRadius: 0,
        transition: 'width 0.1s',
        flex: '1 100%',
        margin: '0 12px',
      }}
      onIntent={setLastIntent}
      onIntentStart={setLastIntent}
      onIntentEnd={set0}
      onChange={onSeekerChange}
      onChangeStart={onSeekerChangeStart}
      onChangeEnd={onSeekerChangeEnd}
    >
      {hasChapters ? (
        <ChaptersBaseBar chapters={chapters} />
      ) : (
        <Bar value={1} background={GREY_ALPHA} />
      )}

      {hasChapters ? (
        <ChaptersProgressBar
          chapters={chapters}
          duration={duration}
          progressPercent={lastIntent}
          background={GREY_ALPHA}
        />
      ) : (
        <Bar value={lastIntent} background={GREY_ALPHA} />
      )}
      {hasChapters ? (
        <ChaptersProgressBar
          chapters={chapters}
          duration={duration}
          progressPercent={loaded}
          background={GREY_ALPHA}
        />
      ) : (
        <Bar value={loaded} background={GREY_ALPHA} />
      )}
      {hasChapters ? (
        <ChaptersProgressBar
          chapters={chapters}
          progressPercent={current}
          duration={duration}
          background={YT_RED}
        />
      ) : (
        <Bar value={current} background={YT_RED} />
      )}
      <Dot value={current} visible={!!lastIntent || seeking} />
      {!!lastIntent && !seeking && (
        <TimeTooltip
          value={intentTooltipValue}
          position={lastIntent}
          chapter={intentTooltipChapter}
        />
      )}
      {seeking && (
        <TimeTooltip
          value={dotTooltipValue}
          position={current}
          chapter={dotTooltipChapter}
        />
      )}
    </Slider>
  )
}

interface TimeTooltipProps extends FollowingTooltipProps {
  chapter: ChapterType
}

const TimeTooltip = (props: TimeTooltipProps) => (
  <FollowingTooltip {...props}>
    {props.chapter && <TooltipChapter>{props.chapter.title}</TooltipChapter>}
    <FormattedTime seconds={props.value} />
  </FollowingTooltip>
)

const ChaptersBaseBar = ({ chapters }: { chapters: MeasuredChapter[] }) => (
  <ChaptersContainer>
    {chapters.map(({ size }) => (
      <Chapter value={size} background={BLACK_ALPHA} />
    ))}
  </ChaptersContainer>
)

interface ChaptersProgressBarProps {
  chapters: MeasuredChapter[]
  duration: number
  progressPercent: number
  background: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const ChaptersProgressBar = ({
  chapters,
  duration,
  progressPercent,
  background,
  ...props
}: ChaptersProgressBarProps) => {
  const currentSeconds = duration * progressPercent
  const chaptersPastCurrentTimestamp = chapters.filter(
    ({ end }) => end < currentSeconds
  )
  const chaptersLengthPercent = chaptersPastCurrentTimestamp.reduce(
    (acc, chapter) => acc + chapter.size,
    0
  )

  return (
    <ChaptersContainer {...props}>
      {chaptersPastCurrentTimestamp.map(({ size }) => (
        <Chapter value={size} background={background} />
      ))}
      <Chapter
        value={progressPercent - chaptersLengthPercent}
        background={background}
      />
    </ChaptersContainer>
  )
}

export default SeekerBar
