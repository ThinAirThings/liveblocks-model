import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, c as AirNode } from './data-model-5183422e.js';
export { T as TypedNodeIndex, U as UnionToIntersection, d as createNodeEntry, e as createNodeIndexFactory } from './data-model-5183422e.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { JsonObject, createClient } from '@liveblocks/client';

declare const liveblocksNodeConfig: <Index extends AirNodeIndex<any>, U extends AirNodeUnion<Index>, LiveblocksStorage extends LiveblocksStorageModel<LiveAirNode<U>>, LiveblocksPresence extends JsonObject = {}>(NodeIndex: Index, createClientProps: Parameters<typeof createClient>[0], initialLiveblocksPresence: LiveblocksPresence, initialLiveblocksStorage: LiveblocksStorage) => {
    LiveblocksNodeRoomProvider: ({ userId, spaceId, serverName, children }: {
        userId: string;
        spaceId: string;
        serverName: string;
        children: () => ReactNode;
    }) => react_jsx_runtime.JSX.Element;
    useNodeMap: (nodeFilter?: ((value: [string, U], index: number, array: [string, U][]) => unknown) | undefined) => ReadonlyMap<string, {
        readonly nodeId: string;
        readonly parentNodeId: string | null;
        readonly type: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<infer T extends string, any, any, {}> ? T : never, undefined>> | (undefined extends (U extends AirNode<infer T extends string, any, any, {}> ? T : never) ? (U extends AirNode<infer T extends string, any, any, {}> ? T : never) & undefined : never);
        readonly nodeMeta: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, infer M extends string, {}> ? M : never, undefined>> | (undefined extends (U extends AirNode<any, any, infer M extends string, {}> ? M : never) ? (U extends AirNode<any, any, infer M extends string, {}> ? M : never) & undefined : never);
        readonly state: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never, undefined>> | (undefined extends (U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) ? (U extends AirNode<any, infer S extends JsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) & undefined : never);
        readonly stateDisplayKey: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never, undefined>> | (undefined extends (U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never) ? (U extends AirNode<any, infer S_1 extends JsonObject, any, {}> ? keyof S_1 & string : never) & undefined : never);
        readonly childrenNodeIds: readonly string[];
    }>;
    useCreateNode: <T_1 extends U["type"], S_2 extends Partial<(U & {
        type: T_1;
    })["state"]>>() => (parentNodeId: string | null, type: T_1, state?: S_2 | undefined) => string;
    useNodeState: <T_2 extends U["type"], S_3 extends (U & {
        type: T_2;
    })["state"], SK extends keyof S_3 & string>(nodeId: string, _nodeType: T_2, stateKey: SK) => readonly [S_3[SK], (value: S_3[SK]) => void];
    useNodeNameState: <T_3 extends U["type"], S_4 extends (U & {
        type: T_3;
    })["state"], K extends keyof S_4 & string>(nodeId: string, nodeType: T_3) => readonly [S_4[K], (value: S_4[K]) => void];
    useDeleteNode: () => (nodeId: string) => void;
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never> | null>;
    RoomProvider: (props: {
        id: string;
        children: ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorage | ((roomId: string) => LiveblocksStorage) | undefined;
    }) => JSX.Element;
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never>;
    useStatus: () => _liveblocks_core.Status;
    useBatch: <T_4>() => (callback: () => T_4) => T_4;
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
        <T_5>(selector: (others: _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_5, isEqual?: ((prev: T_5, curr: T_5) => boolean) | undefined): T_5;
    };
    useOthersConnectionIds: () => readonly number[];
    useOthersMapped: <T_6>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_6, itemIsEqual?: ((prev: T_6, curr: T_6) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_6])[];
    useOther: <T_7>(connectionId: number, selector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_7, isEqual?: ((prev: T_7, curr: T_7) => boolean) | undefined) => T_7;
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
    useStorage: <T_8>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_8, isEqual?: ((prev: T_8 | null, curr: T_8 | null) => boolean) | undefined) => T_8 | null;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta> | null;
        <T_9>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_9, isEqual?: ((prev: T_9, curr: T_9) => boolean) | undefined): T_9 | null;
    };
    useThreads: () => {
        isLoading: true;
        threads?: undefined;
        error?: undefined;
    } | {
        isLoading: false;
        threads?: undefined;
        error: Error;
    } | {
        isLoading: false;
        threads: _liveblocks_core.ThreadData<never>[];
        error?: undefined;
    };
    useUser: (userId: string) => {
        user?: undefined;
        isLoading: true;
        error?: undefined;
    } | {
        user?: undefined;
        isLoading: false;
        error: Error;
    } | {
        user?: {
            [key: string]: _liveblocks_core.Json | undefined;
            name?: string | undefined;
            avatar?: string | undefined;
        } | undefined;
        isLoading: false;
        error?: undefined;
    };
    useList: <TKey extends Extract<keyof LiveblocksStorage, string>>(key: TKey) => LiveblocksStorage[TKey] | null;
    useMap: <TKey_1 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_1) => LiveblocksStorage[TKey_1] | null;
    useObject: <TKey_2 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_2) => LiveblocksStorage[TKey_2] | null;
    suspense: {
        RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never> | null>;
        RoomProvider: (props: {
            id: string;
            children: ReactNode;
            shouldInitiallyConnect?: boolean | undefined;
            unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
            initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
            initialStorage?: LiveblocksStorage | ((roomId: string) => LiveblocksStorage) | undefined;
        }) => JSX.Element;
        useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorage, _liveblocks_core.BaseUserMeta, never>;
        useStatus: () => _liveblocks_core.Status;
        useBatch: <T_4>() => (callback: () => T_4) => T_4;
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
            <T_5>(selector: (others: _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_5, isEqual?: ((prev: T_5, curr: T_5) => boolean) | undefined): T_5;
        };
        useOthersConnectionIds: () => readonly number[];
        useOthersMapped: <T_6>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_6, itemIsEqual?: ((prev: T_6, curr: T_6) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_6])[];
        useOther: <T_7>(connectionId: number, selector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_7, isEqual?: ((prev: T_7, curr: T_7) => boolean) | undefined) => T_7;
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
        useStorage: <T_10>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_10, isEqual?: ((prev: T_10, curr: T_10) => boolean) | undefined) => T_10;
        useSelf: {
            (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
            <T_11>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_11, isEqual?: ((prev: T_11, curr: T_11) => boolean) | undefined): T_11;
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
        useList: <TKey_3 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_3) => LiveblocksStorage[TKey_3];
        useMap: <TKey_4 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_4) => LiveblocksStorage[TKey_4];
        useObject: <TKey_5 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_5) => LiveblocksStorage[TKey_5];
    };
};

export { AirNode, AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel, liveblocksNodeConfig };
