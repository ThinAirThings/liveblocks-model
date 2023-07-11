import { LiveMap, LiveObject, LsonObject } from "@liveblocks/client"
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils"
import {v4 as uuidv4} from 'uuid'

type CommonProps = {
    renderer: 'pixi' | 'dom'
    typeDisplayName: string
    typeDisplayIcon: string
}
export type NodeTypeIndex = {
    browser: CommonProps&{
        type: 'browser'
        defaultProps: {
            url: string
            cursor: string
            readyToConnect: boolean
        }
    }
    rectangle: CommonProps&{
        type: 'rectangle'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {}
    },
    vsCode: CommonProps&{
        type: 'vsCode'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {
            readyToConnect: boolean
            cursor: string
        }
    },
    textBox: CommonProps&{
        type: 'textBox'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {
            content: string
        }
    },
    domBox: CommonProps&{
        type: 'domBox'
        typeDisplayName: string
        typeDisplayIcon: string
        defaultProps: {}
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

export * from './hooks/useMutationNodeState'
export * from './hooks/useStorageNodeState'