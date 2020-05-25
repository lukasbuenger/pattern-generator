export enum ModulatorTypes {
  MODULO = 'modulo',
  MULTIPLY = 'multiply',
  INTEGER = 'integer',
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

export const Modulator = {
  createDefault(): Modulator {
    return MultiplyModulator.create(1)
  },
}
