import {
  SFC,
  useState,
  HTMLProps,
  useCallback,
} from 'react'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grommet'

import Draggable, {
  DraggableData,
  DraggableEvent,
} from 'react-draggable'
import { useShape } from '../../state/shape'
import { Canvas, PolygonRenderer } from '../../renderer'
import {
  Polygon,
  updateVertexPosition,
} from '../../../lib/geom'

const Container = styled<
  SFC<
    { width?: number; height?: number } & HTMLProps<
      HTMLDivElement
    >
  >
  // eslint-disable-next-line
>(({ width, height, ...props }) => <div {...props} />)`
  position: relative;
  width: ${props => props.width || 200}px;
  height: ${props => props.height || 200}px;
`

const DragHandle = withTheme(styled.div`
  position: absolute;
  color: white;
  background-color: ${props => props.theme.colors.main};
  width: 10px;
  height: 10px;
  top: 0;
  left: 0;
`)

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
      <DragHandle />
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
