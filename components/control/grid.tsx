import { SFC, useCallback } from 'react'
import { RangeInput, Box, Text } from 'grommet'

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
      <Text as="label">Width</Text>
      <RangeInput
        min={1}
        max={maxWidth || 200}
        value={width}
        onChange={widthChangeHandler}
      />
      <Text as="label">Height</Text>
      <RangeInput
        min={1}
        max={maxHeight || 200}
        value={height}
        onChange={heightChangeHandler}
      />
      <Text as="label">Spacing</Text>
      <RangeInput
        min={0}
        max={maxSpacing || 20}
        value={spacing}
        onChange={spacingChangeHandler}
      />
    </Box>
  )
}
