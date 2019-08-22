import { SFC, useCallback } from 'react'
import { Box } from 'grommet'
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
    event => {
      return (
        onChange &&
        onChange(event.target.value, height, spacing)
      )
    },
    [onChange, height, spacing],
  )
  const heightChangeHandler = useCallback(
    event => {
      return (
        onChange &&
        onChange(width, event.target.value, spacing)
      )
    },
    [onChange, width, spacing],
  )
  const spacingChangeHandler = useCallback(
    event => {
      return (
        onChange &&
        onChange(width, height, event.target.value)
      )
    },
    [onChange, width, height],
  )

  return (
    <Box direction="column">
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
