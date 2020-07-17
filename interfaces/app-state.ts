import { Sequence } from './sequence'
import { Shape } from './shape'
import { Transform } from './transform'
import { Polygon } from './polygon'

export interface AppState {
  sequence: Sequence
  shape: Shape
  transforms: Transform[]
}

export const AppState = {
  create(): AppState {
    return {
      sequence: Sequence.createDefault(),
      shape: Shape.createDefault(),
      transforms: [],
    }
  },
  toPolygons({ sequence, shape, transforms }: AppState) {
    const polys: Polygon[] = []
    for (const step of Sequence.walk(sequence)) {
      polys.push(
        Transform.applyAll(transforms, shape, step),
      )
    }
    return polys
  },
}
