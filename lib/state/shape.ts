import { Action } from './base'
import {
  Polygon,
  polygon,
  vertex,
  replaceVertexInPoly,
} from '../geom'

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

export interface UpdateVertexAction extends Action {
  payload: {
    vertex: number
    x: number
    y: number
    radius: number
    isAbsolute: boolean
  }
}

export type ShapeAction =
  | SetPolygonAction
  | UpdateVertexAction

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
    case ShapeActionTypes.UPDATE_VERTEX:
      const {
        vertex: a,
        x,
        y,
        radius,
        isAbsolute,
      } = (action as UpdateVertexAction).payload
      return {
        polygon: replaceVertexInPoly(
          state.polygon,
          a,
          vertex(x, y, radius, isAbsolute),
        ),
      }
    default:
      return state
  }
}
