import { L as LiveAirNode, f as LiveblocksPresence, a as LiveblocksStorageModel, A as AirNodeType, b as AirNodeState, c as LiveAirNodeState } from './data-model-dc644993.js';
export { e as AirNodeMeta, d as AirNodeShape, U as UnionToIntersection } from './data-model-dc644993.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _liveblocks_react from '@liveblocks/react';
import * as _liveblocks_core from '@liveblocks/core';
import { Lson } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksNodeConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>, Meta extends Lson>() => {
    useLostConnectionListener: (callback: (event: _liveblocks_core.LostConnectionEvent) => void) => void;
    useStatus: () => _liveblocks_core.Status;
    useErrorListener: (callback: (err: Error) => void) => void;
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
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
    useStorage: <T_2>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_3 ? T_3 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_3 extends _liveblocks_core.LsonObject ? { readonly [K in keyof T_3]: _liveblocks_core.ToImmutable<Exclude<T_3[K], undefined>> | (undefined extends T_3[K] ? T_3[K] & undefined : never); } : T_3 extends _liveblocks_core.Json ? T_3 : never : never : never) => T_2, isEqual?: ((prev: T_2 | null, curr: T_2 | null) => boolean) | undefined) => T_2 | null;
    RoomProvider: (props: {
        id: string;
        children: ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion, Meta> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion, Meta>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta> | null;
        <T_4>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_4, isEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined): T_4 | null;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
    createLiveAirNode: <T_5 extends LiveAirNodeShape<LiveNodeUnion>>({ type, state, meta }: {
        type: T_5;
        state: any;
        meta: any;
    }) => LiveAirNode<T_5, any, any>;
    useStorageGetMeta: () => _liveblocks_core.ToImmutable<Exclude<Meta, undefined>> | (undefined extends Meta ? Meta & undefined : never) | null;
    useMutationUpdateMeta: () => (updater: (meta: Meta) => void) => void;
    useStorageGetNodeMap: (nodeType?: AirNodeType<LiveAirNodeUnion> | undefined) => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>>;
    useStorageGetNode: <S extends _liveblocks_core.LsonObject, R_1>(nodeId: string, selector: (nodeState: S extends AirNodeState<infer N extends LiveAirNode<any, any>> ? AirNodeState<N> : never) => R_1) => NonNullable<R_1>;
    useMutationCreateNode: () => (args_0: {
        type: LiveAirNodeShape<LiveNodeUnion>;
        state: any;
        meta: any;
    }) => string;
    useMutationUpdateNode: <S_1 extends LiveAirNodeState<any>>() => (nodeId: string, updater: (liveNodeState: S_1 extends LiveAirNodeState<infer N_1 extends LiveAirNode<any, any, any>> ? LiveAirNodeState<N_1> : never) => void) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
    LiveblocksNodeRoomProvider: ({ userId, spaceId, serverName, children }: {
        userId: string;
        spaceId: string;
        serverName: string;
        children: () => ReactNode;
    }) => react_jsx_runtime.JSX.Element;
};

export { AirNodeState, AirNodeType, LiveAirNode, LiveAirNodeState, LiveblocksPresence, LiveblocksStorageModel, liveblocksNodeConfig };
