import { L as LiveAirNode, A as AirNodeShape, a as AirNodeState, b as LiveAirNodeState, c as LiveblocksStorageModel } from './data-model-412cc31d.js';
export { e as AirNodeMeta, d as AirNodeType, f as LiveblocksPresence, U as UnionToIntersection } from './data-model-412cc31d.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { Lson, JsonObject, createClient } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksBrowserConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>, Meta extends Lson, LiveblocksPresence extends JsonObject = {}>(createClientProps: Parameters<typeof createClient>[0]) => {
    useStorageGetMeta: () => _liveblocks_core.ToImmutable<Exclude<Meta, undefined>> | (undefined extends Meta ? Meta & undefined : never) | null;
    useMutationUpdateMeta: () => (updater: (meta: Meta) => void) => void;
    useStorageGetNodeMap: (nodeFilter?: ((value: [string, AirNodeShape<LiveAirNodeUnion>], index: number, array: [string, AirNodeShape<LiveAirNodeUnion>][]) => unknown) | undefined) => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>>;
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
    useNodeState: <T_2 extends LiveAirNodeUnion, K extends keyof AirNodeState<T_2 extends LiveAirNodeUnion ? T_2 : never> = keyof AirNodeState<T_2 extends LiveAirNodeUnion ? T_2 : never>>(nodeId: string, key: K) => [AirNodeState<T_2>[K], (newValue: AirNodeState<T_2>[K]) => void];
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T_3>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_3, itemIsEqual?: ((prev: T_3, curr: T_3) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_3])[];
    useStorage: <T_4>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_5 ? T_5 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_5 extends _liveblocks_core.LsonObject ? { readonly [K_1 in keyof T_5]: _liveblocks_core.ToImmutable<Exclude<T_5[K_1], undefined>> | (undefined extends T_5[K_1] ? T_5[K_1] & undefined : never); } : T_5 extends _liveblocks_core.Json ? T_5 : never : never : never) => T_4, isEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined) => T_4;
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
        <T_6>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_6, isEqual?: ((prev: T_6, curr: T_6) => boolean) | undefined): T_6;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
    useHistory: () => _liveblocks_core.History;
    useCanUndo: () => boolean;
    useUndo: () => () => void;
    useCanRedo: () => boolean;
    useRedo: () => () => void;
    createLiveAirNode: <T_7 extends AirNodeShape<LiveAirNodeUnion>["type"]>(type: T_7, { state, meta }: {
        state: (AirNodeShape<LiveAirNodeUnion> & {
            type: T_7;
        })["state"];
        meta: (AirNodeShape<LiveAirNodeUnion> & {
            type: T_7;
        })["meta"];
    }) => LiveAirNode<T_7, (AirNodeShape<LiveAirNodeUnion> & {
        type: T_7;
    })["state"], (AirNodeShape<LiveAirNodeUnion> & {
        type: T_7;
    })["meta"]>;
};

export { AirNodeShape, AirNodeState, LiveAirNode, LiveAirNodeState, LiveblocksStorageModel, liveblocksBrowserConfig };
