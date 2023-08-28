import { LiveMap, LiveObject } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'


export type DefaultBoxSize = {
    defaultBoxSize: {
        width: number
        height: number
    }
}
export type ApplicationProps = {
    appDataId: string
}
export type FilterNodeKeysByProperty<P> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];

export const NodeDataTypeIndex = {
    "rootThought": {
        renderer: 'pixi',
        key: 'rootThought',
        defaultProps: {
            rawPrompt: ''
        },
        defaultBoxSize: {
            width: 400,
            height: 400
        }
    },
} as const 

export type NodeId = string
export type AirNode<K extends keyof typeof NodeDataTypeIndex> = LiveObject<{
    nodeId: string
    key: typeof NodeDataTypeIndex[K]['key']
    renderer: typeof NodeDataTypeIndex[K]['renderer']
    state: LiveObject<(typeof NodeDataTypeIndex[K]['defaultProps'] extends {[key: string]: any} ? typeof NodeDataTypeIndex[K]['defaultProps'] : never)
    & {
        containerState: LiveObject<ContainerState>
    }>
}>
export type ImmutableAirNode<K extends keyof typeof NodeDataTypeIndex> = ReturnType<AirNode<K>["toImmutable"]>
export function createAirNode<K extends keyof typeof NodeDataTypeIndex>({
    key,
    state
}: {
    key: K
    state: (typeof NodeDataTypeIndex[K]['defaultProps'] extends {[key: string]: any} ? typeof NodeDataTypeIndex[K]['defaultProps'] : never)
    & (
        typeof NodeDataTypeIndex[K]['renderer'] extends 'pixi' | 'dom' ? {
            containerState: ContainerState
        } : {}
    )
}): AirNode<K> {
    return new LiveObject({
        nodeId: uuidv4(),
        key: NodeDataTypeIndex[key].key,
        renderer: NodeDataTypeIndex[key].renderer,
        state: new LiveObject({
            ...state,
            containerState: new LiveObject(state.containerState)
        }),
    }) as unknown as AirNode<K>
}

export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<keyof typeof NodeDataTypeIndex>>
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