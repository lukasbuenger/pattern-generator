import { FC, useCallback, ChangeEvent } from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import {
  VertexOperation,
  VertexOperationTypes,
} from '../../interfaces/operation'
import { VERTEX_NAMES } from '../../interfaces/vertex'
import { useShape } from '../app-provider'

export interface VertexOperationControlProps {
  operation: VertexOperation
  onChange?: (operation: VertexOperation) => void
}

export const VertexOperationControl: FC<VertexOperationControlProps> = ({
  operation,
  onChange,
}) => {
  const shape = useShape()
  const vertexMenuItems = []
  for (let i = 0; i < shape.length; i += 1) {
    vertexMenuItems.push(
      <MenuItem dense key={`vertex-option-${i}`} value={i}>
        {VERTEX_NAMES[i]}
      </MenuItem>,
    )
  }
  const handleVertexChange = useCallback(
    (e: ChangeEvent<any>) => {
      const vertex: number = e.target.value
      onChange &&
        onChange({
          ...operation,
          vertex,
        })
    },
    [onChange, operation],
  )
  const handleOperationChange = useCallback(
    (e: ChangeEvent<any>) => {
      const operationType: VertexOperationTypes =
        e.target.value
      onChange &&
        onChange({
          ...operation,
          operation: operationType,
        })
    },
    [onChange, operation],
  )

  return (
    <>
      <FormControl margin="dense">
        <InputLabel>Vertex</InputLabel>
        <Select
          margin="dense"
          value={operation.vertex}
          onChange={handleVertexChange}
        >
          {vertexMenuItems}
        </Select>
      </FormControl>
      <FormControl margin="dense">
        <InputLabel>Operation</InputLabel>
        <Select
          margin="dense"
          value={operation.operation}
          onChange={handleOperationChange}
        >
          <MenuItem
            dense
            value={VertexOperationTypes.TRANSLATE_X}
          >
            Translate X
          </MenuItem>
          <MenuItem
            dense
            value={VertexOperationTypes.TRANSLATE_Y}
          >
            Translate Y
          </MenuItem>
          <MenuItem
            dense
            value={VertexOperationTypes.TRANSLATE_RADIUS}
          >
            Translate Radius
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
