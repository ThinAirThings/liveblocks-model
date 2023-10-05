import { LiveList, LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type LiveAirNode<
    T extends string,
    S extends LsonObject, 
    M extends Lson={}
> = LiveObject<{
    nodeId: string
    parentNodeId: string | null
    type: T
    meta: M&{createdAt: string}
    children: LiveList<string>
    stateDisplayKey: keyof S & string
    state: LiveObject<S>
}>

export type AirNodeIndex<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: Pick<(
        (AirNodeShape<U> & {type: Type})
    ), "meta" | "state" | "stateDisplayKey">
}

export type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string
        parentNodeId: string | null
        type: Type,
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never,
        stateDisplayKey: keyof U extends LiveAirNode<Type, infer S> ? S : never,
        state: U extends LiveAirNode<Type, infer V> ? V : never
    }
}[AirNodeType<U>]  // This turns an index into a union

export type AirNodeType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<infer T, any, any> 
    ? T 
    : never

export type AirNodeState<
    U extends LiveAirNode<any, any, any>
> = AirNodeShape<U>['state']

export type LiveAirNodeState<
    U extends LiveAirNode<any, any, any>
> = LiveObject<AirNodeState<U>>

export type AirNodeMeta<
    U extends LiveAirNode<any, any, any>
> = AirNodeShape<U>['meta']

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