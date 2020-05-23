import { Dispatch, Reducer } from 'react'

import {
  GridState,
  GridAction,
  gridReducer,
  initialGridState,
} from './grid'

import {
  ShapeState,
  ShapeAction,
  shapeReducer,
  initialShapeState,
} from './shape'

type Action = GridAction | ShapeAction

export type AppReducer = Reducer<AppState, Action>

export function reducer(state: AppState, action: Action) {
  if (GridAction.isGridAction(action)) {
    return {
      ...state,
      grid: gridReducer(state.grid, action as GridAction),
    }
  } else if (ShapeAction.isShapeAction(action)) {
    return {
      ...state,
      shape: shapeReducer(
        state.shape,
        action as ShapeAction,
      ),
    }
  } else {
    return state
  }
}

export interface AppState {
  grid: GridState
  shape: ShapeState
}

export const initialAppState: AppState = {
  grid: initialGridState,
  shape: initialShapeState,
}

export type AppValue = [AppState, Dispatch<Action>]
