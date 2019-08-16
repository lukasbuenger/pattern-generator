import {
  Vector,
  Vertex,
  subtract,
  resize,
  Polygon,
  getAbsoluteBorderRadius,
} from './base'

export function previousVertex(
  vertices: Vertex[],
  index: number,
): Vertex {
  return index > 0
    ? vertices[index - 1]
    : vertices[vertices.length - 1]
}

export function nextVertex(
  vertices: Vertex[],
  index: number,
): Vertex {
  return index < vertices.length - 1
    ? vertices[index + 1]
    : vertices[0]
}

export enum PathCommands {
  MOVE = 'move',
  LINE = 'line',
  CURVE = 'curve',
  CLOSE = 'close',
}

export type MoveParams = [Vector]
export type LineParams = [Vector]
export type CurveParams = [Vector, Vector, Vector, Vector]

export interface PathCommand {
  type: PathCommands
  params: Vector[]
}

export function vertexToCommand(
  a: Vertex,
  b: Vertex,
  c: Vertex,
): PathCommand {
  const [ctrl, borderRadius, isAbsolute] = b
  if (borderRadius === 0) {
    return { type: PathCommands.LINE, params: [ctrl] }
  }
  const radius = !isAbsolute
    ? borderRadius
    : getAbsoluteBorderRadius(
        a[0],
        b[0],
        c[0],
        borderRadius,
      )

  const u = subtract(ctrl, a[0])
  const v = subtract(ctrl, c[0])
  const u2 = subtract(ctrl, resize(radius, u))
  const v2 = subtract(ctrl, resize(radius, v))

  const u2ctrl = subtract(ctrl, resize(radius / 2, u))
  const v2ctrl = subtract(ctrl, resize(radius / 2, v))

  return {
    type: PathCommands.CURVE,
    params: [u2, v2, u2ctrl, v2ctrl],
  }
}

export function polyToCommands(
  poly: Polygon,
): PathCommand[] {
  const [head, ...tail] = poly
  const firstVertexCommand = vertexToCommand(
    previousVertex(poly, 0),
    head,
    nextVertex(poly, 0),
  )
  const moveToCommand: PathCommand = {
    type: PathCommands.MOVE,
    params: firstVertexCommand.params.slice(-1),
  }
  const commands: PathCommand[] = tail.reduce(
    (acc, vertex, index) => {
      const prev = previousVertex(poly, index + 1)
      const next = nextVertex(poly, index + 1)
      acc.push(vertexToCommand(prev, vertex, next))
      return acc
    },
    [moveToCommand],
  )
  commands.push(firstVertexCommand, {
    type: PathCommands.CLOSE,
    params: [],
  })
  return commands
}

export function moveToAsString(u: Vector): string {
  return `M ${u[0]},${u[1]}`
}

export function lineToAsString(u: Vector): string {
  return `L ${u[0]},${u[1]}`
}

export function cubicBezierToAsString(
  u: Vector,
  v: Vector,
  uCtrl: Vector,
  vCtrl: Vector,
): string {
  return [
    lineToAsString(u),
    `C ${uCtrl[0]},${uCtrl[1]} ${vCtrl[0]},${vCtrl[1]} ${v[0]},${v[1]} `,
  ].join(' ')
}

export function closeAsString(): string {
  return 'z'
}

export function commandsAsString(
  commands: PathCommand[],
): string {
  return commands
    .map(({ type, params }) => {
      switch (type) {
        case PathCommands.MOVE:
          return moveToAsString(...(params as MoveParams))
        case PathCommands.LINE:
          return lineToAsString(...(params as LineParams))
        case PathCommands.CLOSE:
          return closeAsString()
        case PathCommands.CURVE:
          return cubicBezierToAsString(
            ...(params as CurveParams),
          )
        default:
          return ''
      }
    })
    .join(' ')
}

export function polyAsSVGPath(poly: Polygon): string {
  return commandsAsString(polyToCommands(poly))
}
