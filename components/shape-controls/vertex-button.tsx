import { FC, useCallback } from 'react'
import Draggable, {
  DraggableEvent,
  DraggableData,
} from 'react-draggable'

import {
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Vertex } from '../../interfaces/vertex'

const BOUNDS = {
  top: 0,
  left: 0,
  right: 200,
  bottom: 200,
}

const useStyles = makeStyles(({ palette }: Theme) => ({
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
}))

interface DragHandleProps {
  selected?: boolean
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

export interface VertexButtonProps {
  vertex: Vertex
  selected?: boolean
  onSelect: () => void
  onDrag: (p: Vertex) => void
  onStop: (p: Vertex) => void
}

export const VertexButton: FC<VertexButtonProps> = ({
  vertex,
  selected,
  children,
  onDrag,
  onStop,
  onSelect,
}) => {
  const [x, y] = Vertex.getVector(vertex)
  const handleDrag = useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      e.preventDefault()
      e.stopPropagation()
      onDrag(Vertex.setVector(vertex, [data.x, data.y]))
    },
    [onDrag, vertex],
  )
  const handleDragStop = useCallback(
    (e: DraggableEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onStop(vertex)
    },
    [onStop, vertex],
  )
  const handleSelect = useCallback(
    (e: Event) => {
      e.stopPropagation()
      onSelect()
    },
    [onSelect],
  )
  return (
    <Draggable
      defaultPosition={{ x, y }}
      bounds={BOUNDS}
      grid={[1, 1]}
      onMouseDown={handleSelect}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <DragHandle selected={selected}>
        {children}
      </DragHandle>
    </Draggable>
  )
}
