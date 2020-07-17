import { Vertex } from './vertex'

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
