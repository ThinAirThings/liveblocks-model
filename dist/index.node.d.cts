import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, c as AirNode, S as StatelessAirNodeUnion } from './data-model-846651b6.js';
export { d as StatelessAirNode, T as TypedNodeIndex, U as UnionToIntersection, e as createNodeEntry } from './data-model-846651b6.js';
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
        readonly type: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<infer T extends string, any, any, any, {}> ? T : never, undefined>> | (undefined extends (U extends AirNode<infer T extends string, any, any, any, {}> ? T : never) ? (U extends AirNode<infer T extends string, any, any, any, {}> ? T : never) & undefined : never);
        readonly parentNodeId: string | null;
        readonly parentType: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never, undefined>> | (undefined extends (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) ? (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) & undefined : never);
        readonly state: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never, undefined>> | (undefined extends (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) ? (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) & undefined : never);
        readonly stateDisplayKey: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) ? (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) & undefined : never);
        readonly nodeMeta: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, any, infer M extends _liveblocks_core.Lson> ? M : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, any, infer M extends _liveblocks_core.Lson> ? M : never) ? (U extends AirNode<any, any, any, any, infer M extends _liveblocks_core.Lson> ? M : never) & undefined : never);
    }>;
    useStatelessNodeMap: (nodeFilter?: ((value: [string, U], index: number, array: [string, U][]) => unknown) | undefined) => Map<string, StatelessAirNodeUnion<Index>>;
    useNodeIdFromTreeClimb: <T_1 extends U["type"]>(nodeId: string, nodeType: T_1) => string;
    useCreateNode: <T_2 extends U["type"], S_1 extends (U & {
        type: T_2;
    })["state"]>() => (parentNodeId: string | null, type: T_2, state?: Partial<S_1> | undefined) => StatelessAirNodeUnion<Index> & {
        type: T_2;
    };
    useNodeState: <T_3 extends StatelessAirNodeUnion<Index> | null, S_2 extends (U & {
        type: Exclude<T_3, null>["type"];
    })["state"], SK_1 extends keyof S_2 & string>(node: T_3, stateKey: SK_1) => readonly [T_3 extends null ? S_2[SK_1] | null : S_2[SK_1], (value: S_2[SK_1]) => void, boolean];
    useNodeNameState: (nodeId: string) => readonly [string, (value: string) => void];
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
    useEventListener: (callback: (data: _liveblocks_core.RoomEventMessage<LiveblocksPresence, _liveblocks_core.BaseUserMeta, never>) => void) => void;
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
    useAddReaction: () => (options: {
        threadId: string;
        commentId: string;
        emoji: string;
    }) => void;
    useRemoveReaction: () => (options: {
        threadId: string;
        commentId: string;
        emoji: string;
    }) => void;
    useStorage: <T_8>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_8, isEqual?: ((prev: T_8 | null, curr: T_8 | null) => boolean) | undefined) => T_8 | null;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta> | null;
        <T_9>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_9, isEqual?: ((prev: T_9, curr: T_9) => boolean) | undefined): T_9 | null;
    };
    useThreads: () => {
        isLoading: false;
        threads: _liveblocks_core.ThreadData<never>[];
        error?: undefined;
    } | {
        isLoading: true;
        threads?: undefined;
        error?: undefined;
    } | {
        isLoading: false;
        threads?: undefined;
        error: Error;
    };
    useUser: (userId: string) => {
        isLoading: false;
        user: {
            [key: string]: _liveblocks_core.Json | undefined;
            name?: string | undefined;
            avatar?: string | undefined;
        } | undefined;
        error?: undefined;
    } | {
        isLoading: true;
        user?: undefined;
        error?: undefined;
    } | {
        isLoading: false;
        user?: undefined;
        error: Error;
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
        useEventListener: (callback: (data: _liveblocks_core.RoomEventMessage<LiveblocksPresence, _liveblocks_core.BaseUserMeta, never>) => void) => void;
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
        useAddReaction: () => (options: {
            threadId: string;
            commentId: string;
            emoji: string;
        }) => void;
        useRemoveReaction: () => (options: {
            threadId: string;
            commentId: string;
            emoji: string;
        }) => void;
        useStorage: <T_10>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_10, isEqual?: ((prev: T_10, curr: T_10) => boolean) | undefined) => T_10;
        useSelf: {
            (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
            <T_11>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_11, isEqual?: ((prev: T_11, curr: T_11) => boolean) | undefined): T_11;
        };
        useThreads: () => {
            isLoading: false;
            threads: _liveblocks_core.ThreadData<never>[];
            error?: undefined;
        };
        useUser: (userId: string) => {
            isLoading: false;
            user: {
                [key: string]: _liveblocks_core.Json | undefined;
                name?: string | undefined;
                avatar?: string | undefined;
            } | undefined;
            error?: undefined;
        };
        useList: <TKey_3 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_3) => LiveblocksStorage[TKey_3];
        useMap: <TKey_4 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_4) => LiveblocksStorage[TKey_4];
        useObject: <TKey_5 extends Extract<keyof LiveblocksStorage, string>>(key: TKey_5) => LiveblocksStorage[TKey_5];
    };
};

export { AirNode, AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel, StatelessAirNodeUnion, liveblocksNodeConfig };
