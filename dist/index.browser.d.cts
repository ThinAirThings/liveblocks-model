import { L as LiveAirNode, A as AirNodeType, a as AirNodeShape, b as AirNodeState, c as LiveAirNodeState, d as LiveblocksStorageModel } from './data-model-02154dae.js';
export { e as AirNodeMeta, f as LiveblocksPresence, N as NodeContextType, U as UnionToIntersection } from './data-model-02154dae.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import * as use_immer from 'use-immer';
import * as _liveblocks_core from '@liveblocks/core';
import { Lson, JsonObject, createClient } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksBrowserConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>, Meta extends Lson, LiveblocksPresence extends JsonObject = {}>(createClientProps: Parameters<typeof createClient>[0]) => {
    useStorageGetMeta: () => _liveblocks_core.ToImmutable<Exclude<Meta, undefined>> | (undefined extends Meta ? Meta & undefined : never) | null;
    useMutationUpdateMeta: () => (updater: (meta: Meta) => void) => void;
    useStorageGetNodeMap: (nodeFilter?: ((params_0: { [K in AirNodeType<LiveAirNodeUnion>]: string | null; }, params_1: [string, AirNodeShape<LiveAirNodeUnion>], params_2: number, params_3: [string, AirNodeShape<LiveAirNodeUnion>][]) => boolean) | undefined) => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>>;
    useStorageGetNode: <S extends _liveblocks_core.LsonObject, R>(nodeId: string, selector: (nodeState: S extends AirNodeState<infer N extends LiveAirNode<any, any>> ? AirNodeState<N> : never) => R | null) => R | null;
    useMutationCreateNode: () => <T extends AirNodeShape<LiveAirNodeUnion>["type"]>(type: T, { meta, state }: {
        state: (AirNodeShape<LiveAirNodeUnion> & {
            type: T;
        })["state"];
        meta: (AirNodeShape<LiveAirNodeUnion> & {
            type: T;
        })["meta"];
    }) => string;
    useMutationUpdateNode: () => <N_1 extends LiveAirNode<any, any>>(nodeId: string, updater: (liveNodeState: N_1 extends LiveAirNode<infer T_1 extends string, infer S_1 extends _liveblocks_core.LsonObject> ? LiveAirNodeState<LiveAirNode<T_1, S_1>> : never) => void) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
    useNodeState: <T_2 extends LiveAirNode<any, any>, K_1 extends keyof AirNodeState<T_2>>(nodeId: string, key: K_1) => [AirNodeState<T_2>[K_1], (newValue: AirNodeState<T_2>[K_1]) => void];
    NodeContext: react.Context<use_immer.ImmerHook<{ [K in AirNodeType<LiveAirNodeUnion>]: string | null; }>>;
    useNodeStateContext: <T_3 extends AirNodeType<LiveAirNodeUnion>, S_2 extends (AirNodeShape<LiveAirNodeUnion> & {
        type: T_3;
    })["state"], K_2 extends keyof S_2>(nodeType: T_3, stateKey: K_2) => [S_2[K_2], (value: S_2[K_2]) => void];
    NodeContextProvider: ({ children }: {
        children: react.ReactNode;
    }) => react_jsx_runtime.JSX.Element;
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T_4>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_4, itemIsEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_4])[];
    useStorage: <T_5>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_6 ? T_6 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_6 extends _liveblocks_core.LsonObject ? { readonly [K_3 in keyof T_6]: _liveblocks_core.ToImmutable<Exclude<T_6[K_3], undefined>> | (undefined extends T_6[K_3] ? T_6[K_3] & undefined : never); } : T_6 extends _liveblocks_core.Json ? T_6 : never : never : never) => T_5, isEqual?: ((prev: T_5, curr: T_5) => boolean) | undefined) => T_5;
    RoomProvider: (props: {
        id: string;
        children: react.ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion, Meta> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion, Meta>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R_1 ? (...args: A) => R_1 : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_7>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_7, isEqual?: ((prev: T_7, curr: T_7) => boolean) | undefined): T_7;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
    useHistory: () => _liveblocks_core.History;
    useCanUndo: () => boolean;
    useUndo: () => () => void;
    useCanRedo: () => boolean;
    useRedo: () => () => void;
    createLiveAirNode: <T_8 extends AirNodeShape<LiveAirNodeUnion>["type"]>(type: T_8, { state, meta }: {
        state: (AirNodeShape<LiveAirNodeUnion> & {
            type: T_8;
        })["state"];
        meta: (AirNodeShape<LiveAirNodeUnion> & {
            type: T_8;
        })["meta"];
    }) => LiveAirNode<T_8, (AirNodeShape<LiveAirNodeUnion> & {
        type: T_8;
    })["state"], (AirNodeShape<LiveAirNodeUnion> & {
        type: T_8;
    })["meta"]>;
};

export { AirNodeShape, AirNodeState, AirNodeType, LiveAirNode, LiveAirNodeState, LiveblocksStorageModel, liveblocksBrowserConfig };
