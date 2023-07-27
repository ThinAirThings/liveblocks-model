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
export declare const NodeDataTypeIndex: {
    "chrome": {
        type: 'process';
        key: 'chrome';
        defaultProps: {
            url: string;
        };
    };
    "vsCode": {
        type: 'process';
        key: 'vsCode';
        defaultProps: {};
    };
    "textBox": RenderedNode & {
        type: 'pixi';
        key: 'textBox';
        defaultProps: {
            content: string;
        };
    };
    "rectangle": RenderedNode & {
        type: 'pixi';
        key: 'rectangle';
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
