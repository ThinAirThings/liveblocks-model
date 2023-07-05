import { LiveMap, LiveObject, LsonObject } from "@liveblocks/client"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

export type NodeTypeIndex = {
    browser: {
        type: 'browser'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {
            url: string
            cursor: string
            readyToConnect: boolean
        }
    }
    rectangle: {
        type: 'rectangle'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {}
    }
}

export type NodeId = string
export type AirNode<T extends {[key: string]: any}={}> = LiveObject<{
    nodeId: string
    type: keyof NodeTypeIndex
    state: LiveObject<T&{
        containerState: LiveObject<ContainerState>
    }>
    children: LiveMap<string, AirNode<any>>
}>
export type ImmutableAirNode<T extends {[key: string]: any}={}> = ReturnType<AirNode<T>["toImmutable"]>

export const createAirNode = <T extends LsonObject={}> ({
    type,
    state
}: {
    type: keyof NodeTypeIndex
    state: T&{containerState: ContainerState}
}): AirNode<T> => new LiveObject({
    nodeId: uuidv4(),
    type,
    state: new LiveObject({
        ...state,
        containerState: new LiveObject(state.containerState)
    }),
    // state: new LiveObject(Object.fromEntries(Object.entries(state).map(([key, value]) => {
    //     return [key, new LiveObject(value)]
    // }))),
    children: new LiveMap()
})

export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<{}>>
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