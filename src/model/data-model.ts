import { LiveMap, LiveObject } from "@liveblocks/client"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

export const NodeDataTypeIndex = {
    "rootThought": {
        renderer: 'dom',
        key: 'rootThought',
        defaultProps: {
            rawPrompt: ''
        },
        defaultBoxSize: {
            width: 400,
            height: 400
        }
    },
    "thought": {
        renderer: 'dom',
        key: 'thought',
        defaultProps: {
            timestamp: '',
            rawThought: '',
            mainIdea: '',
            keyPoints: [] as string[],
            abstract: '',
            trainOfThought:  [] as string[],
        },
        defaultBoxSize: {
            width: 400,
            height: 400
        }
    },
    "basicStockChart": {
        renderer: 'dom',
        key: 'basicStockChart',
        defaultProps: {
            data: [] as Array<{time: string, value: number}>
        },
        defaultBoxSize: {
            width: 600,
            height: 400
        }
    },
    "SimpleLineChart": {
        renderer: 'dom',
        key: 'SimpleLineChart',
        defaultProps: {
            chartTitle: '' as string,
            xLabel: '' as string,
            yLabel: '' as string,
            data: [] as Array<{x: number, y: number}>
        },
        defaultBoxSize: {
            width: 600,
            height: 400
        }
    },
    "PieChart": {
        renderer: 'dom',
        key: 'PieChart',
        defaultProps: {
            chartTitle: '' as string,
            data: [] as Array<{name: string, value: number}>
        },
        defaultBoxSize: {
            width: 600,
            height: 400
        }
    }
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