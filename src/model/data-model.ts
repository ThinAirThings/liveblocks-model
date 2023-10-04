import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type LiveAirNode<
    T extends string,
    PT extends string,
    S extends LsonObject, 
    M extends Lson={}
> = LiveObject<{
    nodeId: string
    type: T
    parentType: PT
    meta: M&{createdAt: string}
    links: LiveObject<{
        'parent': [string]
        [type: string]: Array<string>
    }>
    state: LiveObject<S>
}>

export type AirNodeIndex<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: Pick<(
        (AirNodeShape<U> & {type: Type})
    ), "meta" | "state" | "parentType">
}

export type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string
        type: Type,
        parentType: U extends LiveAirNode<any, infer PT, any> ? PT : never
        meta: U extends LiveAirNode<Type, any, any, infer M> ? M : never,
        state: U extends LiveAirNode<Type, any, infer V> ? V : never
    }
}[AirNodeType<U>]  // This turns an index into a union

export type AirNodeType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<infer T, any, any> 
    ? T 
    : never

export type AirNodeParentType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<any, infer PT, any>
    ? PT
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