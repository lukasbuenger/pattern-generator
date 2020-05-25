import { FC, useCallback, ChangeEvent } from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import {
  Operation,
  OperationTargets,
  PolygonOperation,
  VertexOperation,
} from '../../../../lib/transform/operations'
import { VertexOperationControl } from './vertex-operation-control'
import { PolyOperationControl } from './poly-operation-control'

export interface OperationControlProps {
  operation: Operation
  onChange?: (operation: Operation) => void
}

export const OperationControl: FC<OperationControlProps> = ({
  operation,
  onChange,
}) => {
  const handleTargetChange = useCallback(
    (e: ChangeEvent<any>) => {
      const target: OperationTargets = e.target.value
      const nextOperation =
        target === OperationTargets.POLY
          ? PolygonOperation.assert(operation)
          : VertexOperation.assert(operation)
      onChange && onChange(nextOperation)
    },
    [onChange, operation],
  )

  const innerControl = PolygonOperation.isPolygonOperation(
    operation,
  ) ? (
    <PolyOperationControl
      operation={operation}
      onChange={onChange}
    />
  ) : (
    <VertexOperationControl
      operation={operation}
      onChange={onChange}
    />
  )

  return (
    <>
      <FormControl margin="dense">
        <InputLabel>Target</InputLabel>
        <Select
          margin="dense"
          value={operation.target}
          onChange={handleTargetChange}
        >
          <MenuItem dense value={OperationTargets.POLY}>
            Shape
          </MenuItem>
          <MenuItem dense value={OperationTargets.VERTEX}>
            Vertex
          </MenuItem>
        </Select>
      </FormControl>
      {innerControl}
    </>
  )
}
