import { FC, useState, useCallback } from 'react'
import {
  Theme,
  Box,
  Checkbox,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Draggable, {
  DraggableData,
  DraggableEvent,
} from 'react-draggable'
import {
  SVGViewport,
  PolygonRenderer,
} from '../renderer/svg'
import { Polygon, vertexNames } from '../../lib/geom'
import { ComboRangeInput } from '../form/combo-range-input'

interface DragHandleProps {
  selected?: boolean
}

const useStyles = makeStyles(
  ({ palette, spacing }: Theme) => ({
    container: {
      position: 'relative',
      width: 200,
      height: 200,
      marginTop: 13,
      marginBottom: 13,
      backgroundColor: palette.grey[200],
      marginLeft: spacing(1) + 13,
      marginright: spacing(1) + 13,
    },
    dragHandle: ({ selected }: DragHandleProps) => ({
      position: 'absolute',
      width: 26,
      height: 26,
      left: -13,
      top: -13,
      borderRadius: 13,
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor:
        (selected && palette.primary.main) ||
        palette.secondary.main,
      color:
        (selected &&
          palette.getContrastText(palette.primary.main)) ||
        palette.getContrastText(palette.secondary.main),
    }),
  }),
)

const Container: FC = ({ ...props }) => {
  const classes = useStyles()
  return <div className={classes.container} {...props} />
}

const DragHandle: FC<DragHandleProps> = ({
  selected,
  ...props
}) => {
  const classes = useStyles({ selected })
  return (
    <Typography
      {...props}
      component="span"
      variant="button"
      className={classes.dragHandle}
    />
  )
}

function useDragHandler(
  polygon: Polygon,
  vertexIndex: number,
  handler: (p: Polygon) => void,
) {
  return useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      e.preventDefault()
      e.stopPropagation()
      const { x, y } = data
      handler(
        Polygon.updateVertexPosition(
          polygon,
          vertexIndex,
          x,
          y,
        ),
      )
    },
    [polygon, vertexIndex, handler],
  )
}

function useDragStopHandler(
  polygon: Polygon,
  handler: (p: Polygon) => void,
) {
  return useCallback(
    (e: DraggableEvent) => {
      e.preventDefault()
      e.stopPropagation()
      handler(polygon)
    },
    [polygon, handler],
  )
}

const bounds = {
  top: 0,
  left: 0,
  right: 200,
  bottom: 200,
}

const DragButton: FC<{
  polygon: Polygon
  vertexIndex: number
  onDrag: (p: Polygon) => void
  onStop: (p: Polygon) => void
}> = ({ polygon, vertexIndex, onDrag, onStop }) => {
  const [[x, y]] = polygon[vertexIndex]
  const handleDrag = useDragHandler(
    polygon,
    vertexIndex,
    onDrag,
  )
  const handleDragStop = useDragStopHandler(polygon, onStop)
  return (
    <Draggable
      defaultPosition={{ x, y }}
      bounds={bounds}
      grid={[1, 1]}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <DragHandle selected>
        {vertexNames[vertexIndex]}
      </DragHandle>
    </Draggable>
  )
}

export interface ShapeControlProps {
  shape: Polygon
  onChange: (shape: Polygon) => void
}

export const ShapeControl: FC<ShapeControlProps> = ({
  shape,
  onChange,
}) => {
  const [localShape, updateLocalShape] = useState(shape)

  const dragHandles = localShape.map((_, index) => {
    return (
      <DragButton
        polygon={localShape}
        vertexIndex={index}
        onDrag={updateLocalShape}
        onStop={onChange}
        key={`btn-${index}`}
      />
    )
  })

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">Shape</Typography>
      <Container>
        <SVGViewport>
          <PolygonRenderer polygon={localShape} />
        </SVGViewport>
        {dragHandles}
      </Container>
    </Box>
  )
}

export const VertexForm: FC<{
  polygon: Polygon
  vertexIndex: number
}> = ({ polygon, vertexIndex }) => {
  const [[x, y], radius, abs] = polygon[vertexIndex]
  return (
    <Box flexDirection="column">
      <ComboRangeInput
        label="X"
        min={0}
        max={x}
        step={1}
        value={x}
      />
      <ComboRangeInput
        label="Y"
        min={0}
        max={y}
        step={1}
        value={y}
      />
      <ComboRangeInput
        label="Radius"
        min={0}
        max={200}
        step={1}
        value={radius}
      />
      <Checkbox checked={abs} />
    </Box>
  )
}
