import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"


export type LiveAirNodeType<N extends LiveAirNode<any, any, any>> = N extends LiveAirNode<infer T, any, any> 
    ? T 
    : never

export type LiveAirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in LiveAirNodeType<U>]: {
        nodeId: string
        type: Type,
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never,
        state: U extends LiveAirNode<Type, infer V, any> ? V : never
    }
}[LiveAirNodeType<U>]  // This turns an index into a union

export type NodeId = string
export type LiveAirNode<T extends string, V extends LsonObject, M extends Lson={}> = LiveObject<{
    nodeId: string
    type: T
    meta: M
    state: LiveObject<V>
}>

export type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<any, any, any>> = {
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