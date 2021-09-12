import config from './config'

export enum KeyCode {
  Space = 'Space', //play/pause
  ArrowUp = 'ArrowUp', // volume++
  ArrowDown = 'ArrowDown', // volume--
  ArrowLeft = 'ArrowLeft', //skip backward
  ArrowRight = 'ArrowRight', //skip forward
  C = 'KeyC', //captions
  F = 'KeyF', //fullscreen
  K = 'KeyK', //play
  M = 'KeyM', //mute
  N = 'KeyN', //next
  P = 'KeyP', //previous
  Home = 'Home', //jump to start
  End = 'End', //jump to end
  Digit0 = 'Digit0', // jump to 0% (start)
  Digit1 = 'Digit1', // jump to 10%
  Digit2 = 'Digit2', // jump to 20%
  Digit3 = 'Digit3', // jump to 30%
  Digit4 = 'Digit4', // jump to 40%
  Digit5 = 'Digit5', // jump to 50%
  Digit6 = 'Digit6', // jump to 60%
  Digit7 = 'Digit7', // jump to 70%
  Digit8 = 'Digit8', // jump to 80%
  Digit9 = 'Digit9', // jump to 90%
  Numpad0 = 'Numpad0',
  Numpad1 = 'Numpad1',
  Numpad2 = 'Numpad2',
  Numpad3 = 'Numpad3',
  Numpad4 = 'Numpad4',
  Numpad5 = 'Numpad5',
  Numpad6 = 'Numpad6',
  Numpad7 = 'Numpad7',
  Numpad8 = 'Numpad8',
  Numpad9 = 'Numpad9',
}

/* KEYBOARD HANDLER*/
export const handleKeyboardShortcut = state => (e: React.KeyboardEvent<HTMLDivElement>) => {
  e.preventDefault()
  switch (e.code) {
    case KeyCode.Space:
      state.togglePlay()
      break
    case KeyCode.ArrowUp:
      state.volumeUp()
      break
    case KeyCode.ArrowDown:
      state.volumeDown()
      break
    case KeyCode.ArrowLeft:
      state.seekTo(state.playedSeconds - config.REWIND_STEP, 'seconds')
      break
    case KeyCode.ArrowRight:
      state.seekTo(state.playedSeconds + config.REWIND_STEP, 'seconds')
      break
    case KeyCode.F:
      console.log('toggleFullscreen')
      break
    case KeyCode.M:
      state.toggleMute()
      break
    case KeyCode.K:
      state.togglePlay()
      break
    case KeyCode.Home:
    case KeyCode.Digit0 || KeyCode.Numpad0:
      state.seekTo(0, 'fraction')
      break
    case KeyCode.End:
      state.seekTo(1, 'fraction')
      break
    case KeyCode.Digit1 || KeyCode.Numpad1:
      state.seekTo(0.1, 'fraction')
      break
    case KeyCode.Digit2 || KeyCode.Numpad2:
      state.seekTo(0.2, 'fraction')
      break
    case KeyCode.Digit3 || KeyCode.Numpad3:
      state.seekTo(0.3, 'fraction')
      break
    case KeyCode.Digit4 || KeyCode.Numpad4:
      state.seekTo(0.4, 'fraction')
      break
    case KeyCode.Digit5 || KeyCode.Numpad5:
      state.seekTo(0.5, 'fraction')
      break
    case KeyCode.Digit6 || KeyCode.Numpad6:
      state.seekTo(0.6, 'fraction')
      break
    case KeyCode.Digit7 || KeyCode.Numpad7:
      state.seekTo(0.7, 'fraction')
      break
    case KeyCode.Digit8 || KeyCode.Numpad8:
      state.seekTo(0.8, 'fraction')
      break
    case KeyCode.Digit9 || KeyCode.Numpad9:
      state.seekTo(0.9, 'fraction')
      break
    default:
      break
  }
}
