import { SFC, useCallback, HTMLProps } from 'react'
import { useShape } from '../state/shape'
import { Canvas, PolygonRenderer } from '../renderer'
import styled from 'styled-components'
import { Vertex } from '../../lib/geom/base'

const Container = styled<
  SFC<
    { width?: number; height?: number } & HTMLProps<
      HTMLDivElement
    >
  >
>(({ width, height, ...props }) => <div {...props} />)`
  position: relative;
  width: ${props => props.width || 200}px;
  height: ${props => props.height || 200}px;
`

const DragButton = styled<
  SFC<{ x: number; y: number } & HTMLProps<HTMLDivElement>>
>(({ x, y, ...props }) => <div {...props} />)`
  position: absolute;
  color: white;
  background-color: grey;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`

const getPosition = (e: MouseEvent) => {
  const target = e.target && (e.target as HTMLElement)
  const rect =
    target &&
    target.parentNode &&
    (target.parentNode as HTMLElement).getBoundingClientRect()
  return (
    (rect && [
      e.clientX - rect.left,
      e.clientY - rect.top,
    ]) || [0, 0]
  )
}

const useDragHandler = (
  handler: Function
  vertex: Vertex,
  index: number,
  maxWidth: number,
  maxHeight: number,
) => {
  return useCallback(
    (e): void => {
      const [mouseX, mouseY] = getPosition(e)
      if (nextX >= 0 && )
      console.log(x, y, vertex, index)
    },
    [vertex, index],
  )
}

export const ShapeControl: SFC<{}> = () => {
  const [{ polygon } /*{ updateVertex }*/] = useShape()

  const dragHandles = polygon.map((vertex, index) => {
    const [[x, y]] = vertex
    const handleDrag = useDragHandler(vertex, index)

    return (
      <DragButton
        key={`btn-${index}`}
        x={x}
        y={y}
        draggable
        onDrag={handleDrag}
      />
    )
  })

  return (
    <Container>
      <Canvas width={400} height={400}>
        <PolygonRenderer polygon={polygon} />
      </Canvas>
      {dragHandles}
    </Container>
  )
}
