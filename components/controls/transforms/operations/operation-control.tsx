import {
  FC,
  useCallback,
  ChangeEvent,
  ReactElement,
} from 'react'
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
} from '../../../../lib/transform/operations'
import { VertexOperationControl } from './vertex-operation-control'
import { PolyOperationControl } from './poly-operation-control'

export interface OperationControlProps {
  operation: Operation
  onChange: (operation: Operation) => void
}

export const OperationControl: FC<OperationControlProps> = ({
  operation,
  onChange,
}) => {
  const handleTargetChange = useCallback(
    (e: ChangeEvent<any>) => {
      const target: OperationTargets = e.target.value
      onChange(Operation.assert(target, operation))
    },
    [onChange, operation],
  )

  let innerControl: ReactElement
  if (PolygonOperation.isPolygonOperation(operation)) {
    innerControl = (
      <PolyOperationControl
        operation={operation}
        onChange={onChange}
      />
    )
  } else {
    innerControl = (
      <VertexOperationControl
        operation={operation}
        onChange={onChange}
      />
    )
  }

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
