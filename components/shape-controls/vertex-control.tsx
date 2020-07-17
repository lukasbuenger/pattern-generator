import { Vertex } from '../../interfaces/vertex'
import { FC } from 'react'
import {
  Box,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { ComboRangeInput } from '../form/combo-range-input'

const emptyVertex: Vertex = [[0, 0], 0, false]

interface VertexControlProps {
  vertex?: Vertex
  onChange: (vertex: Vertex) => void
}
export const VertexControl: FC<VertexControlProps> = ({
  vertex,
  onChange,
}) => {
  const disabled = !vertex
  const [pos, radius, abs] = vertex || emptyVertex
  const [x, y] = pos
  return (
    <Box>
      <ComboRangeInput
        label="X"
        disabled={disabled}
        min={0}
        max={200}
        step={1}
        value={x ?? 0}
        onChange={(v) => {
          vertex && onChange(Vertex.setX(vertex, v))
        }}
      />
      <ComboRangeInput
        label="Y"
        disabled={disabled}
        min={0}
        max={y}
        step={200}
        value={y}
        onChange={(v) => {
          vertex && onChange(Vertex.setY(vertex, v))
        }}
      />
      <ComboRangeInput
        label="Radius"
        disabled={disabled}
        min={0}
        max={100}
        step={1}
        value={radius}
        onChange={(v) => {
          vertex && onChange(Vertex.setRadius(vertex, v))
        }}
      />
      <FormControlLabel
        control={
          <Switch
            disabled={disabled}
            checked={abs}
            onChange={(_, v) => {
              vertex &&
                onChange(Vertex.setRadiusType(vertex, v))
            }}
          />
        }
        label="Absolute radius"
      />
    </Box>
  )
}
