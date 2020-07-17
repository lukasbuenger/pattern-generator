import { FC, createContext, useContext } from 'react'
import { AppState } from '../lib/app-state'

export interface AppProviderProps {
  state: AppState
}

const AppContext = createContext<AppState>(
  AppState.create(),
)

export const AppProvider: FC<AppProviderProps> = ({
  children,
  state,
}) => {
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}

export const useShape = () => {
  return useApp().shape
}

export const useSequence = () => {
  return useApp().sequence
}

export const useTransforms = () => {
  return useApp().transforms
}
