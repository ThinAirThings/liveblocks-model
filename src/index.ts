import { LiveMap, LiveObject } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

type RenderedNode = {
    type: 'pixi' | 'dom'
    defaultBoxSize: {
        width: number
        height: number
    }
}
type NodeDataType = {
    type: 'process' | 'pixi' | 'dom'
    isCreatedBy: 'user' | 'system' | 'any'
    key: string
    defaultProps: {
        [key: string]: any
    }
}

export type FilterNodeKeysByProperty<P extends Partial<NodeDataType>> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];

export const NodeDataTypeIndex:  {
    "chrome": NodeDataType & {
        type: 'process',
        key: 'chrome',
        isCreatedBy: 'any',
        defaultProps: {
            url: string
        }
    }
    "vsCode": NodeDataType & {
        type: 'process',
        key: 'vsCode',
        isCreatedBy: 'any',
        defaultProps: {}
    }
    "textBox": NodeDataType & RenderedNode &{
        type: 'pixi',
        key: 'textBox',
        isCreatedBy: 'any',
        defaultProps: {
            content: string
        }
    }
    "rectangle": NodeDataType & RenderedNode & {
        type: 'pixi',
        key: 'rectangle',
        isCreatedBy: 'any',
        defaultProps: {},
    }
    // End of Types
} = {
    "chrome": {
        type: 'process',
        key: 'chrome',
        isCreatedBy: 'any',
        defaultProps: {
            url: "https://google.com"
        }
    },
    "vsCode": {
        type: 'process',
        key: 'vsCode',
        isCreatedBy: 'any',
        defaultProps: {}
    },
    "textBox": {
        type: 'pixi',
        key: 'textBox',
        isCreatedBy: 'any',
        defaultProps: {
            content: "Hello World"
        },
        defaultBoxSize: {
            width: 200,
            height: 50
        }
    },
    "rectangle": {
        type: 'pixi',
        key: 'rectangle',
        isCreatedBy: 'any',
        defaultProps: {},
        defaultBoxSize: {
            width: 100,
            height: 100
        }
    },
}

export type NodeId = string
export type AirNode<K extends keyof typeof NodeDataTypeIndex> = LiveObject<{
    nodeId: string
    type: typeof NodeDataTypeIndex[K]['type']
    key: typeof NodeDataTypeIndex[K]['key']
    state: LiveObject<(typeof NodeDataTypeIndex[K]['defaultProps'] extends {[key: string]: any} ? typeof NodeDataTypeIndex[K]['defaultProps'] : never)
    & (
        typeof NodeDataTypeIndex[K]['type'] extends ('pixi' | 'dom') ? {
            containerState: LiveObject<ContainerState>
        } : {}
    )>
}>
export type ImmutableAirNode<K extends keyof typeof NodeDataTypeIndex> = ReturnType<AirNode<K>["toImmutable"]>
export function createAirNode<K extends keyof typeof NodeDataTypeIndex>({
    type,
    key,
    state
}: {
    type: typeof NodeDataTypeIndex[K]['type']
    key: typeof NodeDataTypeIndex[K]['key']
    state: (typeof NodeDataTypeIndex[K]['defaultProps'] extends {[key: string]: any} ? typeof NodeDataTypeIndex[K]['defaultProps'] : never)
    & (
        typeof NodeDataTypeIndex[K]['type'] extends 'pixi' | 'dom' ? {
            containerState: ContainerState
        } : {}
    )
}): AirNode<K> {
    const optLiveContainerState = typeof state.containerState !== 'undefined' ? {
        containerState: new LiveObject(state.containerState)
    } : {}
    return new LiveObject({
        nodeId: uuidv4(),
        type,
        key,
        state: new LiveObject({
            ...state,
            ...optLiveContainerState
        }),
        children: new LiveMap()
    }) as AirNode<K>
}

export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<any>>
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