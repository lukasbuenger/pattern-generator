import { FC } from 'react'
import { TextField } from '@material-ui/core'
import { ModuloModulator } from '../../../../lib/transform/modulators'

export interface ModuloModulatorControlProps {
  modulator: ModuloModulator
  onChange?: (modulator: ModuloModulator) => void
}

export const ModuloModulatorControl: FC<ModuloModulatorControlProps> = ({
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
