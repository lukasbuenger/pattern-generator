import { Polygon } from './polygon'
import { Vertex } from './vertex'

export type Shape = Polygon
export const Shape = {
  createDefault(): Shape {
    return Polygon.create(
      Vertex.create(0, 200),
      Vertex.create(100, 0),
      Vertex.create(200, 200),
    )
  },
}
