export enum ModulatorTypes {
  MODULO = 'modulo',
  MULTIPLY = 'multiply',
  INTEGER = 'integer',
  DIVIDE = 'divide',
}

export interface ModuloModulator {
  modulator: ModulatorTypes.MODULO
  value: number
}
export const ModuloModulator = {
  create(value: number): ModuloModulator {
    return { modulator: ModulatorTypes.MODULO, value }
  },
  isModuloModulator(
    f: Record<string, any>,
  ): f is ModuloModulator {
    return f.modulator === ModulatorTypes.MODULO
  },
  apply({ value }: ModuloModulator, input: number): number {
    return input % value
  },
  assert(m: Record<string, any>): ModuloModulator {
    if (ModuloModulator.isModuloModulator(m)) {
      return m
    }
    return {
      modulator: ModulatorTypes.MODULO,
      value: m.value ?? 1,
    }
  },
}

export interface MultiplyModulator {
  modulator: ModulatorTypes.MULTIPLY
  value: number
}
export const MultiplyModulator = {
  create(value: number): MultiplyModulator {
    return { modulator: ModulatorTypes.MULTIPLY, value }
  },
  isMultiplyModulator(
    f: Record<string, any>,
  ): f is MultiplyModulator {
    return f.modulator === ModulatorTypes.MULTIPLY
  },
  apply(
    { value }: MultiplyModulator,
    input: number,
  ): number {
    return input * value
  },
  assert(m: Record<string, any>): MultiplyModulator {
    if (MultiplyModulator.isMultiplyModulator(m)) {
      return m
    }
    return {
      modulator: ModulatorTypes.MULTIPLY,
      value: m.value ?? 1,
    }
  },
}

export interface DivideModulator {
  modulator: ModulatorTypes.DIVIDE
  value: number
}
export const DivideModulator = {
  create(value: number): DivideModulator {
    return { modulator: ModulatorTypes.DIVIDE, value }
  },
  isDivideModulator(
    f: Record<string, any>,
  ): f is DivideModulator {
    return f.modulator === ModulatorTypes.DIVIDE
  },
  assert(m: Record<string, any>): DivideModulator {
    if (DivideModulator.isDivideModulator(m)) {
      return m
    }
    return {
      modulator: ModulatorTypes.DIVIDE,
      value: m.value ?? 1,
    }
  },
  apply({ value }: DivideModulator, input: number): number {
    return input / value
  },
}

export enum IntegerConversionTypes {
  ROUND = 'round',
  FLOOR = 'floor',
  CEIL = 'ceil',
}
export interface IntegerModulator {
  modulator: ModulatorTypes.INTEGER
  conversionType: IntegerConversionTypes
}

export const IntegerModulator = {
  create(
    conversionType: IntegerConversionTypes,
  ): IntegerModulator {
    return {
      modulator: ModulatorTypes.INTEGER,
      conversionType,
    }
  },
  isIntegerModulator(
    f: Record<string, any>,
  ): f is IntegerModulator {
    return f.modulator === ModulatorTypes.INTEGER
  },
  apply(
    { conversionType }: IntegerModulator,
    input: number,
  ): number {
    return conversionType === IntegerConversionTypes.ROUND
      ? Math.round(input)
      : conversionType === IntegerConversionTypes.CEIL
      ? Math.ceil(input)
      : Math.floor(input)
  },
  assert(m: Record<string, any>): IntegerModulator {
    if (IntegerModulator.isIntegerModulator(m)) {
      return m
    }
    return {
      modulator: ModulatorTypes.INTEGER,
      conversionType: IntegerConversionTypes.ROUND,
    }
  },
}

export type Modulator =
  | ModuloModulator
  | MultiplyModulator
  | IntegerModulator
  | DivideModulator

export const Modulator = {
  createDefault(): Modulator {
    return MultiplyModulator.create(1)
  },
  assert(
    type: ModulatorTypes,
    m: Record<string, any>,
  ): Modulator {
    if (type === ModulatorTypes.MODULO) {
      return ModuloModulator.assert(m)
    } else if (type === ModulatorTypes.MULTIPLY) {
      return MultiplyModulator.assert(m)
    } else if (type === ModulatorTypes.DIVIDE) {
      return DivideModulator.assert(m)
    } else {
      return IntegerModulator.assert(m)
    }
  },
  apply(m: Modulator, input: number): number {
    if (ModuloModulator.isModuloModulator(m)) {
      return ModuloModulator.apply(m, input)
    } else if (IntegerModulator.isIntegerModulator(m)) {
      return IntegerModulator.apply(m, input)
    } else if (DivideModulator.isDivideModulator(m)) {
      return DivideModulator.apply(m, input)
    } else {
      return MultiplyModulator.apply(m, input)
    }
  },
}
