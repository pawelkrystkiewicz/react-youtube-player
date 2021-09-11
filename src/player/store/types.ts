import { PlayerProgress, PlayerState } from '../types/types'

export enum ActionType {
  PROGRESS,
  PLAY,
  PAUSE,
  SEEK,
  NEXT,
  PREVIOUS,
  DURATION,
  BUFFERING_START,
  BUFFERING_END,
  SEEKER_CHANGE,
  SEEKER_CHANGE_START,
  SEEKER_CHANGE_END,
  TOGGLE_PLAY,
  TOGGLE_MUTE,
  VOLUME_CHANGE,
  VOLUME_UP,
  VOLUME_DOWN,
  ERROR,
  TITLE,
}
export type Action =
  | { type: ActionType.PLAY }
  | { type: ActionType.PAUSE }
  | { type: ActionType.DURATION; payload: Pick<PlayerState, 'duration'> }
  | { type: ActionType.PROGRESS; payload: PlayerProgress }
  | { type: ActionType.SEEK; payload: Pick<PlayerState, 'duration'> }
  | { type: ActionType.NEXT; payload: Pick<PlayerState, 'duration'> }
  | { type: ActionType.PREVIOUS; payload: Pick<PlayerState, 'duration'> }
  | { type: ActionType.BUFFERING_START }
  | { type: ActionType.BUFFERING_END }
  | { type: ActionType.SEEKER_CHANGE; payload: Pick<PlayerState, 'current'> }
  | { type: ActionType.SEEKER_CHANGE_START; payload: Pick<PlayerState, 'current'> }
  | { type: ActionType.SEEKER_CHANGE_END }
  | { type: ActionType.TOGGLE_PLAY }
  | { type: ActionType.TOGGLE_MUTE }
  | { type: ActionType.VOLUME_CHANGE; payload: Pick<PlayerState, 'volume' | 'prevVolume'> }
  | { type: ActionType.VOLUME_UP }
  | { type: ActionType.VOLUME_DOWN }
  | { type: ActionType.ERROR; payload: Pick<PlayerState, 'error'> }
  | { type: ActionType.TITLE; payload: Pick<PlayerState, 'title'> }
