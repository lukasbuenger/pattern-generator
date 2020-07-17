export type SimpleList<TItem> = TItem[]
export const SimpleList = {
  addItem<TItem>(
    list: SimpleList<TItem>,
    payload: TItem,
  ): SimpleList<TItem> {
    if (!payload) {
      return list
    }
    return list.concat(payload)
  },
  removeItem<TItem>(
    list: SimpleList<TItem>,
    target: number,
  ): SimpleList<TItem> {
    if (typeof target !== 'number') {
      return list
    }
    const nextList = [...list]
    nextList.splice(target, 1)
    return nextList
  },
  updateItem<TItem>(
    list: SimpleList<TItem>,
    target: number,
    payload: TItem,
  ): SimpleList<TItem> {
    if (typeof target !== 'number' || !payload) {
      return list
    }
    const nextList = [...list]
    nextList.splice(target, 1, payload)
    return nextList
  },
  moveItemUp<TItem>(
    list: SimpleList<TItem>,
    target: number,
  ): SimpleList<TItem> {
    if (typeof target !== 'number' || target < 1) {
      return list
    }
    const nextList = [...list]
    const [targetItem] = nextList.splice(target, 1)
    nextList.splice(target - 1, 0, targetItem)
    return nextList
  },
  moveItemDown<TItem>(
    list: SimpleList<TItem>,
    target: number,
  ): SimpleList<TItem> {
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
  },
}
