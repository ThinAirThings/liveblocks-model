import { LiveMap, LiveObject, LsonObject } from "@liveblocks/client"
import { Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"


export type LiveAirNodeType<N extends LiveAirNode<any, any>> = N extends LiveAirNode<infer T, any> 
    ? T 
    : never

export type LiveAirNodeShapeUnion<U extends LiveAirNode<any, any>> = {
    [Type in LiveAirNodeType<U>]: {
        type: Type,
        state: U extends LiveAirNode<Type, infer V> ? V : never
    }
}[LiveAirNodeType<U>]  // This turns an index into a union

export type NodeId = string
export type LiveAirNode<T extends string, V extends LsonObject> = LiveObject<{
    nodeId: string
    type: T
    state: LiveObject<V>
}>

export type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<any, any>> = {
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