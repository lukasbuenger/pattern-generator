import { FC, createContext, useContext } from 'react'
import { Sequence } from '../lib/sequences'
import { Shape } from '../lib/shapes'
import { Transform } from '../lib/transform/transform'

interface AppState {
  sequence: Sequence
  shape: Shape
  transforms: Transform[]
}

const AppContext = createContext<AppState>({
  sequence: Sequence.createDefault(),
  shape: Shape.createDefault(),
  transforms: [],
})

export interface AppProviderProps {
  state: AppState
}

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
