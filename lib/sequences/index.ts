export enum SequenceTypes {
  LINEAR = 'linear',
  FIBONACCI = 'fibonacci',
  EXPONENTIAL = 'exponential',
}

export interface LinearSequence {
  sequence: SequenceTypes.LINEAR
  length: number
}

export const LinearSequence = {
  create(length: number): LinearSequence {
    return {
      sequence: SequenceTypes.LINEAR,
      length,
    }
  },
  isLinearSequence(
    s: Record<string, any>,
  ): s is LinearSequence {
    return s.secquence === SequenceTypes.LINEAR
  },
  walk: function* linearSequenceGenerator(
    sequence: LinearSequence,
  ) {
    let i = 0
    while (i < sequence.length - 1) {
      yield i
      i += 1
    }
    return i
  },
}

export interface FibonacciSequence {
  sequence: SequenceTypes.FIBONACCI
  length: number
}

export const FibonacciSequence = {
  create(length: number): FibonacciSequence {
    return {
      sequence: SequenceTypes.FIBONACCI,
      length,
    }
  },
  isFibonacciSequence(
    s: Record<string, any>,
  ): s is FibonacciSequence {
    return s.secquence === SequenceTypes.FIBONACCI
  },
  walk: function* fibonacciSequenceGenerator(
    sequence: FibonacciSequence,
  ) {
    let a = 0
    yield a
    let b = 1
    yield b
    let i = 2
    let next: number
    while (i < sequence.length - 1) {
      next = a + b
      yield next
      a = b
      b = next
      i += 1
    }
    return a + b
  },
}

export interface ExponentialSequence {
  sequence: SequenceTypes.EXPONENTIAL
  length: number
}

export const ExponentialSequence = {
  create(length: number): ExponentialSequence {
    return {
      sequence: SequenceTypes.EXPONENTIAL,
      length,
    }
  },
  isExponentialSequence(
    s: Record<string, any>,
  ): s is ExponentialSequence {
    return s.secquence === SequenceTypes.EXPONENTIAL
  },
  walk: function* exponentialSequenceGenerator(
    sequence: ExponentialSequence,
  ) {
    const i = 0
    let a = 0
    while (i < sequence.length - 1) {
      yield a
      a = Math.pow(a, 2)
    }
    return a
  },
}

export type Sequence =
  | LinearSequence
  | ExponentialSequence
  | FibonacciSequence

export const Sequence = {
  createDefault(): Sequence {
    return LinearSequence.create(12)
  },
}
