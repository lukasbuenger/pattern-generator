import { useCallback, Dispatch } from 'react'
import { useApp } from './app'
import {
  ShapeState,
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

export function useUpdateVertex(
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

export function useShape(): [ShapeState, any] {
  const [state, dispatch] = useApp()
  const setPolygon = useSetPolygon(dispatch)
  const updateVertex = useUpdateVertex(dispatch)

  return [state.shape, { setPolygon, updateVertex }]
}
