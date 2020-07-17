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
