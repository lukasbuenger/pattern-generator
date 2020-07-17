import { FC } from 'react'
import { TextField } from '@material-ui/core'
import { MultiplyModulator } from '../../../../lib/transform/modulators'

export interface MultiplyModulatorControlProps {
  modulator: MultiplyModulator
  onChange?: (modulator: MultiplyModulator) => void
}

export const MultiplyModulatorControl: FC<MultiplyModulatorControlProps> = ({
  modulator,
  onChange,
}) => {
  return (
    <TextField
      label="Value"
      type="number"
      margin="dense"
      value={modulator.value}
      onChange={(e) => {
        onChange &&
          onChange({
            ...modulator,
            value: Number(e.target.value),
          })
      }}
    />
  )
}
