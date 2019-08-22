import { SFC, SVGProps } from 'react'

import { Polygon, polyAsSVGPath } from '../../lib/geom'

export interface PolygonRendererProps
  extends SVGProps<SVGPathElement> {
  polygon: Polygon
}

export const PolygonRenderer: SFC<PolygonRendererProps> = ({
  polygon,
  ...props
}) => {
  return <path d={polyAsSVGPath(polygon)} {...props} />
}

export interface CanvasProps
  extends SVGProps<SVGSVGElement> {
  viewboxWidth?: number
  viewboxHeight?: number
}

export const Canvas: SFC<CanvasProps> = ({
  children,
  width,
  height,
  viewboxWidth,
  viewboxHeight,
  ...props
}) => {
  const w = width || 200
  const vW = viewboxWidth || w

  const h = height || 200
  const vH = viewboxHeight || h
  return (
    <svg
      {...props}
      width={w}
      height={h}
      viewBox={`0 0 ${vW} ${vH}`}
    >
      {children}
    </svg>
  )
}

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
        <PolygonRenderer
          key={`poly-${index}`}
          polygon={poly}
        />
      )
    },
  )
  return (
    <Canvas
      width={width}
      height={height}
      viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    >
      {renderedPolys}
    </Canvas>
  )
}
