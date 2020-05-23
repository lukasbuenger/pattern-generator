import { Polygon, polygon, vertex } from '../geom'

export interface ShapeState {
  polygon: Polygon
}

export enum ShapeActionTypes {
  SET_POLYGON = 'setPolygon',
  UPDATE_VERTEX = 'updateVertex',
}

const ShapeActionNames = Object.values(ShapeActionTypes)

export interface SetPolygonAction {
  type: ShapeActionTypes
  payload: {
    polygon: Polygon
  }
}

export type ShapeAction = SetPolygonAction
export const ShapeAction = {
  isShapeAction(a: Record<string, any>): a is ShapeAction {
    return ShapeActionNames.includes(a.type)
  },
}

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
