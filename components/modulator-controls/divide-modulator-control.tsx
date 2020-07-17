import { FC } from 'react'
import { TextField } from '@material-ui/core'
import { DivideModulator } from '../../interfaces/modulator'

export interface DivideModulatorControlProps {
  modulator: DivideModulator
  onChange?: (modulator: DivideModulator) => void
}

export const DivideModulatorControl: FC<DivideModulatorControlProps> = ({
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
