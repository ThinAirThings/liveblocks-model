import { LiveMap, LiveObject } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

type NodeDataType = {
    type: 'application' | 'widget' | 'whiteboard'
    renderer: 'pixi' | 'dom'
    key: string
    defaultProps: {
        [key: string]: any
    }
    defaultBoxSize: {
        width: number
        height: number
    }
}

export type DefaultBoxSize = {
    defaultBoxSize: {
        width: number
        height: number
    }
}
export type ApplicationProps = {
    appDataId: string
}
export type FilterNodeKeysByProperty<P extends Partial<NodeDataType>> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];

export const NodeDataTypeIndex:  {
    "chrome": DefaultBoxSize & {
        key: 'chrome',
        type: 'application',
        renderer: 'dom'
        defaultProps: ApplicationProps & {
            url: string
        },
    },
    "vsCode": DefaultBoxSize & {
        key: 'vsCode',
        type: 'application',
        renderer: 'dom'
        defaultProps: ApplicationProps
    }
    "textBox": DefaultBoxSize & {
        key: 'textBox',
        type: 'whiteboard',
        renderer: 'dom'
        defaultProps: {
            content: string
        }
    }
    "rectangle": DefaultBoxSize & {
        key: 'rectangle',
        type: 'whiteboard',
        renderer: 'pixi',
        defaultProps: {},
    }
    // End of Types
} = {
    "chrome": {
        key: 'chrome',
        type: 'application',
        renderer: 'dom',
        defaultProps: {
            appDataId: "default",
            url: "https://google.com"
        },
        defaultBoxSize: {
            width: 836,
            height: 600
        }
    },
    "vsCode": {
        type: 'application',
        renderer: 'dom',
        key: 'vsCode',
        defaultProps: {
            appDataId: "default",
        },
        defaultBoxSize: {
            width: 200,
            height: 50
        }
    },
    "textBox": {
        type: 'whiteboard',
        renderer: 'dom',
        key: 'textBox',
        defaultProps: {
            content: "Hello World"
        },
        defaultBoxSize: {
            width: 200,
            height: 50
        }
    },
    "rectangle": {
        type: 'whiteboard',
        renderer: 'pixi',
        key: 'rectangle',
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
    key: typeof NodeDataTypeIndex[K]['key']
    type: typeof NodeDataTypeIndex[K]['type']
    renderer: typeof NodeDataTypeIndex[K]['renderer']
    state: LiveObject<(typeof NodeDataTypeIndex[K]['defaultProps'] extends {[key: string]: any} ? typeof NodeDataTypeIndex[K]['defaultProps'] : never)
    & (
        typeof NodeDataTypeIndex[K]['renderer'] extends ('pixi' | 'dom' ) ? {
            containerState: LiveObject<ContainerState>
        } : {}
    )>
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
    const t = key
    return new LiveObject({
        nodeId: uuidv4(),
        key: NodeDataTypeIndex[key].key,
        type: NodeDataTypeIndex[key].type,
        renderer: NodeDataTypeIndex[key].renderer,
        state: new LiveObject({
            ...state,
            ...typeof state.containerState !== 'undefined' 
            ? {
                containerState: new LiveObject(state.containerState)
            } 
            : {}
        }),
        children: new LiveMap()
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