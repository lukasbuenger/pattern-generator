import { FC } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import {
  IntegerModulator,
  IntegerConversionTypes,
} from '../../../../lib/transform/modulators'

export interface IntegerModulatorControlProps {
  modulator: IntegerModulator
  onChange?: (modulator: IntegerModulator) => void
}

export const IntegerModulatorControl: FC<IntegerModulatorControlProps> = ({
  modulator,
  onChange,
}) => {
  return (
    <FormControl margin="dense">
      <InputLabel>Method</InputLabel>
      <Select
        margin="dense"
        value={modulator.conversionType}
        onChange={(e) => {
          onChange &&
            onChange({
              ...modulator,
              conversionType: e.target
                .value as IntegerConversionTypes,
            })
        }}
      >
        <MenuItem
          dense
          value={IntegerConversionTypes.ROUND}
        >
          Round
        </MenuItem>
        <MenuItem
          dense
          value={IntegerConversionTypes.FLOOR}
        >
          Floor
        </MenuItem>
        <MenuItem dense value={IntegerConversionTypes.CEIL}>
          Ceil
        </MenuItem>
      </Select>
    </FormControl>
  )
}
