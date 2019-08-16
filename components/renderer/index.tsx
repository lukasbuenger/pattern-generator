import { SFC } from 'react'

import { Polygon, polyAsSVGPath } from '../../lib/geom'

export interface RendererProps {
  polygons: Polygon[]
  width?: number
  height?: number
  viewboxWidth?: number
  viewboxHeight?: number
}

export const Renderer: SFC<RendererProps> = ({
  polygons,
  width = 800,
  height = 800,
  viewboxWidth = 800,
  viewboxHeight = 800,
}) => {
  const renderedPolys = polygons.map(
    (poly: Polygon, index: number) => {
      return (
        <path
          key={`poly-${index}`}
          d={polyAsSVGPath(poly)}
          fill="#000"
        />
      )
    },
  )
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    >
      {renderedPolys}
    </svg>
  )
}
