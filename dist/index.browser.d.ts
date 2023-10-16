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

type IndexKey<Index extends Record<string, any>> = keyof Index;
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
type StorageHook = ReturnType<typeof createRoomContext<any, LiveblocksStorageModel2>>['suspense']['useStorage'];
type GenericLiveTreeNode<Index extends {
    [key: string]: IndexNode;
}> = ReturnType<typeof ClassOfLiveTreeNodeFactory<Index>>;
declare const ClassOfLiveTreeNodeFactory: <Index extends {
    [key: string]: IndexNode;
}>(NodeIndex: Index, useStorage: StorageHook, liveNodeMap: LiveblocksStorageModel2['nodeMap']) => {
    new <T extends keyof Index>(type: T, parentNode: {
        parentNode: {
            parentNode: {
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: LiveObject<LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K]>(key: K, value: V) => void;
                                                useValue: <K_1 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_1 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_1]>(key: K_1) => V_1;
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
                                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                            }>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: LiveObject<LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_4 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_4 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_4]>(key: K_4, value: V_4) => void;
                                            useValue: <K_5 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_5 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_5]>(key: K_5) => V_5;
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
                                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                        }>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: LiveObject<LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_6 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                        useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
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
                                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                    }>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: LiveObject<LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_8 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_8 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_8]>(key: K_8, value: V_8) => void;
                                    useValue: <K_9 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_9 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_9]>(key: K_9) => V_9;
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
                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                }>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: LiveObject<LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
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
                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                            }>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: LiveObject<LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_12 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_12 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_12]>(key: K_12, value: V_12) => void;
                            useValue: <K_13 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_13 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_13]>(key: K_13) => V_13;
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
                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                        }>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: LiveObject<LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                        useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
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
                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                    }>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: LiveObject<LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_16 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_16 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_16]>(key: K_16, value: V_16) => void;
                    useValue: <K_17 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_17 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_17]>(key: K_17) => V_17;
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
                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                }>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: LiveObject<LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
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
                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
            }>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: LiveObject<LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            update: <K_20 extends keyof Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"], V_20 extends Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"][K_20]>(key: K_20, value: V_20) => void;
            useValue: <K_21 extends keyof Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"], V_21 extends Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"][K_21]>(key: K_21) => V_21;
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
            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
        }>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: LiveObject<LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        update: <K_22 extends keyof Index[keyof Index & Index[T]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[T]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
        useValue: <K_23 extends keyof Index[keyof Index & Index[T]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[T]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
    } | null, liveDataNode?: LiveDataNode): {
        parentNode: {
            parentNode: {
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: {
                                                    parentNode: any | null;
                                                    childNodes: Set<any>;
                                                    liveDataNode: LiveDataNode;
                                                    readonly nodeId: string | null;
                                                    readonly type: string;
                                                    readonly state: LiveObject<LsonObject>;
                                                    readonly stateDisplayKey: string;
                                                    readonly metadata: JsonObject;
                                                    update: <K extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K]>(key: K, value: V) => void;
                                                    useValue: <K_1 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_1 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_1]>(key: K_1) => V_1;
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
                                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                                }>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: LiveObject<LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_4 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_4 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_4]>(key: K_4, value: V_4) => void;
                                                useValue: <K_5 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_5 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_5]>(key: K_5) => V_5;
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
                                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                            }>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: LiveObject<LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_6 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                            useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
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
                                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                        }>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: LiveObject<LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_8 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_8 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_8]>(key: K_8, value: V_8) => void;
                                        useValue: <K_9 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_9 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_9]>(key: K_9) => V_9;
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
                                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                    }>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: LiveObject<LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                    useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
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
                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                }>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: LiveObject<LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_12 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_12 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_12]>(key: K_12, value: V_12) => void;
                                useValue: <K_13 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_13 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_13]>(key: K_13) => V_13;
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
                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                            }>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: LiveObject<LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                            useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
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
                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                        }>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: LiveObject<LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_16 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_16 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_16]>(key: K_16, value: V_16) => void;
                        useValue: <K_17 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_17 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_17]>(key: K_17) => V_17;
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
                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                    }>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: LiveObject<LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                    useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
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
                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                }>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: LiveObject<LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_20 extends keyof Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"], V_20 extends Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"][K_20]>(key: K_20, value: V_20) => void;
                useValue: <K_21 extends keyof Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"], V_21 extends Index[keyof Index & Index[keyof Index & Index[T]["parentType"]]["parentType"]]["state"][K_21]>(key: K_21) => V_21;
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
                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
            }>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: LiveObject<LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            update: <K_22 extends keyof Index[keyof Index & Index[T]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[T]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
            useValue: <K_23 extends keyof Index[keyof Index & Index[T]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[T]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
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
            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
        }>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: LiveObject<LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        update: <K_24 extends keyof Index[T]["state"], V_24 extends Index[T]["state"][K_24]>(key: K_24, value: V_24) => void;
        useValue: <K_25 extends keyof Index[T]["state"], V_25 extends Index[T]["state"][K_25]>(key: K_25) => V_25;
    };
    liveNodeMap: _liveblocks_core.LiveMap<string, LiveDataNode>;
    root: {
        parentNode: {
            parentNode: {
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<{
                                                    parentNode: any | null;
                                                    childNodes: Set<any>;
                                                    liveDataNode: LiveDataNode;
                                                    readonly nodeId: string | null;
                                                    readonly type: string;
                                                    readonly state: LiveObject<LsonObject>;
                                                    readonly stateDisplayKey: string;
                                                    readonly metadata: JsonObject;
                                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                                }>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: LiveObject<LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_26 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_26 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_26]>(key: K_26, value: V_26) => void;
                                                useValue: <K_27 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_27 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_27]>(key: K_27) => V_27;
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
                                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                            }>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: LiveObject<LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_28 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_28 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_28]>(key: K_28, value: V_28) => void;
                                            useValue: <K_29 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_29 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_29]>(key: K_29) => V_29;
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
                                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                        }>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: LiveObject<LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_30 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_30 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_30]>(key: K_30, value: V_30) => void;
                                        useValue: <K_31 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_31 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_31]>(key: K_31) => V_31;
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
                                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                    }>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: LiveObject<LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_32 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_32 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_32]>(key: K_32, value: V_32) => void;
                                    useValue: <K_33 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_33 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_33]>(key: K_33) => V_33;
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
                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                }>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: LiveObject<LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_34 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_34 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_34]>(key: K_34, value: V_34) => void;
                                useValue: <K_35 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_35 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_35]>(key: K_35) => V_35;
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
                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                            }>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: LiveObject<LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_36 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_36 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_36]>(key: K_36, value: V_36) => void;
                            useValue: <K_37 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_37 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_37]>(key: K_37) => V_37;
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
                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                        }>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: LiveObject<LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_38 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_38 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_38]>(key: K_38, value: V_38) => void;
                        useValue: <K_39 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_39 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_39]>(key: K_39) => V_39;
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
                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                    }>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: LiveObject<LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_40 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"], V_40 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"][K_40]>(key: K_40, value: V_40) => void;
                    useValue: <K_41 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"], V_41 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"][K_41]>(key: K_41) => V_41;
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
                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                }>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: LiveObject<LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_42 extends keyof Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"], V_42 extends Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"][K_42]>(key: K_42, value: V_42) => void;
                useValue: <K_43 extends keyof Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"], V_43 extends Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"][K_43]>(key: K_43) => V_43;
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
                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
            }>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: LiveObject<LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            update: <K_44 extends keyof Index[keyof Index & Index["root"]["parentType"]]["state"], V_44 extends Index[keyof Index & Index["root"]["parentType"]]["state"][K_44]>(key: K_44, value: V_44) => void;
            useValue: <K_45 extends keyof Index[keyof Index & Index["root"]["parentType"]]["state"], V_45 extends Index[keyof Index & Index["root"]["parentType"]]["state"][K_45]>(key: K_45) => V_45;
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
            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
        }>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: LiveObject<LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        update: <K_46 extends keyof Index["root"]["state"], V_46 extends Index["root"]["state"][K_46]>(key: K_46, value: V_46) => void;
        useValue: <K_47 extends keyof Index["root"]["state"], V_47 extends Index["root"]["state"][K_47]>(key: K_47) => V_47;
    };
};

declare const LiveTreeBrowserConfig: <Index extends Record<string, IndexNode>, LiveblocksPresence extends JsonObject = {}>(NodeIndex: Index, liveblocksPresence: LiveblocksPresence) => {
    LiveTreeNodeRootProvider: FC<{
        roomId: string;
        createClientProps: Parameters<typeof createClient>[0];
        children: ReactNode;
    }>;
    useLiveTreeNodeRoot: () => {
        parentNode: {
            parentNode: {
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K]>(key: K, value: V) => void;
                                                useValue: <K_1 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_1 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_1]>(key: K_1) => V_1;
                                            } | null;
                                            childNodes: Set<{
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                            }>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_4 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_4 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_4]>(key: K_4, value: V_4) => void;
                                            useValue: <K_5 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_5 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_5]>(key: K_5) => V_5;
                                        } | null;
                                        childNodes: Set<{
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                                useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                        }>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_8 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_8 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_8]>(key: K_8, value: V_8) => void;
                                        useValue: <K_9 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_9 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_9]>(key: K_9) => V_9;
                                    } | null;
                                    childNodes: Set<{
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                                useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                            useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                    }>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_12 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_12 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_12]>(key: K_12, value: V_12) => void;
                                    useValue: <K_13 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_13 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_13]>(key: K_13) => V_13;
                                } | null;
                                childNodes: Set<{
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                                                useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                            useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                        useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                                }>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_16 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_16 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_16]>(key: K_16, value: V_16) => void;
                                useValue: <K_17 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_17 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_17]>(key: K_17) => V_17;
                            } | null;
                            childNodes: Set<{
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                                                useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                                            useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                        useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                    useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                            }>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_20 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_20 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_20]>(key: K_20, value: V_20) => void;
                            useValue: <K_21 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_21 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_21]>(key: K_21) => V_21;
                        } | null;
                        childNodes: Set<{
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_22 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
                                                useValue: <K_23 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                                            useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                                        useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                    useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                                useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                            } | null;
                            childNodes: Set<any>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                        }>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_24 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_24 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_24]>(key: K_24, value: V_24) => void;
                        useValue: <K_25 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_25 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_25]>(key: K_25) => V_25;
                    } | null;
                    childNodes: Set<{
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_26 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_26 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_26]>(key: K_26, value: V_26) => void;
                                                useValue: <K_27 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_27 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_27]>(key: K_27) => V_27;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_22 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
                                            useValue: <K_23 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                                        useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                                    useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                                useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                            } | null;
                            childNodes: Set<any>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                            useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                        } | null;
                        childNodes: Set<any>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                        useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                    }>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_28 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"], V_28 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"][K_28]>(key: K_28, value: V_28) => void;
                    useValue: <K_29 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"], V_29 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["parentType"]]["state"][K_29]>(key: K_29) => V_29;
                } | null;
                childNodes: Set<{
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_30 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_30 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_30]>(key: K_30, value: V_30) => void;
                                                useValue: <K_31 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_31 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_31]>(key: K_31) => V_31;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_26 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_26 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_26]>(key: K_26, value: V_26) => void;
                                            useValue: <K_27 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_27 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_27]>(key: K_27) => V_27;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_22 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
                                        useValue: <K_23 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                                    useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                                useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                            } | null;
                            childNodes: Set<any>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                            useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                        } | null;
                        childNodes: Set<any>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                        useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                    } | null;
                    childNodes: Set<any>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                    useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
                }>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_32 extends keyof Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"], V_32 extends Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"][K_32]>(key: K_32, value: V_32) => void;
                useValue: <K_33 extends keyof Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"], V_33 extends Index[keyof Index & Index[keyof Index & Index["root"]["parentType"]]["parentType"]]["state"][K_33]>(key: K_33) => V_33;
            } | null;
            childNodes: Set<{
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_34 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_34 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_34]>(key: K_34, value: V_34) => void;
                                                useValue: <K_35 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_35 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_35]>(key: K_35) => V_35;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_30 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_30 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_30]>(key: K_30, value: V_30) => void;
                                            useValue: <K_31 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_31 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_31]>(key: K_31) => V_31;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_26 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_26 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_26]>(key: K_26, value: V_26) => void;
                                        useValue: <K_27 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_27 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_27]>(key: K_27) => V_27;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_22 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
                                    useValue: <K_23 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                                useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                            } | null;
                            childNodes: Set<any>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                            useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                        } | null;
                        childNodes: Set<any>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                        useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                    } | null;
                    childNodes: Set<any>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                    useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
                } | null;
                childNodes: Set<any>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
                useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
            }>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            update: <K_36 extends keyof Index[keyof Index & Index["root"]["parentType"]]["state"], V_36 extends Index[keyof Index & Index["root"]["parentType"]]["state"][K_36]>(key: K_36, value: V_36) => void;
            useValue: <K_37 extends keyof Index[keyof Index & Index["root"]["parentType"]]["state"], V_37 extends Index[keyof Index & Index["root"]["parentType"]]["state"][K_37]>(key: K_37) => V_37;
        } | null;
        childNodes: Set<{
            parentNode: {
                parentNode: {
                    parentNode: {
                        parentNode: {
                            parentNode: {
                                parentNode: {
                                    parentNode: {
                                        parentNode: {
                                            parentNode: {
                                                parentNode: any | null;
                                                childNodes: Set<any>;
                                                liveDataNode: LiveDataNode;
                                                readonly nodeId: string | null;
                                                readonly type: string;
                                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                                readonly stateDisplayKey: string;
                                                readonly metadata: JsonObject;
                                                update: <K_38 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_38 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_38]>(key: K_38, value: V_38) => void;
                                                useValue: <K_39 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_39 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_39]>(key: K_39) => V_39;
                                            } | null;
                                            childNodes: Set<any>;
                                            liveDataNode: LiveDataNode;
                                            readonly nodeId: string | null;
                                            readonly type: string;
                                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                            readonly stateDisplayKey: string;
                                            readonly metadata: JsonObject;
                                            update: <K_34 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_34 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_34]>(key: K_34, value: V_34) => void;
                                            useValue: <K_35 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_35 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_35]>(key: K_35) => V_35;
                                        } | null;
                                        childNodes: Set<any>;
                                        liveDataNode: LiveDataNode;
                                        readonly nodeId: string | null;
                                        readonly type: string;
                                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                        readonly stateDisplayKey: string;
                                        readonly metadata: JsonObject;
                                        update: <K_30 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_30 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_30]>(key: K_30, value: V_30) => void;
                                        useValue: <K_31 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_31 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_31]>(key: K_31) => V_31;
                                    } | null;
                                    childNodes: Set<any>;
                                    liveDataNode: LiveDataNode;
                                    readonly nodeId: string | null;
                                    readonly type: string;
                                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                    readonly stateDisplayKey: string;
                                    readonly metadata: JsonObject;
                                    update: <K_26 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_26 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_26]>(key: K_26, value: V_26) => void;
                                    useValue: <K_27 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_27 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_27]>(key: K_27) => V_27;
                                } | null;
                                childNodes: Set<any>;
                                liveDataNode: LiveDataNode;
                                readonly nodeId: string | null;
                                readonly type: string;
                                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                                readonly stateDisplayKey: string;
                                readonly metadata: JsonObject;
                                update: <K_22 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_22 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_22]>(key: K_22, value: V_22) => void;
                                useValue: <K_23 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_23 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_23]>(key: K_23) => V_23;
                            } | null;
                            childNodes: Set<any>;
                            liveDataNode: LiveDataNode;
                            readonly nodeId: string | null;
                            readonly type: string;
                            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                            readonly stateDisplayKey: string;
                            readonly metadata: JsonObject;
                            update: <K_18 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_18 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_18]>(key: K_18, value: V_18) => void;
                            useValue: <K_19 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"], V_19 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["parentType"]]["state"][K_19]>(key: K_19) => V_19;
                        } | null;
                        childNodes: Set<any>;
                        liveDataNode: LiveDataNode;
                        readonly nodeId: string | null;
                        readonly type: string;
                        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                        readonly stateDisplayKey: string;
                        readonly metadata: JsonObject;
                        update: <K_14 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_14 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_14]>(key: K_14, value: V_14) => void;
                        useValue: <K_15 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"], V_15 extends Index[keyof Index & Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["parentType"]]["state"][K_15]>(key: K_15) => V_15;
                    } | null;
                    childNodes: Set<any>;
                    liveDataNode: LiveDataNode;
                    readonly nodeId: string | null;
                    readonly type: string;
                    readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                    readonly stateDisplayKey: string;
                    readonly metadata: JsonObject;
                    update: <K_10 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_10 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_10]>(key: K_10, value: V_10) => void;
                    useValue: <K_11 extends keyof Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"], V_11 extends Index[keyof Index & Index[keyof Index & Index[keyof Index]["parentType"]]["parentType"]]["state"][K_11]>(key: K_11) => V_11;
                } | null;
                childNodes: Set<any>;
                liveDataNode: LiveDataNode;
                readonly nodeId: string | null;
                readonly type: string;
                readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
                readonly stateDisplayKey: string;
                readonly metadata: JsonObject;
                update: <K_6 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_6 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_6]>(key: K_6, value: V_6) => void;
                useValue: <K_7 extends keyof Index[keyof Index & Index[keyof Index]["parentType"]]["state"], V_7 extends Index[keyof Index & Index[keyof Index]["parentType"]]["state"][K_7]>(key: K_7) => V_7;
            } | null;
            childNodes: Set<any>;
            liveDataNode: LiveDataNode;
            readonly nodeId: string | null;
            readonly type: string;
            readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
            readonly stateDisplayKey: string;
            readonly metadata: JsonObject;
            update: <K_2 extends keyof Index[keyof Index]["state"], V_2 extends Index[keyof Index]["state"][K_2]>(key: K_2, value: V_2) => void;
            useValue: <K_3 extends keyof Index[keyof Index]["state"], V_3 extends Index[keyof Index]["state"][K_3]>(key: K_3) => V_3;
        }>;
        liveDataNode: LiveDataNode;
        readonly nodeId: string | null;
        readonly type: string;
        readonly state: _liveblocks_core.LiveObject<_liveblocks_core.LsonObject>;
        readonly stateDisplayKey: string;
        readonly metadata: JsonObject;
        update: <K_40 extends keyof Index["root"]["state"], V_40 extends Index["root"]["state"][K_40]>(key: K_40, value: V_40) => void;
        useValue: <K_41 extends keyof Index["root"]["state"], V_41 extends Index["root"]["state"][K_41]>(key: K_41) => V_41;
    };
};

export { AirNode, AirNodeIndex, AirNodeUnion, ClassOfLiveTreeNodeFactory, GenericLiveTreeNode, IndexKey, IndexNode, LiveAirNode, LiveDataNode, LiveTreeBrowserConfig, LiveblocksStorageModel, StatelessAirNodeUnion, TypedNodeIndex, liveblocksBrowserConfig };
