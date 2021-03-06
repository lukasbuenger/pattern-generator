import {
  FC,
  useCallback,
  ChangeEvent,
  ReactElement,
} from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import {
  Modulator,
  ModulatorTypes,
  ModuloModulator,
  MultiplyModulator,
  DivideModulator,
} from '../../interfaces/modulator'
import { ModuloModulatorControl } from './modulo-modulator-control'
import { IntegerModulatorControl } from './integer-modulator-control'
import { MultiplyModulatorControl } from './multiply-modulator-control'
import { DivideModulatorControl } from './divide-modulator-control'

export interface ModulatorControlProps {
  modulator: Modulator
  onChange?: (operation: Modulator) => void
}

export const ModulatorControl: FC<ModulatorControlProps> = ({
  modulator: modulator,
  onChange,
}) => {
  const handleTargetChange = useCallback(
    (e: ChangeEvent<any>) => {
      const type: ModulatorTypes = e.target.value
      onChange &&
        onChange(Modulator.assert(type, modulator))
    },
    [onChange, modulator],
  )

  let innerControl: ReactElement
  if (ModuloModulator.isModuloModulator(modulator)) {
    innerControl = (
      <ModuloModulatorControl
        modulator={modulator}
        onChange={onChange}
      />
    )
  } else if (
    MultiplyModulator.isMultiplyModulator(modulator)
  ) {
    innerControl = (
      <MultiplyModulatorControl
        modulator={modulator}
        onChange={onChange}
      />
    )
  } else if (DivideModulator.isDivideModulator(modulator)) {
    innerControl = (
      <DivideModulatorControl
        modulator={modulator}
        onChange={onChange}
      />
    )
  } else {
    innerControl = (
      <IntegerModulatorControl
        modulator={modulator}
        onChange={onChange}
      />
    )
  }

  return (
    <>
      <FormControl margin="dense">
        <InputLabel>Operation</InputLabel>
        <Select
          margin="dense"
          value={modulator.modulator}
          onChange={handleTargetChange}
        >
          <MenuItem dense value={ModulatorTypes.MODULO}>
            Modulo
          </MenuItem>
          <MenuItem dense value={ModulatorTypes.MULTIPLY}>
            Multiply
          </MenuItem>
          <MenuItem dense value={ModulatorTypes.DIVIDE}>
            Divide
          </MenuItem>
          <MenuItem dense value={ModulatorTypes.INTEGER}>
            To integer
          </MenuItem>
        </Select>
      </FormControl>
      {innerControl}
    </>
  )
}
