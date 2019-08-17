export type Vector = [number, number]
export function vector(
  x: number = 0,
  y: number = 0,
): Vector {
  return [x, y]
}

export function subtract(u: Vector, v: Vector): Vector {
  return [u[0] - v[0], u[1] - v[1]]
}

export function multiply(
  u: Vector,
  factor: number,
): Vector {
  return [u[0] * factor, u[1] * factor]
}

export function getLength(v: Vector): number {
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
}

export function resize(l: number, u: Vector): Vector {
  return multiply(u, l / getLength(u))
}

export function translateX(
  additive: number,
  u: Vector,
): Vector {
  return [u[0] + additive, u[1]]
}

export function translateY(
  additive: number,
  u: Vector,
): Vector {
  return [u[0], u[1] + additive]
}

export function getAbsoluteRadius(
  a: Vector,
  b: Vector,
  c: Vector,
  radius: number,
): number {
  const edgeA = 1
  const u = subtract(b, a)
  const v = subtract(b, c)
  const u2 = subtract(b, resize(edgeA, u))
  const v2 = subtract(b, resize(edgeA, v))

  const edgeC = getLength(subtract(u2, v2))

  const gamma = Math.acos(
    1 - Math.pow(edgeC, 2) / Math.pow(2 * edgeA, 2),
  )
  return radius / 2 / Math.sin(gamma / 2)
}

export type Vertex = [Vector, number, boolean]
export function vertex(
  x: number,
  y: number,
  radius: number = 0,
  isAbsolute: boolean = true,
): Vertex {
  return [vector(x, y), radius, isAbsolute]
}

export interface Polygon extends Array<Vertex> {
  0: Vertex
  1: Vertex
  2: Vertex
  [k: number]: Vertex
}
export function polygon(
  a: Vertex,
  b: Vertex,
  c: Vertex,
  ...vertices: Vertex[]
): Polygon {
  return [a, b, c, ...vertices]
}

export function replaceVertexInPoly(
  poly: Polygon,
  index: number,
  a: Vertex,
): Polygon {
  const nextPoly = [...poly]
  nextPoly.splice(index, 1, a)
  return nextPoly as Polygon
}
