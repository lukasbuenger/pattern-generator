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
  IntegerModulator,
} from '../../../../lib/transform/modulators'
import { ModuloModulatorControl } from './modulo-modulator-control'
import { IntegerModulatorControl } from './integer-modulator-control'
import { MultiplyModulatorControl } from './multiply-modulator-control'

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
      const target: ModulatorTypes = e.target.value
      const nextOperation =
        target === ModulatorTypes.MODULO
          ? ModuloModulator.assert(modulator)
          : target === ModulatorTypes.MULTIPLY
          ? MultiplyModulator.assert(modulator)
          : IntegerModulator.assert(modulator)
      onChange && onChange(nextOperation)
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
          <MenuItem dense value={ModulatorTypes.INTEGER}>
            To integer
          </MenuItem>
        </Select>
      </FormControl>
      {innerControl}
    </>
  )
}
