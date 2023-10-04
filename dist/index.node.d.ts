import { L as LiveAirNode, A as AirNodeIndex, a as AirNodeType, b as AirNodeShape, c as AirNodeState, d as LiveAirNodeState, h as LiveblocksPresence, e as LiveblocksStorageModel } from './data-model-08646a3e.js';
export { g as AirNodeMeta, f as AirNodeParentType, U as UnionToIntersection } from './data-model-08646a3e.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import { ReactNode } from 'react';
import * as use_immer from 'use-immer';
import * as _liveblocks_core from '@liveblocks/core';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Lson } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksNodeConfig: <LiveAirNodeUnion extends LiveAirNode<any, any, any>, Meta extends Lson>(NodeIndex: AirNodeIndex<LiveAirNodeUnion>) => {
    LiveblocksNodeRoomProvider: ({ userId, spaceId, serverName, children }: {
        userId: string;
        spaceId: string;
        serverName: string;
        children: () => ReactNode;
    }) => react_jsx_runtime.JSX.Element;
    useStorageGetMeta: () => _liveblocks_core.ToImmutable<Exclude<Meta, undefined>> | (undefined extends Meta ? Meta & undefined : never) | null;
    useMutationUpdateMeta: () => (updater: (meta: Meta) => void) => void;
    useStorageGetNodeMap: (nodeFilter?: ((params_0: NodeContextType<react.Context<use_immer.ImmerHook<{ [K in AirNodeType<LiveAirNodeUnion_1>]: string | null; }>>>, params_1: [string, AirNodeShape<LiveAirNodeUnion>], params_2: number, params_3: [string, AirNodeShape<LiveAirNodeUnion>][]) => boolean) | undefined) => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>>;
    useStorageGetNode: <S extends _liveblocks_core.LsonObject, R>(nodeId: string, selector: (nodeState: S extends AirNodeState<infer N extends any> ? AirNodeState<N> : never) => R | null) => R | null;
    useMutationCreateNode: <T extends AirNodeType<LiveAirNodeUnion>, S_1 extends Partial<(AirNodeShape<LiveAirNodeUnion> & {
        type: T;
    })["state"]>>() => (type: T, state?: S_1 | undefined) => string;
    useMutationUpdateNode: () => <N_1 extends LiveAirNode<any, any, any>>(nodeId: string, updater: (liveNodeState: N_1 extends LiveAirNode<infer T_1 extends string, infer S_2 extends string | null, any> ? LiveAirNodeState<LiveAirNode<T_1, S_2, any>> : never) => void) => void;
    useMutationDeleteNode: <T_2 extends AirNodeType<LiveAirNodeUnion>>() => (nodeType: T_2) => void;
    useNodeState: <T_3 extends LiveAirNode<any, any, any>, K_1 extends keyof AirNodeState<T_3>>(nodeId: string, key: K_1) => [AirNodeState<T_3>[K_1], (newValue: AirNodeState<T_3>[K_1]) => void];
    NodeContext: react.Context<use_immer.ImmerHook<{ [K_2 in AirNodeType<LiveAirNodeUnion>]: string | null; }>>;
    NodeContextProvider: ({ contextValue, children }: {
        contextValue: { [K_3 in AirNodeType<LiveAirNodeUnion>]: string | null; };
        children: ReactNode;
    }) => react_jsx_runtime.JSX.Element;
    useNodeContext: <T_4 extends AirNodeType<LiveAirNodeUnion>>(nodeType: T_4) => readonly [{ [K_2 in AirNodeType<LiveAirNodeUnion>]: string | null; }[T_4], (newNodeId: string | null) => void];
    useNodeStateContext: <T_5 extends AirNodeType<LiveAirNodeUnion>, S_3 extends (AirNodeShape<LiveAirNodeUnion> & {
        type: T_5;
    })["state"], K_4 extends keyof S_3>(nodeType: T_5, stateKey: K_4) => [S_3[K_4], (value: S_3[K_4]) => void];
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T_6>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_6, itemIsEqual?: ((prev: T_6, curr: T_6) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_6])[];
    useStorage: <T_7>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_8 ? T_8 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_8 extends _liveblocks_core.LsonObject ? { readonly [K_5 in keyof T_8]: _liveblocks_core.ToImmutable<Exclude<T_8[K_5], undefined>> | (undefined extends T_8[K_5] ? T_8[K_5] & undefined : never); } : T_8 extends _liveblocks_core.Json ? T_8 : never : never : never) => T_7, isEqual?: ((prev: T_7 | null, curr: T_7 | null) => boolean) | undefined) => T_7 | null;
    RoomProvider: (props: {
        id: string;
        children: ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion, Meta> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion, Meta>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R_1 ? (...args: A) => R_1 : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta> | null;
        <T_9>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_9, isEqual?: ((prev: T_9, curr: T_9) => boolean) | undefined): T_9 | null;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
};

export { AirNodeIndex, AirNodeShape, AirNodeState, AirNodeType, LiveAirNode, LiveAirNodeState, LiveblocksPresence, LiveblocksStorageModel, liveblocksNodeConfig };
