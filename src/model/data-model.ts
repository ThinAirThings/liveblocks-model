import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import { Context } from "react";
import { ImmerHook } from "use-immer";

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type LiveAirNode<
    T extends string,
    PT extends string|null,
    S extends LsonObject, 
    M extends Lson={}
> = LiveObject<{
    nodeId: string
    parentNodeId: string | null
    type: T
    parentType: PT extends string ? PT : null
    meta: M&{createdAt: string}
    links: LiveMap<string, Array<string>>
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

export type AirNodeContext<
    LiveAirNodeUnion extends LiveAirNode<any, any, any>
> = Context<ImmerHook<{
    [K in AirNodeType<LiveAirNodeUnion>]: string | null
}>>

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