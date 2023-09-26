import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type LiveAirNode<T extends string, V extends LsonObject, M extends Lson={}> = LiveObject<{
    nodeId: string
    type: T
    meta: M
    state: LiveObject<V>
}>

export type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string
        type: Type,
        meta: ReturnType<U['toImmutable']>['meta']
        state: ReturnType<U['toImmutable']>['state']
    }
}[AirNodeType<U>]  // This turns an index into a union

export type AirNodeType<U extends LiveAirNode<any, any, any>> = ReturnType<U['toImmutable']>['type']

export type AirNodeState<
    U extends LiveAirNode<any, any, any>
> = ReturnType<U['toImmutable']>['state']

export type LiveAirNodeState<
    U extends LiveAirNode<any, any, any>
> = LiveObject<ReturnType<U['toImmutable']>['state']>

export type AirNodeMeta<
    U extends LiveAirNode<any, any, any>
> = ReturnType<U['toImmutable']>['meta']

export type LiveblocksStorageModel<
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson={}
> = {
    meta: Meta
    nodeMap: LiveMap<string, LiveAirNodeUnion>
}

export type LiveblocksPresence = {
    displayName: string
    absoluteCursorState: Point | null
    viewportState: ViewportState
    mouseSelectionState: {
        selectionActive: boolean
        absoluteSelectionBounds: ScreenState | null
    }
    selectedNodeIds: string[]
    focusedNodeId: string | null
}