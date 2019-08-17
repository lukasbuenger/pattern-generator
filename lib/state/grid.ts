import { Action } from './base'

export interface GridState {
  width: number
  height: number
  spacing: number
  maxWidth?: number
  maxHeight?: number
  maxSpacing?: number
}

export enum GridActionTypes {
  UPDATE_GRID = 'updateGrid',
}

export interface GridAction extends Action {
  payload: {
    width: number
    height: number
    spacing: number
  }
}

export const initialGridState: GridState = {
  width: 1,
  height: 1,
  spacing: 0,
}

export function gridReducer(
  state: GridState = initialGridState,
  { type, payload }: GridAction,
): GridState {
  switch (type) {
    case GridActionTypes.UPDATE_GRID:
      return {
        width: payload.width,
        height: payload.height,
        spacing: payload.spacing,
      }
    default:
      return state
  }
}
