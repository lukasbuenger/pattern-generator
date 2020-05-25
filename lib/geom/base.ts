export type Vector = [number, number]

export const Vector = {
  create(x = 0, y = 0): Vector {
    return [x, y]
  },
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
  getAbsoluteRadius(
    a: Vector,
    b: Vector,
    c: Vector,
    radius: number,
  ): number {
    const edgeA = 1
    const u = Vector.subtract(b, a)
    const v = Vector.subtract(b, c)
    const u2 = Vector.subtract(b, Vector.resize(u, edgeA))
    const v2 = Vector.subtract(b, Vector.resize(v, edgeA))

    const edgeC = Vector.getLength(Vector.subtract(u2, v2))

    const gamma = Math.acos(
      1 - Math.pow(edgeC, 2) / Math.pow(2 * edgeA, 2),
    )
    return radius / 2 / Math.sin(gamma / 2)
  },
}

export type Vertex = [Vector, number, boolean]
export const Vertex = {
  create(
    x: number,
    y: number,
    radius = 0,
    isAbsolute = true,
  ): Vertex {
    return [Vector.create(x, y), radius, isAbsolute]
  },
  translateX(
    [vector, a, b]: Vertex,
    additive: number,
  ): Vertex {
    return [Vector.translateX(vector, additive), a, b]
  },
  translateY(
    [vector, a, b]: Vertex,
    additive: number,
  ): Vertex {
    return [Vector.translateY(vector, additive), a, b]
  },
  translateRadius(
    [vector, a, b]: Vertex,
    additive: number,
  ): Vertex {
    return [vector, a + additive, b]
  },
}

export interface Polygon extends Array<Vertex> {
  0: Vertex
  1: Vertex
  2: Vertex
  [k: number]: Vertex
}

export const Polygon = {
  create(
    a: Vertex,
    b: Vertex,
    c: Vertex,
    ...vertices: Vertex[]
  ): Polygon {
    return [a, b, c, ...vertices]
  },
  replaceVertex(
    poly: Polygon,
    index: number,
    a: Vertex,
  ): Polygon {
    const nextPoly = [...poly]
    nextPoly.splice(index, 1, a)
    return nextPoly as Polygon
  },
  updateVertexPosition(
    poly: Polygon,
    index: number,
    x: number,
    y: number,
  ): Polygon {
    const [, radius, abs] = poly[index]
    return Polygon.replaceVertex(poly, index, [
      [x, y],
      radius,
      abs,
    ])
  },
  updateVertexRadius(
    poly: Polygon,
    index: number,
    radius: number,
  ): Polygon {
    const [pos, , abs] = poly[index]
    return Polygon.replaceVertex(poly, index, [
      pos,
      radius,
      abs,
    ])
  },
  updateVertexRadiusType(
    poly: Polygon,
    index: number,
    absolute: boolean,
  ): Polygon {
    const [pos, radius] = poly[index]
    return Polygon.replaceVertex(poly, index, [
      pos,
      radius,
      absolute,
    ])
  },
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
  getPreviousVertex(poly: Polygon, index: number): Vertex {
    return index > 0
      ? poly[index - 1]
      : poly[poly.length - 1]
  },
  getNextVertex(poly: Polygon, index: number): Vertex {
    return index < poly.length - 1
      ? poly[index + 1]
      : poly[0]
  },
}
