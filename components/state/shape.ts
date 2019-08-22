import { useCallback, Dispatch } from 'react'
import { useApp } from './app'
import {
  ShapeActionTypes,
  ShapeAction,
} from '../../lib/state/shape'
import { Polygon } from '../../lib/geom'

export function useSetPolygon(
  dispatch: Dispatch<ShapeAction>,
) {
  return useCallback(
    (polygon: Polygon): void => {
      dispatch({
        type: ShapeActionTypes.SET_POLYGON,
        payload: {
          polygon,
        },
      })
    },
    [dispatch],
  )
}

export function useShape(): [
  Polygon,
  (polygon: Polygon) => void,
] {
  const [state, dispatch] = useApp()
  const setPolygon = useSetPolygon(dispatch)

  return [state.shape.polygon, setPolygon]
}
