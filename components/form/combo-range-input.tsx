import {
  Box,
  InputBase,
  Typography,
  Slider,
} from '@material-ui/core'
import { FC, useCallback, useState, useEffect } from 'react'

export interface ComboRangeInputProps {
  label?: string
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  value: number
}

export const ComboRangeInput: FC<ComboRangeInputProps> = ({
  label,
  onChange,
  value,
  ...props
}) => {
  const [localValue, updateLocalValue] = useState(value)
  useEffect(() => {
    updateLocalValue(value)
  }, [value])

  const handleSliderChangeCommitted = useCallback(
    (_, v) => {
      onChange && onChange(v)
    },
    [onChange],
  )

  const handleSliderChange = useCallback(
    (_, v) => {
      updateLocalValue(v)
    },
    [updateLocalValue],
  )

  const handleTextFieldChange = useCallback(
    (event) => {
      const nextValue = Number(event.target.value)
      updateLocalValue(nextValue)
      onChange && onChange(nextValue)
    },
    [updateLocalValue, onChange],
  )

  return (
    <Box flexDirection="column">
      {label && (
        <Typography variant="caption">{label}</Typography>
      )}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box flexGrow={1} mr={1}>
          <Slider
            {...props}
            value={localValue}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderChangeCommitted}
          />
        </Box>
        <Box flexGrow={0} flexBasis="45px">
          <InputBase
            {...props}
            type="number"
            margin="dense"
            onChange={handleTextFieldChange}
            value={localValue}
          />
        </Box>
      </Box>
    </Box>
  )
}
