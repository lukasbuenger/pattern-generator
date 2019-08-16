import {
  SFC,
  createContext,
  useContext,
  useReducer,
} from 'react'
import {
  AppState,
  AppValue,
  initialAppState,
  AppReducer,
  reducer,
  ActionTypes,
  GridState,
} from '../lib/state'

const AppContext = createContext<AppValue>([
  initialAppState,
  () => initialAppState,
])

export interface AppProviderProps {
  initialState?: AppState
}

export const AppProvider: SFC<AppProviderProps> = ({
  children,
  initialState = initialAppState,
}) => {
  return (
    <AppContext.Provider
      value={useReducer<AppReducer>(reducer, initialState)}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

export function useGrid(): [GridState, any] {
  const [state, dispatch] = useApp()
  return [
    state.grid,
    (
      width: number,
      height: number,
      spacing: number,
    ): void =>
      dispatch({
        type: ActionTypes.UPDATE_GRID,
        payload: {
          width,
          height,
          spacing,
        },
      }),
  ]
}
