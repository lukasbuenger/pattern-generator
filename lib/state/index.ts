import { Dispatch, Reducer } from 'react'
import { Action } from './base'

import {
  GridState,
  GridActionTypes,
  GridAction,
  gridReducer,
  initialGridState,
} from './grid'

import {
  ShapeState,
  ShapeActionTypes,
  ShapeAction,
  shapeReducer,
  initialShapeState,
} from './shape'

export type ActionTypes = GridActionTypes & ShapeActionTypes

export type AppReducer = Reducer<AppState, Action>

export function reducer(state: AppState, action: Action) {
  if (
    Object.values(GridActionTypes).includes(action.type)
  ) {
    return {
      ...state,
      grid: gridReducer(state.grid, action as GridAction),
    }
  } else if (
    Object.values(ShapeActionTypes).includes(action.type)
  ) {
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
