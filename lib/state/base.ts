export interface Action {
  type: string
  payload: {
    [k: string]: any
  }
}
