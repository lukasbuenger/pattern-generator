import { Polygon, Vertex } from '../geom'

export enum OperationTargets {
  POLY = 'polygon',
  VERTEX = 'vertex',
}

export enum PolygonOperationTypes {
  TRANSLATE_X = 'translateX',
  TRANSLATE_Y = 'translateY',
}

const PolygonOperationNames: string[] = Object.values(
  PolygonOperationTypes,
)

export interface PolygonOperation {
  target: OperationTargets.POLY
  operation: PolygonOperationTypes
}
export const PolygonOperation = {
  create(
    operation: PolygonOperationTypes,
  ): PolygonOperation {
    return { target: OperationTargets.POLY, operation }
  },
  isPolygonOperation(
    t: Record<string, any>,
  ): t is PolygonOperation {
    return t.target === OperationTargets.POLY
  },
  apply(
    { operation }: PolygonOperation,
    poly: Polygon,
    value: number,
  ): Polygon {
    switch (operation) {
      case PolygonOperationTypes.TRANSLATE_X:
        return Polygon.translateX(poly, value)
      case PolygonOperationTypes.TRANSLATE_Y:
        return Polygon.translateY(poly, value)
      default:
        return poly
    }
  },
  assertValidOperationType(
    v: string,
  ): PolygonOperationTypes {
    return PolygonOperationNames.includes(v)
      ? (v as PolygonOperationTypes)
      : PolygonOperationTypes.TRANSLATE_X
  },
  assert(o: Record<string, any>): PolygonOperation {
    if (PolygonOperation.isPolygonOperation(o)) {
      return o
    }
    return {
      target: OperationTargets.POLY,
      operation: PolygonOperation.assertValidOperationType(
        o.operation,
      ),
    }
  },
}

export enum VertexOperationTypes {
  TRANSLATE_X = 'translateX',
  TRANSLATE_Y = 'translateY',
  TRANSLATE_RADIUS = 'translateRadius',
}

const VertexOperationNames: string[] = Object.values(
  VertexOperationTypes,
)

export interface VertexOperation {
  target: OperationTargets.VERTEX
  vertex: number
  operation: VertexOperationTypes
}

export const VertexOperation = {
  create(
    vertex: number,
    operation: VertexOperationTypes,
  ): VertexOperation {
    return {
      target: OperationTargets.VERTEX,
      vertex,
      operation,
    }
  },
  isVertexOperation(
    t: Record<string, any>,
  ): t is VertexOperation {
    return t.target === OperationTargets.VERTEX
  },
  apply(
    { operation, vertex: index }: VertexOperation,
    poly: Polygon,
    value: number,
  ): Polygon {
    const vertex = poly[index]
    if (!vertex) {
      return poly
    }
    switch (operation) {
      case VertexOperationTypes.TRANSLATE_X:
        return Polygon.setVertex(
          poly,
          index,
          Vertex.translateX(vertex, value),
        )
      case VertexOperationTypes.TRANSLATE_Y:
        return Polygon.setVertex(
          poly,
          index,
          Vertex.translateY(vertex, value),
        )
      case VertexOperationTypes.TRANSLATE_RADIUS:
        return Polygon.setVertex(
          poly,
          index,
          Vertex.translateRadius(vertex, value),
        )
      default:
        return poly
    }
  },
  assertValidOperationType(
    v: string,
  ): VertexOperationTypes {
    return VertexOperationNames.includes(v)
      ? (v as VertexOperationTypes)
      : VertexOperationTypes.TRANSLATE_X
  },
  assert(o: Record<string, any>): VertexOperation {
    if (VertexOperation.isVertexOperation(o)) {
      return o
    }
    return {
      target: OperationTargets.VERTEX,
      vertex: 0,
      operation: VertexOperation.assertValidOperationType(
        o.operation,
      ),
    }
  },
}

export type Operation = VertexOperation | PolygonOperation

export const Operation = {
  createDefault(): Operation {
    return PolygonOperation.create(
      PolygonOperationTypes.TRANSLATE_X,
    )
  },
  assert(
    target: OperationTargets,
    o: Record<string, any>,
  ): Operation {
    if (target === OperationTargets.POLY) {
      return PolygonOperation.assert(o)
    }
    return VertexOperation.assert(o)
  },
}
