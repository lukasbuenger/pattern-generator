import { SFC, useCallback } from 'react'
import { Box } from '@material-ui/core'
import { ComboRangeInput } from '../form/combo-range-input'

export interface GridControlProps {
  width?: number
  height?: number
  spacing?: number
  maxWidth?: number
  maxHeight?: number
  maxSpacing?: number
  onChange?: (
    width: number,
    height: number,
    spacing: number,
  ) => void
}

export const GridControl: SFC<GridControlProps> = ({
  width = 1,
  height = 1,
  spacing = 0,
  onChange,
  maxWidth,
  maxHeight,
  maxSpacing,
}) => {
  const widthChangeHandler = useCallback(
    value => {
      return onChange && onChange(value, height, spacing)
    },
    [onChange, height, spacing],
  )
  const heightChangeHandler = useCallback(
    value => {
      return onChange && onChange(width, value, spacing)
    },
    [onChange, width, spacing],
  )
  const spacingChangeHandler = useCallback(
    value => {
      return onChange && onChange(width, height, value)
    },
    [onChange, width, height],
  )

  return (
    <Box flexDirection="column">
      <ComboRangeInput
        label="Width"
        min={1}
        max={maxWidth || 200}
        step={1}
        value={width}
        onChange={widthChangeHandler}
      />
      <ComboRangeInput
        label="Height"
        min={1}
        max={maxHeight || 200}
        step={1}
        value={height}
        onChange={heightChangeHandler}
      />
      <ComboRangeInput
        label="Spacing"
        min={0}
        max={maxSpacing || 20}
        step={1}
        value={spacing}
        onChange={spacingChangeHandler}
      />
    </Box>
  )
}
