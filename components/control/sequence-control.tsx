import { FC, useCallback, ChangeEvent } from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from '@material-ui/core'

import {
  Sequence,
  SequenceTypes,
} from '../../lib/sequences'

import { ComboRangeInput } from '../form/combo-range-input'

export interface SequenceControlProps {
  sequence: Sequence
  onChange: (sequence: Sequence) => void
}

export const SequenceControl: FC<SequenceControlProps> = ({
  sequence,
  onChange,
}) => {
  const handleTypeChange = useCallback(
    (e: ChangeEvent<any>) => {
      const target: SequenceTypes = e.target.value
      onChange({ ...sequence, sequence: target })
    },
    [onChange, sequence],
  )

  const handleLengthChange = useCallback(
    (length: number) => {
      onChange({ ...sequence, length })
    },
    [onChange, sequence],
  )

  return (
    <Box display="flex" flexDirection="row">
      <FormControl margin="dense">
        <InputLabel>Type</InputLabel>
        <Select
          margin="dense"
          value={sequence.sequence}
          onChange={handleTypeChange}
        >
          <MenuItem dense value={SequenceTypes.LINEAR}>
            Linear
          </MenuItem>
          <MenuItem dense value={SequenceTypes.EXPONENTIAL}>
            Exponential
          </MenuItem>
          <MenuItem dense value={SequenceTypes.FIBONACCI}>
            Fibonacci
          </MenuItem>
        </Select>
      </FormControl>
      <ComboRangeInput
        label="Length"
        min={1}
        max={500}
        step={1}
        value={sequence.length}
        onChange={handleLengthChange}
      />
    </Box>
  )
}
