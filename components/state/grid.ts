import { useCallback, Dispatch } from 'react'
import { useApp } from './app'
import {
  GridState,
  GridActionTypes,
  GridAction,
} from '../../lib/state/grid'

export function useUpdateGrid(
  dispatch: Dispatch<GridAction>,
) {
  return useCallback(
    (
      width: number,
      height: number,
      spacing: number,
    ): void => {
      dispatch({
        type: GridActionTypes.UPDATE_GRID,
        payload: {
          width,
          height,
          spacing,
        },
      })
    },
    [dispatch],
  )
}

export function useGrid(): [GridState, any] {
  const [state, dispatch] = useApp()
  const updateGrid = useUpdateGrid(dispatch)

  return [state.grid, updateGrid]
}
