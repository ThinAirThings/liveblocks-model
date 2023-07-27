import { LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { ContainerState, Point, ScreenState, ViewportState } from "@thinairthings/zoom-utils";
type RenderedNode = {
    type: 'pixi' | 'dom';
    defaultBoxSize: {
        width: number;
        height: number;
    };
};
type NodeDataType = {
    type: 'process' | 'pixi' | 'dom';
    isCreatedBy: 'user' | 'system' | 'any';
    key: string;
    defaultProps: {
        [key: string]: any;
    };
};
export type FilterNodeKeysByProperty<P extends Partial<NodeDataType>> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];
export declare const NodeDataTypeIndex: {
    "chrome": {
        type: 'process';
        key: 'chrome';
        isCreatedBy: 'any';
        defaultProps: {
            url: string;
        };
    };
    "vsCode": {
        type: 'process';
        key: 'vsCode';
        isCreatedBy: 'any';
        defaultProps: {};
    };
    "applicationWindow": RenderedNode & {
        type: 'dom';
        key: 'applicationWindow';
        isCreatedBy: 'system';
        defaultProps: {
            cursor: string;
        };
    };
    "textBox": RenderedNode & {
        type: 'dom';
        key: 'textBox';
        isCreatedBy: 'any';
        defaultProps: {
            content: string;
        };
    };
    "rectangle": RenderedNode & {
        type: 'pixi';
        key: 'rectangle';
        isCreatedBy: 'any';
        defaultProps: {};
    };
};
export type NodeId = string;
export type AirNode<K extends keyof typeof NodeDataTypeIndex> = LiveObject<{
    nodeId: string;
    type: typeof NodeDataTypeIndex[K]['type'];
    key: typeof NodeDataTypeIndex[K]['key'];
    state: LiveObject<(typeof NodeDataTypeIndex[K]['defaultProps'] extends {
        [key: string]: any;
    } ? typeof NodeDataTypeIndex[K]['defaultProps'] : never) & (typeof NodeDataTypeIndex[K]['type'] extends ('pixi' | 'dom') ? {
        containerState: LiveObject<ContainerState>;
    } : {})>;
}>;
export type ImmutableAirNode<K extends keyof typeof NodeDataTypeIndex> = ReturnType<AirNode<K>["toImmutable"]>;
export declare function createAirNode<K extends keyof typeof NodeDataTypeIndex>({ type, key, state }: {
    type: typeof NodeDataTypeIndex[K]['type'];
    key: typeof NodeDataTypeIndex[K]['key'];
    state: (typeof NodeDataTypeIndex[K]['defaultProps'] extends {
        [key: string]: any;
    } ? typeof NodeDataTypeIndex[K]['defaultProps'] : never) & (typeof NodeDataTypeIndex[K]['type'] extends 'pixi' | 'dom' ? {
        containerState: ContainerState;
    } : {});
}): AirNode<K>;
export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<any>>;
};
export type LiveblocksPresence = {
    displayName: string;
    absoluteCursorState: Point | null;
    viewportState: ViewportState;
    mouseSelectionState: {
        selectionActive: boolean;
        absoluteSelectionBounds: ScreenState | null;
    };
    selectedNodeIds: string[];
    focusedNodeId: string | null;
};
export type StorageHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage'];
export type MutationHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'];
export * from './hooks/useMutationNodeState';
export * from './hooks/useStorageNodeState';
export * from './hooks/useMutationCreateNode';
export * from './hooks/useMutationDeleteNode';
export * from './hooks/useMutationContainerState';
export * from './hooks/useStorageContainerState';
export * from './hooks/useStorageContainerStateMap';
export * from './hooks/useStorageNodeMap';
