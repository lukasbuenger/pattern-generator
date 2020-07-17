import { Modulator } from './modulator'
import { Operation } from './operation'
import { Polygon } from './polygon'

export interface Transform {
  name: string
  modulators: Modulator[]
  operations: Operation[]
}

export const Transform = {
  create(name?: string): Transform {
    return {
      name: name || 'Untitled',
      modulators: [],
      operations: [],
    }
  },
  apply(
    { modulators, operations }: Transform,
    poly: Polygon,
    input: number,
  ): Polygon {
    const value = modulators.reduce(
      (acc, m) => Modulator.apply(m, acc),
      input,
    )
    return operations.reduce(
      (acc, o) => Operation.apply(o, acc, value),
      poly,
    )
  },
  applyAll(
    transforms: Transform[],
    poly: Polygon,
    input: number,
  ): Polygon {
    return transforms.reduce(
      (acc, t) => Transform.apply(t, acc, input),
      poly,
    )
  },
}
