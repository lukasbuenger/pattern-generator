import { FC, useState, useCallback } from 'react'
import {
  Theme,
  Box,
  Checkbox,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface ContainerProps {
  width?: number
  height?: number
}

interface DragHandleProps {
  selected?: boolean
}

type StyleProps = ContainerProps & DragHandleProps

const useStyles = makeStyles(({ palette }: Theme) => ({
  container: ({ width, height }: StyleProps) => ({
    position: 'relative',
    width: width,
    height: height,
  }),
  dragHandle: ({ selected }: StyleProps) => ({
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
}))

import Draggable, {
  DraggableData,
  DraggableEvent,
} from 'react-draggable'
import { useShape } from '../../state/shape'
import { Canvas, PolygonRenderer } from '../../renderer'
import {
  Polygon,
  updateVertexPosition,
  vertexNames,
} from '../../../lib/geom'
import { ComboRangeInput } from '../../form/combo-range-input'

const Container: FC<ContainerProps> = ({
  width = 200,
  height = 200,
  ...props
}) => {
  const classes = useStyles({ width, height })
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
  handler: Function,
) {
  return useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      e.preventDefault()
      e.stopPropagation()
      const { x, y } = data
      handler(
        updateVertexPosition(polygon, vertexIndex, x, y),
      )
    },
    [polygon, vertexIndex, handler],
  )
}

function useDragStopHandler(
  polygon: Polygon,
  handler: Function,
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

const DragButton: FC<{
  polygon: Polygon
  vertexIndex: number
  onDrag: Function
  onStop: Function
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
      bounds="parent"
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

export const ShapeControl: FC<{}> = () => {
  const [polygon, setPolygon] = useShape()
  const [currentPolygon, updateCurrentPolygon] = useState(
    polygon,
  )

  const dragHandles = currentPolygon.map((_, index) => {
    return (
      <DragButton
        polygon={currentPolygon}
        vertexIndex={index}
        onDrag={updateCurrentPolygon}
        onStop={setPolygon}
        key={`btn-${index}`}
      />
    )
  })

  return (
    <Box display="flex" flexDirection="column">
      <Container>
        <Canvas>
          <PolygonRenderer polygon={currentPolygon} />
        </Canvas>
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
