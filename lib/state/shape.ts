import { Action } from './base'
import { Polygon, polygon, vertex } from '../geom'

export interface ShapeState {
  polygon: Polygon
}

export enum ShapeActionTypes {
  SET_POLYGON = 'SET_POLYGON',
  UPDATE_VERTEX = 'UPDATE_VERTEX',
}

export interface SetPolygonAction extends Action {
  payload: {
    polygon: Polygon
  }
}

export type ShapeAction = SetPolygonAction

const initialPolygon = polygon(
  vertex(0, 200),
  vertex(100, 0),
  vertex(200, 200),
)

export const initialShapeState: ShapeState = {
  polygon: initialPolygon,
}

export function shapeReducer(
  state: ShapeState = initialShapeState,
  action: ShapeAction,
): ShapeState {
  switch (action.type) {
    case ShapeActionTypes.SET_POLYGON:
      return {
        polygon: (action as SetPolygonAction).payload
          .polygon,
      }
    default:
      return state
  }
}
