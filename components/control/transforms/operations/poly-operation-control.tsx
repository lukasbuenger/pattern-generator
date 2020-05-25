import { FC, useCallback, ChangeEvent } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import {
  PolygonOperation,
  PolygonOperationTypes,
} from '../../../../lib/transform/operations'

export interface PolyOperationControlProps {
  operation: PolygonOperation
  onChange?: (operation: PolygonOperation) => void
}

export const PolyOperationControl: FC<PolyOperationControlProps> = ({
  operation,
  onChange,
}) => {
  const handleOperationChange = useCallback(
    (e: ChangeEvent<any>) => {
      const operationType: PolygonOperationTypes =
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
    <FormControl margin="dense">
      <InputLabel>Operation</InputLabel>
      <Select
        margin="dense"
        value={operation.operation}
        onChange={handleOperationChange}
      >
        <MenuItem
          dense
          value={PolygonOperationTypes.TRANSLATE_X}
        >
          Translate X
        </MenuItem>
        <MenuItem
          dense
          value={PolygonOperationTypes.TRANSLATE_Y}
        >
          Translate Y
        </MenuItem>
      </Select>
    </FormControl>
  )
}
