import { Dispatch, Reducer } from 'react'

export interface GridState {
  width: number
  height: number
  spacing: number
  maxWidth?: number
  maxHeight?: number
  maxSpacing?: number
}

export enum ActionTypes {
  UPDATE_GRID = 'updateGrid',
}

export interface Action {
  type: string
  payload: {
    [k: string]: any
  }
}

export type AppReducer = Reducer<AppState, Action>

export function reducer(
  state: AppState,
  { type, payload }: Action,
) {
  switch (type) {
    case ActionTypes.UPDATE_GRID:
      return {
        ...state,
        grid: {
          width: payload.width,
          height: payload.height,
          spacing: payload.spacing,
        },
      }
    default:
      return state
  }
}

export const initialGridState: GridState = {
  width: 1,
  height: 1,
  spacing: 0,
}

export interface AppState {
  grid: GridState
}

export const initialAppState: AppState = {
  grid: initialGridState,
}

export type AppValue = [AppState, Dispatch<Action>]
