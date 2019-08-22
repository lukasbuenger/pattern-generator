import { SFC, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Box, CheckBox } from 'grommet'

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

const Container = styled.div<{
  width?: number
  height?: number
}>`
  position: relative;
  width: ${props => props.width || 200}px;
  height: ${props => props.height || 200}px;
`

const DragHandle = styled.div<{ selected?: boolean }>`
  position: absolute;
  font-size: ${props => props.theme.text}
  color: ${props =>
    (props.selected && props.theme.global.colors.black) ||
    props.theme.global.colors.white};
  background-color: ${props =>
    (props.selected && props.theme.global.colors.focus) ||
    props.theme.global.colors.brand};
  width: 20px;
  height: 20px;
  top: -10px;
  border-radius: 10px;
  left: -10px;
`

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

const DragButton: SFC<{
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

export const ShapeControl: SFC<{}> = () => {
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
    <Box direction="column">
      <Container>
        <Canvas>
          <PolygonRenderer polygon={currentPolygon} />
        </Canvas>
        {dragHandles}
      </Container>
    </Box>
  )
}

export const VertexForm: SFC<{
  polygon: Polygon
  vertexIndex: number
}> = ({ polygon, vertexIndex }) => {
  const [[x, y], radius, abs] = polygon[vertexIndex]
  return (
    <Box direction="column">
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
      <CheckBox checked={abs} label="Absolute radius" />
    </Box>
  )
}
