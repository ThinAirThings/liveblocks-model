import { L as LiveAirNode, a as LiveblocksStorageModel, A as AirNodeType, b as AirNodeState, c as LiveAirNodeState } from './data-model-30cf3f33.js';
export { e as AirNodeMeta, d as AirNodeShape, f as LiveblocksPresence, U as UnionToIntersection } from './data-model-30cf3f33.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { Lson, JsonObject, createClient } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksBrowserConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>, Meta extends Lson, LiveblocksPresence extends JsonObject = {}>(createClientProps: Parameters<typeof createClient>[0]) => {
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[];
    useStorage: <T_1>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_2 ? T_2 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_2 extends _liveblocks_core.LsonObject ? { readonly [K in keyof T_2]: _liveblocks_core.ToImmutable<Exclude<T_2[K], undefined>> | (undefined extends T_2[K] ? T_2[K] & undefined : never); } : T_2 extends _liveblocks_core.Json ? T_2 : never : never : never) => T_1, isEqual?: ((prev: T_1, curr: T_1) => boolean) | undefined) => T_1;
    RoomProvider: (props: {
        id: string;
        children: react.ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion, Meta> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion, Meta>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_3>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_3, isEqual?: ((prev: T_3, curr: T_3) => boolean) | undefined): T_3;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
    useHistory: () => _liveblocks_core.History;
    useCanUndo: () => boolean;
    useUndo: () => () => void;
    useCanRedo: () => boolean;
    useRedo: () => () => void;
    createLiveAirNode: <T_4 extends LiveAirNodeShape<LiveNodeUnion>>({ type, state, meta }: {
        type: T_4;
        state: any;
        meta: any;
    }) => LiveAirNode<T_4, any, any>;
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
};

export { AirNodeState, AirNodeType, LiveAirNode, LiveAirNodeState, LiveblocksStorageModel, liveblocksBrowserConfig };
