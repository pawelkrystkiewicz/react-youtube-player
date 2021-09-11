import create, { State as BaseState } from 'zustand'
import { devtools, redux } from 'zustand/middleware'
import produce, { Draft } from 'immer'

const createStore = <State extends BaseState, Action extends { type: string; payload: any[] }>(
  actions: {
    [Type in Action['type']]: (draft: Draft<State>, ...payload: any[]) => void
  },
  initialState: State,
  storeName: string,
) => {
  const reducer = (state: State, event: Action) =>
    produce(state, (draft: Draft<State>) => {
      actions[event.type](draft, ...event.payload)
    })
  const useStore = create(devtools(redux(reducer, initialState), storeName))
  const api = useStore as typeof useStore & {
    dispatch: (action: Action) => Action
  }
  const dispatch = Object.keys(actions).reduce((acc, key) => {
    acc[key] = (...args) => api.dispatch({ type: key, payload: args } as Action)
    return acc
  }, {})

  return [useStore, dispatch, api]
}

export default createStore
