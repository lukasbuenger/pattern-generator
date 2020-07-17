import { Vector } from './vector'

export const VERTEX_NAMES = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

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
