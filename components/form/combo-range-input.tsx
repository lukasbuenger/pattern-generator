import {
  Box,
  InputBase,
  Typography,
  Slider,
} from '@material-ui/core'
import { FC, useCallback } from 'react'

export interface ComboRangeInputProps {
  label?: string
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  value?: number
}

export const ComboRangeInput: FC<ComboRangeInputProps> = ({
  label,
  onChange,
  ...props
}) => {
  const handleSliderChange = useCallback(
    (_, value) => {
      onChange && onChange(value)
    },
    [onChange],
  )

  const handleTextFieldChange = useCallback(
    event => {
      onChange && onChange(Number(event.target.value))
    },
    [onChange],
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
            onChange={handleSliderChange}
          />
        </Box>
        <Box flexGrow={0} flexBasis="45px">
          <InputBase
            type="number"
            margin="dense"
            onChange={handleTextFieldChange}
            {...props}
          />
        </Box>
      </Box>
    </Box>
  )
}
