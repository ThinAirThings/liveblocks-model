import { LiveMap, LiveObject, LsonObject, createClient } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

export type NodeType = {
    type: 'process' | 'pixi' | 'dom'
    key: string
    defaultProps: {
        [key: string]: any
    }
}

export type NodeTypeIndex = {
    "chrome": {
        type: 'process'
        key: 'chrome'
        defaultProps: {
            url: string
        }
    }
    "rectangle": {
        type: 'pixi'
        key: 'rectangle'
        defaultProps: {}
    },
    "vsCode": {
        type: 'process'
        key: 'vsCode'
        defaultProps: {}
    },
    "textBox": {
        type: 'pixi'
        key: 'textBox'
        defaultProps: {
            content: string
        }
    },
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
export type StorageHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage']
export type MutationHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']

export * from './hooks/useMutationNodeState'
export * from './hooks/useStorageNodeState'
export * from './hooks/useMutationCreateNode'
export * from './hooks/useMutationDeleteNode'
export * from './hooks/useMutationContainerState'
export * from './hooks/useStorageContainerState'
export * from './hooks/useStorageContainerStateMap'
export * from './hooks/useStorageNodeMap'