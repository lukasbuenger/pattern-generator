import { Dispatch, useMemo, useReducer } from 'react'

export type SimpleList<TItem> = TItem[]

enum SimpleListActionTypes {
  ADD = 'addItem',
  REMOVE = 'removeItem',
  MOVE_UP = 'moveItemUp',
  MOVE_DOWN = 'moveItemDown',
  UPDATE = 'updateItem',
  RESET = 'resetList',
}

interface SimpleListAction<TItem> {
  type: SimpleListActionTypes
  target?: number
  payload?: TItem | TItem[]
}

const addItem = <TItem>(
  list: SimpleList<TItem>,
  { payload }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  if (!payload || Array.isArray(payload)) {
    return list
  }
  return list.concat(payload)
}

const removeItem = <TItem>(
  list: SimpleList<TItem>,
  { target }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  if (typeof target !== 'number') {
    return list
  }
  const nextList = [...list]
  nextList.splice(target, 1)
  return nextList
}

const moveItemUp = <TItem>(
  list: SimpleList<TItem>,
  { target }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  if (typeof target !== 'number' || target < 1) {
    return list
  }
  const nextList = [...list]
  const [targetItem] = nextList.splice(target, 1)
  nextList.splice(target - 1, 0, targetItem)
  return nextList
}

const moveItemDown = <TItem>(
  list: SimpleList<TItem>,
  { target }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  if (
    typeof target !== 'number' ||
    target > list.length - 2
  ) {
    return list
  }
  const nextList = [...list]
  const [targetItem] = nextList.splice(target, 1)
  nextList.splice(target + 1, 0, targetItem)
  return nextList
}

const updateItem = <TItem>(
  list: SimpleList<TItem>,
  { target, payload }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  if (
    typeof target !== 'number' ||
    !payload ||
    Array.isArray(payload)
  ) {
    return list
  }
  const nextList = [...list]
  nextList.splice(target, 1, payload)
  return nextList
}

const resetList = <TItem>(
  _: SimpleList<TItem>,
  { payload }: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  return Array.isArray(payload) ? payload : []
}

type SimpleListReducer<TItem> = (
  list: SimpleList<TItem>,
  action: SimpleListAction<TItem>,
) => SimpleList<TItem>

const simpleListReducer = <TItem>(
  list: SimpleList<TItem>,
  action: SimpleListAction<TItem>,
): SimpleList<TItem> => {
  switch (action.type) {
    case SimpleListActionTypes.ADD:
      return addItem(list, action)
    case SimpleListActionTypes.REMOVE:
      return removeItem(list, action)
    case SimpleListActionTypes.UPDATE:
      return updateItem(list, action)
    case SimpleListActionTypes.MOVE_UP:
      return moveItemUp(list, action)
    case SimpleListActionTypes.MOVE_DOWN:
      return moveItemDown(list, action)
    case SimpleListActionTypes.RESET:
      return resetList(list, action)
    default:
      return list
  }
}

export interface SimpleListMethods<TItem> {
  addItem(item: TItem): void
  removeItem(target: number): void
  updateItem(target: number, item: TItem): void
  moveItemUp(target: number): void
  moveItemDown(target: number): void
  resetList(nextList?: TItem[]): void
}

const usePublicMethods = <TItem>(
  dispatch: Dispatch<SimpleListAction<TItem>>,
): SimpleListMethods<TItem> => {
  return useMemo(
    () => ({
      addItem(payload: TItem) {
        dispatch({
          type: SimpleListActionTypes.ADD,
          payload,
        })
      },
      removeItem(target: number) {
        dispatch({
          type: SimpleListActionTypes.REMOVE,
          target,
        })
      },
      updateItem(target: number, payload: TItem) {
        dispatch({
          type: SimpleListActionTypes.UPDATE,
          target,
          payload,
        })
      },
      moveItemUp(target: number) {
        dispatch({
          type: SimpleListActionTypes.MOVE_UP,
          target,
        })
      },
      moveItemDown(target: number) {
        dispatch({
          type: SimpleListActionTypes.MOVE_DOWN,
          target,
        })
      },
      resetList(payload: TItem[]) {
        dispatch({
          type: SimpleListActionTypes.RESET,
          payload,
        })
      },
    }),
    [dispatch],
  )
}

export const useSimpleList = <TItem>(
  initialValue: SimpleList<TItem>,
): [SimpleList<TItem>, SimpleListMethods<TItem>] => {
  const [list, dispatch] = useReducer<
    SimpleListReducer<TItem>
  >(simpleListReducer, initialValue)
  const methods = usePublicMethods(dispatch)
  return [list, methods]
}
