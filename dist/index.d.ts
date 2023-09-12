import { LsonObject, Lson, LiveObject, LiveMap, createClient } from '@liveblocks/client';
import { Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import * as react_jsx_runtime from 'react/jsx-runtime';

type LiveAirNodeType<N extends LiveAirNode<any, any, any>> = N extends LiveAirNode<infer T, any, any> ? T : never;
type LiveAirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in LiveAirNodeType<U>]: {
        type: Type;
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never;
        state: U extends LiveAirNode<Type, infer V, any> ? V : never;
    };
}[LiveAirNodeType<U>];
type NodeId = string;
type LiveAirNode<T extends string, V extends LsonObject, M extends Lson = {}> = LiveObject<{
    nodeId: string;
    type: T;
    meta: M;
    state: LiveObject<V>;
}>;
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<any, any, any>> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
};
type LiveblocksPresence = {
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

declare const liveblocksBrowserConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>>(authEndpoint: NonNullable<Parameters<typeof createClient>[0]['authEndpoint']>) => {
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[];
    useStorage: <T_1>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion> extends infer T_2 ? T_2 extends LiveblocksStorageModel<LiveAirNodeUnion> ? T_2 extends _liveblocks_core.LsonObject ? { readonly [K in keyof T_2]: _liveblocks_core.ToImmutable<Exclude<T_2[K], undefined>> | (undefined extends T_2[K] ? T_2[K] & undefined : never); } : T_2 extends _liveblocks_core.Json ? T_2 : never : never : never) => T_1, isEqual?: ((prev: T_1, curr: T_1) => boolean) | undefined) => T_1;
    RoomProvider: (props: {
        id: string;
        children: react.ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_3>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_3, isEqual?: ((prev: T_3, curr: T_3) => boolean) | undefined): T_3;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never> | null>;
    useHistory: () => _liveblocks_core.History;
    useCanUndo: () => boolean;
    useUndo: () => () => void;
    useCanRedo: () => boolean;
    useRedo: () => () => void;
    createLiveAirNode: <T_4 extends LiveAirNodeShape<LiveAirNodeUnion>["type"]>({ type, state, meta }: {
        type: T_4;
        state: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_4;
        })["state"];
        meta: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_4;
        })["meta"];
    }) => LiveAirNode<T_4, (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_4;
    })["state"], (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_4;
    })["meta"]>;
    useStorageGetNodeMap: () => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>> | null;
    useStorageGetNode: <K_1 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_1) => LiveAirNodeShape<LiveAirNodeUnion>["state"][K_1];
    useMutationCreateNode: () => (args_0: {
        type: any;
        state: any;
        meta: any;
    }) => void;
    useMutationUpdateNode: <K_2 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_2) => (value: LiveAirNodeShape<LiveAirNodeUnion>["state"][K_2]) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
};

declare const liveblocksNodeConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>>() => {
    useLostConnectionListener: (callback: (event: _liveblocks_core.LostConnectionEvent) => void) => void;
    useStatus: () => _liveblocks_core.Status;
    useErrorListener: (callback: (err: Error) => void) => void;
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[];
    useOthers: {
        (): _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_1>(selector: (others: _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_1, isEqual?: ((prev: T_1, curr: T_1) => boolean) | undefined): T_1;
    };
    useStorage: <T_2>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion> extends infer T_3 ? T_3 extends LiveblocksStorageModel<LiveAirNodeUnion> ? T_3 extends _liveblocks_core.LsonObject ? { readonly [K in keyof T_3]: _liveblocks_core.ToImmutable<Exclude<T_3[K], undefined>> | (undefined extends T_3[K] ? T_3[K] & undefined : never); } : T_3 extends _liveblocks_core.Json ? T_3 : never : never : never) => T_2, isEqual?: ((prev: T_2 | null, curr: T_2 | null) => boolean) | undefined) => T_2 | null;
    RoomProvider: (props: {
        id: string;
        children: ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta> | null;
        <T_4>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_4, isEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined): T_4 | null;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never> | null>;
    createLiveAirNode: <T_5 extends LiveAirNodeShape<LiveAirNodeUnion>["type"]>({ type, state, meta }: {
        type: T_5;
        state: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_5;
        })["state"];
        meta: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_5;
        })["meta"];
    }) => LiveAirNode<T_5, (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_5;
    })["state"], (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_5;
    })["meta"]>;
    useStorageGetNodeMap: () => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>> | null;
    useStorageGetNode: <K_1 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_1) => LiveAirNodeShape<LiveAirNodeUnion>["state"][K_1];
    useMutationCreateNode: () => (args_0: {
        type: any;
        state: any;
        meta: any;
    }) => void;
    useMutationUpdateNode: <K_2 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_2) => (value: LiveAirNodeShape<LiveAirNodeUnion>["state"][K_2]) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
    LiveblocksNodeRoomProvider: ({ userId, spaceId, serverName, children }: {
        userId: string;
        spaceId: string;
        serverName: string;
        children: () => ReactNode;
    }) => react_jsx_runtime.JSX.Element;
};

export { LiveAirNode, LiveAirNodeShape, LiveAirNodeType, LiveblocksPresence, LiveblocksStorageModel, NodeId, liveblocksBrowserConfig, liveblocksNodeConfig };
