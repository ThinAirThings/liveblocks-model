import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type LiveAirNode<T extends string, S extends LsonObject, M extends Lson={}> = LiveObject<{
    nodeId: string
    type: T
    meta: M
    state: LiveObject<S>
}>

export type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string
        type: Type,
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never,
        state: U extends LiveAirNode<Type, infer V, any> ? V : never
    }
}[AirNodeType<U>]  // This turns an index into a union

export type AirNodeType<U extends LiveAirNode<any, any>> = U extends LiveAirNode<infer T, any> 
    ? T 
    : never

export type AirNodeState<
    U extends LiveAirNode<any, any, any>
> = AirNodeShape<U>['state']

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