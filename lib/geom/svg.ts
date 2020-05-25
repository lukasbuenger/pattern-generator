import { Vector, Vertex, Polygon } from './base'

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

export enum PathCommandTypes {
  MOVE = 'move',
  LINE = 'line',
  CURVE = 'curve',
  CLOSE = 'close',
}

type MoveCommand = {
  type: PathCommandTypes.MOVE
  params: MoveParams
}

const MoveCommand = {
  create(...params: MoveParams): MoveCommand {
    return { type: PathCommandTypes.MOVE, params }
  },
  isMoveCommand(a: Record<string, any>): a is MoveCommand {
    return a.type === PathCommandTypes.MOVE
  },
  toSVGString([u]: MoveParams): string {
    return `M ${u[0]},${u[1]}`
  },
}

type LineCommand = {
  type: PathCommandTypes.LINE
  params: LineParams
}

const LineCommand = {
  create(...params: LineParams): LineCommand {
    return { type: PathCommandTypes.LINE, params }
  },
  isLineCommand(a: Record<string, any>): a is LineCommand {
    return a.type === PathCommandTypes.LINE
  },
  toSVGString([u]: LineParams): string {
    return `L ${u[0]},${u[1]}`
  },
}

type CurveCommand = {
  type: PathCommandTypes.CURVE
  params: CurveParams
}

const CurveCommand = {
  create(...params: CurveParams): CurveCommand {
    return { type: PathCommandTypes.CURVE, params }
  },
  isCurveCommand(
    a: Record<string, any>,
  ): a is CurveCommand {
    return a.type === PathCommandTypes.CURVE
  },
  toSVGString([u, v, uCtrl, vCtrl]: CurveParams): string {
    return [
      LineCommand.toSVGString([u]),
      `C ${uCtrl[0]},${uCtrl[1]} ${vCtrl[0]},${vCtrl[1]} ${v[0]},${v[1]} `,
    ].join(' ')
  },
}

type CloseCommand = {
  type: PathCommandTypes.CLOSE
}

const CloseCommand = {
  create(): CloseCommand {
    return { type: PathCommandTypes.CLOSE }
  },
  isCloseCommand(
    a: Record<string, any>,
  ): a is CloseCommand {
    return a.type === PathCommandTypes.CLOSE
  },
  toSVGString(): string {
    return 'z'
  },
}

export type MoveParams = [Vector]
export type LineParams = [Vector]
export type CurveParams = [Vector, Vector, Vector, Vector]

export type PathCommands =
  | MoveCommand
  | LineCommand
  | CurveCommand
  | CloseCommand

export const PathCommands = {
  fromVertex(a: Vertex, b: Vertex, c: Vertex) {
    const [ctrl, radius, isAbsolute] = b
    if (radius === 0) {
      return LineCommand.create(ctrl)
    }
    const r = !isAbsolute
      ? radius
      : Vector.getAbsoluteRadius(a[0], b[0], c[0], radius)

    const u = Vector.subtract(ctrl, a[0])
    const v = Vector.subtract(ctrl, c[0])
    const u2 = Vector.subtract(ctrl, Vector.resize(u, r))
    const v2 = Vector.subtract(ctrl, Vector.resize(v, r))

    const u2ctrl = Vector.subtract(
      ctrl,
      Vector.resize(u, r / 2),
    )
    const v2ctrl = Vector.subtract(
      ctrl,
      Vector.resize(v, r / 2),
    )
    return CurveCommand.create(u2, v2, u2ctrl, v2ctrl)
  },
  fromPoly(poly: Polygon) {
    const [head, ...tail] = poly
    const firstVertexCommand = PathCommands.fromVertex(
      previousVertex(poly, 0),
      head,
      nextVertex(poly, 0),
    )
    const moveToCommand = MoveCommand.create(
      firstVertexCommand.params.slice(-1)[0],
    )
    const commands: PathCommands[] = [moveToCommand]

    for (let i = 0; i < tail.length; i += 1) {
      const prev = previousVertex(poly, i + 1)
      const next = nextVertex(poly, i + 1)
      commands.push(
        PathCommands.fromVertex(prev, tail[i], next),
      )
    }
    commands.push(firstVertexCommand, CloseCommand.create())
    return commands
  },
  toSVGString(commands: PathCommands[]): string {
    return commands
      .map((command) => {
        if (MoveCommand.isMoveCommand(command)) {
          return MoveCommand.toSVGString(command.params)
        }
        if (LineCommand.isLineCommand(command)) {
          return LineCommand.toSVGString(command.params)
        }
        if (CurveCommand.isCurveCommand(command)) {
          return CurveCommand.toSVGString(command.params)
        }
        if (CloseCommand.isCloseCommand(command)) {
          return CloseCommand.toSVGString()
        }
      })
      .join(' ')
  },
}

export function polyAsSVGPath(poly: Polygon): string {
  return PathCommands.toSVGString(
    PathCommands.fromPoly(poly),
  )
}
