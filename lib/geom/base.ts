export type Vector = [number, number]
export const Vector = {
  // Factory
  create(x = 0, y = 0): Vector {
    return [x, y]
  },
  // Getters / Setters
  setX(u: Vector, x: number): Vector {
    return [x, u[1]]
  },
  setY(u: Vector, y: number): Vector {
    return [u[0], y]
  },
  getX(u: Vector): number {
    return u[0]
  },
  getY(u: Vector): number {
    return u[1]
  },
  // Operations
  subtract(u: Vector, v: Vector): Vector {
    return [u[0] - v[0], u[1] - v[1]]
  },
  multiply(u: Vector, factor: number): Vector {
    return [u[0] * factor, u[1] * factor]
  },
  getLength(u: Vector): number {
    return Math.sqrt(Math.pow(u[0], 2) + Math.pow(u[1], 2))
  },
  resize(u: Vector, l: number): Vector {
    return Vector.multiply(u, l / Vector.getLength(u))
  },
  translateX(u: Vector, additive: number): Vector {
    return [u[0] + additive, u[1]]
  },
  translateY(u: Vector, additive: number): Vector {
    return [u[0], u[1] + additive]
  },
  // Queries
  getAbsoluteRadius(
    u: Vector,
    v: Vector,
    w: Vector,
    radius: number,
  ): number {
    const edgeA = 1
    const u1 = Vector.subtract(v, u)
    const v1 = Vector.subtract(v, w)
    const u2 = Vector.subtract(v, Vector.resize(u1, edgeA))
    const v2 = Vector.subtract(v, Vector.resize(v1, edgeA))

    const edgeC = Vector.getLength(Vector.subtract(u2, v2))

    const gamma = Math.acos(
      1 - Math.pow(edgeC, 2) / Math.pow(2 * edgeA, 2),
    )
    return radius / 2 / Math.sin(gamma / 2)
  },
}

export type Vertex = [Vector, number, boolean]
export const Vertex = {
  // Factory
  create(
    x: number,
    y: number,
    radius = 0,
    isAbsolute = true,
  ): Vertex {
    return [Vector.create(x, y), radius, isAbsolute]
  },
  // Getters / Setters
  getX(a: Vertex): number {
    return Vector.getX(a[0])
  },
  setX(a: Vertex, x: number): Vertex {
    return [Vector.setX(a[0], x), a[1], a[2]]
  },
  getY(a: Vertex): number {
    return Vector.getY(a[0])
  },
  setY(a: Vertex, y: number): Vertex {
    return [Vector.setY(a[0], y), a[1], a[2]]
  },
  getRadius(a: Vertex): number {
    return a[1]
  },
  setRadius(a: Vertex, radius: number): Vertex {
    return [a[0], radius, a[2]]
  },
  getRadiusType(a: Vertex): boolean {
    return a[2]
  },
  setRadiusType(a: Vertex, absolute: boolean): Vertex {
    return [a[0], a[1], absolute]
  },
  getVector(a: Vertex): Vector {
    return a[0]
  },
  setVector(a: Vertex, v: Vector): Vertex {
    return [v, a[1], a[2]]
  },
  // Operations
  translateX(
    [vector, radius, absolute]: Vertex,
    additive: number,
  ): Vertex {
    return [
      Vector.translateX(vector, additive),
      radius,
      absolute,
    ]
  },
  translateY(
    [vector, radius, absolute]: Vertex,
    additive: number,
  ): Vertex {
    return [
      Vector.translateY(vector, additive),
      radius,
      absolute,
    ]
  },
  translateRadius(
    [vector, radius, absolute]: Vertex,
    additive: number,
  ): Vertex {
    return [vector, radius + additive, absolute]
  },
}

export interface Polygon extends Array<Vertex> {
  0: Vertex
  1: Vertex
  2: Vertex
  [k: number]: Vertex
}
export const Polygon = {
  // Factory
  create(
    a: Vertex,
    b: Vertex,
    c: Vertex,
    ...vertices: Vertex[]
  ): Polygon {
    return [a, b, c, ...vertices]
  },
  // Getters / Setters
  getVertex(poly: Polygon, vertexIndex: number): Vertex {
    return poly[vertexIndex]
  },
  setVertex(
    poly: Polygon,
    vertexIndex: number,
    a: Vertex,
  ): Polygon {
    const nextPoly = [...poly]
    nextPoly.splice(vertexIndex, 1, a)
    return nextPoly as Polygon
  },
  // Operations
  translateX(poly: Polygon, additive: number): Polygon {
    return poly.map((vertex) =>
      Vertex.translateX(vertex, additive),
    ) as Polygon
  },
  translateY(poly: Polygon, additive: number): Polygon {
    return poly.map((vertex) =>
      Vertex.translateY(vertex, additive),
    ) as Polygon
  },
  // Queries
  getPreviousVertex(
    poly: Polygon,
    vertexIndex: number,
  ): Vertex {
    return vertexIndex > 0
      ? poly[vertexIndex - 1]
      : poly[poly.length - 1]
  },
  getNextVertex(
    poly: Polygon,
    vertexIndex: number,
  ): Vertex {
    return vertexIndex < poly.length - 1
      ? poly[vertexIndex + 1]
      : poly[0]
  },
}
