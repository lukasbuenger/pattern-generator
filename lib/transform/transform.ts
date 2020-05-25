import { Modulator } from './modulators'
import { Operation } from './operations'

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
}
