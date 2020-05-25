import { Modulator } from '../transform/modulators'
import { Operation } from '../transform/operations'

export interface Transform {
  modulators: Modulator[]
  operations: Operation[]
}

type TransformState = Transform[]

enum TransformActionTypes {
  ADD_TRANSFORM = 'addTransform',
  REMOVE_TRANSFORM = 'addTransform',
  MOVE_TRANSFORM_UP = 'moveTransformUp',
  MOVE_TRANSFORM_DOWN = 'moveTransformUp',
}
const TransformActionNames = Object.values(
  TransformActionTypes,
)

interface TransformAction {
  type: TransformActionTypes
  transform?: number
  payload?: Transform
}

enum ModulatorActionTypes {
  ADD_MODULATOR = 'addModulator',
  REMOVE_MODULATOR = 'addModulator',
  MOVE_MODULATOR_UP = 'moveModulatorUp',
  MOVE_MODULATOR_DOWN = 'moveModulatorUp',
  UPDATE_MODULATOR = 'updateModulator',
  //
}

const ModulatorActionNames = Object.values(
  ModulatorActionTypes,
)

interface ModulatorAction {
  type: ModulatorActionTypes
  transform: number
  modulator?: number
  payload?: Modulator
}

enum OperationActionTypes {
  ADD_OPERATION = 'addOperation',
  REMOVE_OPERATION = 'addOperation',
  MOVE_OPERATION_UP = 'moveOperationUp',
  MOVE_OPERATION_DOWN = 'moveOperationUp',
  UPDATE_OPERATION = 'updateOperation',
}

const OperationActionNames = Object.values(
  OperationActionTypes,
)

interface OperationAction {
  type: OperationActionTypes
  transform: number
  operation?: number
  payload?: Operation
}

type Action =
  | TransformAction
  | ModulatorAction
  | OperationAction

export function transformReducer(
  state: TransformState,
  { type, payload, transform }: TransformAction,
): TransformState {
  switch (type) {
    case TransformActionTypes.ADD_TRANSFORM:
      if (!payload) {
        return state
      }
      return state.concat(payload)

    case TransformActionTypes.REMOVE_TRANSFORM:
      if (typeof transform !== 'number') {
        return state
      }
      const removeCopy = [...state]
      removeCopy.splice(transform, 1)
      return removeCopy

    case TransformActionTypes.MOVE_TRANSFORM_UP:
      if (typeof transform !== 'number' || transform < 1) {
        return state
      }
      const moveUpCopy = [...state]
      const [moveUpItem] = moveUpCopy.splice(transform, 1)
      moveUpCopy.splice(transform - 1, 0, moveUpItem)
      return moveUpCopy

    case TransformActionTypes.MOVE_TRANSFORM_DOWN:
      if (
        typeof transform !== 'number' ||
        transform > state.length - 2
      ) {
        return state
      }
      const moveDownCopy = [...state]
      const [moveDownItem] = moveDownCopy.splice(
        transform,
        1,
      )
      moveDownCopy.splice(transform + 1, 0, moveDownItem)
      return moveDownCopy
  }
}
