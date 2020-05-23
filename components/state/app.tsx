import {
  FC,
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
} from '../../lib/state'

const AppContext = createContext<AppValue>([
  initialAppState,
  () => initialAppState,
])

export interface AppProviderProps {
  initialState?: AppState
}

export const AppProvider: FC<AppProviderProps> = ({
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
