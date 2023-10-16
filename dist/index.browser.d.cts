import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, T as TypedNodeIndex, c as AirNode, S as StatelessAirNodeUnion } from './data-model-846651b6.js';
export { d as StatelessAirNode, U as UnionToIntersection, e as createNodeEntry } from './data-model-846651b6.js';
import * as _liveblocks_react from '@liveblocks/react';
import { createRoomContext } from '@liveblocks/react';
import * as react from 'react';
import { FC, ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { JsonObject, createClient, Lson, LiveMap, LiveObject, LsonObject } from '@liveblocks/client';

declare const liveblocksBrowserConfig: <Index extends AirNodeIndex<any>, U extends AirNodeUnion<Index>, LiveblocksStorage extends LiveblocksStorageModel<LiveAirNode<U>>, LiveblocksPresence extends JsonObject = {}>(NodeIndex: Index, createClientProps: Parameters<typeof createClient>[0], initialLiveblocksPresence: LiveblocksPresence, initialLiveblocksStorage: LiveblocksStorage) => {
    NodeIndex: TypedNodeIndex<Index, U>;
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never> | null>;
    RoomProvider: (props: {
        id: string;
        children: react.ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorage | ((roomId: string) => LiveblocksStorage) | undefined;
    }) => JSX.Element;
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never>;
    useStatus: () => _liveblocks_core.Status;
    useBatch: <T>() => (callback: () => T) => T;
    useBroadcastEvent: () => (event: never, options?: _liveblocks_core.BroadcastOptions | undefined) => void;
    useLostConnectionListener: (callback: (event: _liveblocks_core.LostConnectionEvent) => void) => void;
    useErrorListener: (callback: (err: Error) => void) => void;
    useEventListener: (callback: (eventData: {
        connectionId: number;
        event: never;
    }) => void) => void;
    useHistory: () => _liveblocks_core.History;
    useUndo: () => () => void;
    useRedo: () => () => void;
    useCanUndo: () => boolean;
    useCanRedo: () => boolean;
    useStorageRoot: () => [root: _liveblocks_core.LiveObject<LiveblocksStorage> | null];
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useOthers: {
        (): _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_1>(selector: (others: _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_1, isEqual?: ((prev: T_1, curr: T_1) => boolean) | undefined): T_1;
    };
    useOthersConnectionIds: () => readonly number[];
    useOthersMapped: <T_2>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_2, itemIsEqual?: ((prev: T_2, curr: T_2) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_2])[];
    useOther: <T_3>(connectionId: number, selector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_3, isEqual?: ((prev: T_3, curr: T_3) => boolean) | undefined) => T_3;
    useCreateThread: () => (options: {
        body: _liveblocks_core.CommentBody;
    }) => _liveblocks_core.ThreadData<never>;
    useEditThreadMetadata: () => (options: {
        threadId: string;
    }) => void;
    useCreateComment: () => (options: {
        threadId: string;
        body: _liveblocks_core.CommentBody;
    }) => _liveblocks_core.CommentData;
    useEditComment: () => (options: {
        threadId: string;
        commentId: string;
        body: _liveblocks_core.CommentBody;
    }) => void;
    useDeleteComment: () => (options: {
        threadId: string;
        commentId: string;
    }) => void;
    useStorage: <T_4>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_4, isEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined) => T_4;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_5>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_5, isEqual?: ((prev: T_5, curr: T_5) => boolean) | undefined): T_5;
    };
    useThreads: () => _liveblocks_core.ThreadData<never>[];
    useUser: (userId: string) => {
        user?: {
            [key: string]: _liveblocks_core.Json | undefined;
            name?: string | undefined;
            avatar?: string | undefined;
        } | undefined;
        isLoading: false;
        error?: undefined;
    };
    useList: <TKey extends Extract<keyof LiveblocksStorage, string>>(key: TKey) => LiveblocksStorage[TKey];
    useMap: <TKey_1 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_1) => LiveblocksStorage[TKey_1];
    useObject: <TKey_2 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_2) => LiveblocksStorage[TKey_2];
    LiveblocksProvider: react.FC<{
        roomId: string;
        Loading: () => JSX.Element;
        children: react.ReactNode;
    }>;
    useNodeMap: (nodeFilter?: ((value: [string, U], index: number, array: [string, U][]) => unknown) | undefined) => ReadonlyMap<string, {
        readonly nodeId: string;
        readonly type: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never, undefined>> | (undefined extends (U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never) ? (U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never) & undefined : never);
        readonly parentNodeId: string | null;
        readonly parentType: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never, undefined>> | (undefined extends (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) ? (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) & undefined : never);
        readonly state: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never, undefined>> | (undefined extends (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) ? (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) & undefined : never);
        readonly stateDisplayKey: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) ? (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) & undefined : never);
        readonly nodeMeta: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never) ? (U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never) & undefined : never);
    }>;
    useStatelessNodeMap: (nodeFilter?: ((value: [string, U], index: number, array: [string, U][]) => unknown) | undefined) => Map<string, StatelessAirNodeUnion<Index>>;
    useNodeIdFromTreeClimb: <T_7 extends U["type"]>(nodeId: string, nodeType: T_7) => string;
    useCreateNode: <T_8 extends U["type"], S_1 extends (U & {
        type: T_8;
    })["state"]>() => (parentNodeId: string | null, type: T_8, state?: Partial<S_1> | undefined) => StatelessAirNodeUnion<Index> & {
        type: T_8;
    };
    useNodeState: <T_9 extends StatelessAirNodeUnion<Index> | null, S_2 extends (U & {
        type: Exclude<T_9, null>["type"];
    })["state"], SK_1 extends keyof S_2 & string>(node: T_9, stateKey: SK_1) => readonly [T_9 extends null ? S_2[SK_1] | null : S_2[SK_1], (value: S_2[SK_1]) => void, boolean];
    useNodeNameState: (nodeId: string) => readonly [string, (value: string) => void];
    useDeleteNode: () => (nodeId: string) => void;
};

type LiveblocksStorageModel2 = {
    nodeMap: LiveMap<string, LiveDataNode>;
};

type IndexKey<Index extends Record<string, IndexNode>> = keyof Index;
type IndexNode = {
    parentType: string | null;
    metadata: JsonObject;
    stateDisplayKey: string;
    state: Record<string, any>;
};
type LiveDataNode = LiveObject<Omit<IndexNode, 'state'> & {
    type: string;
    nodeId: string | null;
    parentNodeId: string | null;
    state: LiveObject<LsonObject>;
}>;
type RootTreeNode<Index extends Record<string, IndexNode>> = {
    parentNode: null;
    parentType: null;
    parentNodeId: null;
    metadata: JsonObject;
    type: 'root';
    nodeId: null;
    childNodes: Set<LiveTreeNode<Index> & {
        parentType: null;
    }>;
};
type StorageHook = ReturnType<typeof createRoomContext<any, LiveblocksStorageModel2>>['suspense']['useStorage'];
type LiveTreeNode<Index extends Record<string, IndexNode>> = {
    [Type in keyof Index]: {
        parentNode: LiveTreeNode<Index> | null;
        parentType: Index[Type]['parentType'];
        childNodes: Set<LiveTreeNode<Index>>;
        liveDataNode: LiveDataNode;
        nodeId: string | null;
        type: Type;
        state: LiveObject<Index[Type]['state']>;
        stateDisplayKey: Index[Type]['stateDisplayKey'];
        metadata: Index[Type]['metadata'];
        update: <K extends keyof Index[Type]['state'], V extends Index[Type]['state'][K]>(key: K, value: V) => void;
        useState: <K extends keyof Index[Type]['state'], V extends Index[Type]['state'][K]>(key: K) => V;
    };
}[keyof Index];
declare const ClassOfLiveTreeNodeFactory: <Index extends {
    [key: string]: IndexNode;
}>(NodeIndex: Index, useStorage: StorageHook, liveNodeMap: LiveblocksStorageModel2['nodeMap']) => {
    new <T extends keyof Index>(type: T, parentNode: {
        parentNode: any | null;
        childNodes: Set<any>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: LiveObject<LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        readonly parentType: string | null;
        update: <K extends keyof Index[keyof Index]["state"], V extends Index[keyof Index]["state"][K]>(key: K, value: V) => void;
        useState: <K_1 extends keyof Index[keyof Index]["state"], V_1 extends Index[keyof Index]["state"][K_1]>(key: K_1) => V_1;
    } | null, liveDataNode?: LiveDataNode): {
        parentNode: {
            parentNode: any | null;
            childNodes: Set<any>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: LiveObject<LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            readonly parentType: string | null;
            update: <K extends keyof Index[keyof Index]["state"], V extends Index[keyof Index]["state"][K]>(key: K, value: V) => void;
            useState: <K_1 extends keyof Index[keyof Index]["state"], V_1 extends Index[keyof Index]["state"][K_1]>(key: K_1) => V_1;
        } | null;
        childNodes: Set<{
            parentNode: any | null;
            childNodes: Set<any>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: LiveObject<LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            readonly parentType: string | null;
            update: <K extends keyof Index[keyof Index]["state"], V extends Index[keyof Index]["state"][K]>(key: K, value: V) => void;
            useState: <K_1 extends keyof Index[keyof Index]["state"], V_1 extends Index[keyof Index]["state"][K_1]>(key: K_1) => V_1;
        }>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: LiveObject<LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        readonly parentType: string | null;
        update: <K_2 extends keyof Index[T]["state"], V_2 extends Index[T]["state"][K_2]>(key: K_2, value: V_2) => void;
        useState: <K_3 extends keyof Index[T]["state"], V_3 extends Index[T]["state"][K_3]>(key: K_3) => V_3;
    };
    liveNodeMap: _liveblocks_core.LiveMap<string, LiveDataNode>;
    root: RootTreeNode<Index>;
};

declare const LiveTreeBrowserConfig: <Index extends Record<string, IndexNode>, LiveblocksPresence extends JsonObject = {}>(NodeIndex: Index, liveblocksPresence: LiveblocksPresence, createClientProps: Parameters<typeof createClient>[0]) => {
    LiveTreeNodeRootProvider: FC<{
        roomId: string;
        children: ReactNode;
    }>;
    useLiveTreeNodeRoot: () => RootTreeNode<Index>;
};

export { AirNode, AirNodeIndex, AirNodeUnion, ClassOfLiveTreeNodeFactory, IndexKey, IndexNode, LiveAirNode, LiveDataNode, LiveTreeBrowserConfig, LiveTreeNode, LiveblocksStorageModel, RootTreeNode, StatelessAirNodeUnion, StorageHook, TypedNodeIndex, liveblocksBrowserConfig };
