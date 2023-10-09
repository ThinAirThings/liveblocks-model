import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, T as TypedNodeIndex, c as AirNode } from './data-model-5183422e.js';
export { U as UnionToIntersection, d as createNodeEntry, e as createNodeIndexFactory } from './data-model-5183422e.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { JsonObject, createClient } from '@liveblocks/client';

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
        readonly parentNodeId: string | null;
        readonly type: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<infer T_6 extends string, any, any, {}> ? T_6 : never, undefined>> | (undefined extends (U extends AirNode<infer T_6 extends string, any, any, {}> ? T_6 : never) ? (U extends AirNode<infer T_6 extends string, any, any, {}> ? T_6 : never) & undefined : never);
        readonly nodeMeta: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, infer M extends string, {}> ? M : never, undefined>> | (undefined extends (U extends AirNode<any, any, infer M extends string, {}> ? M : never) ? (U extends AirNode<any, any, infer M extends string, {}> ? M : never) & undefined : never);
        readonly state: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never, undefined>> | (undefined extends (U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) ? (U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) & undefined : never);
        readonly stateDisplayKey: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never, undefined>> | (undefined extends (U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never) ? (U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never) & undefined : never);
        readonly childrenNodeIds: readonly string[];
    }>;
    useCreateNode: <T_7 extends U["type"], S_2 extends Partial<(U & {
        type: T_7;
    })["state"]>>() => (parentNodeId: string | null, type: T_7, state?: S_2 | undefined) => string;
    useNodeState: <T_8 extends U["type"], S_3 extends (U & {
        type: T_8;
    })["state"], SK extends keyof S_3 & string>(nodeId: string, _nodeType: T_8, stateKey: SK) => readonly [S_3[SK], (value: S_3[SK]) => void];
    useNodeNameState: (nodeId: string) => readonly [string, (value: string) => void];
    useDeleteNode: () => (nodeId: string) => void;
};

export { AirNode, AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel, TypedNodeIndex, liveblocksBrowserConfig };
