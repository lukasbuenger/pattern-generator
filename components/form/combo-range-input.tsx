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
  disabled?: boolean
  onChange?: (value: number) => void
  value: number
}

export const ComboRangeInput: FC<ComboRangeInputProps> = ({
  label,
  onChange,
  value,
  disabled,
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
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
      )}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box flexGrow={1} mr={1}>
          <Slider
            disabled={disabled}
            {...props}
            value={localValue}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderChangeCommitted}
          />
        </Box>
        <Box flexGrow={0} flexBasis="45px">
          <InputBase
            disabled={disabled}
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
