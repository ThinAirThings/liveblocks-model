import { L as LiveAirNode, A as AirNodeIndex, a as AirNodeShape, b as AirNodeState, c as AirNodeType, d as LiveAirNodeState, g as LiveblocksPresence, e as LiveblocksStorageModel } from './data-model-e164a6b3.js';
export { f as AirNodeMeta, U as UnionToIntersection } from './data-model-e164a6b3.js';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _liveblocks_react from '@liveblocks/react';
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
    useStorageGetNodeMap: (nodeFilter?: ((value: [string, AirNodeShape<LiveAirNodeUnion>], index: number, array: [string, AirNodeShape<LiveAirNodeUnion>][]) => unknown) | undefined) => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>>;
    useStorageGetNode: <S extends _liveblocks_core.LsonObject, R>(nodeId: string, selector: (nodeState: S extends AirNodeState<infer N extends LiveAirNode<any, any>> ? AirNodeState<N> : never) => R | null) => R | null;
    useMutationCreateNode: <T extends AirNodeType<LiveAirNodeUnion>, S_1 extends Partial<(AirNodeShape<LiveAirNodeUnion> & {
        type: T;
    })["state"]>>() => (nodePath: string[], type: T, state?: S_1 | undefined) => string;
    useMutationUpdateNode: () => <N_1 extends LiveAirNode<any, any, any>>(nodeId: string, updater: (liveNodeState: N_1 extends LiveAirNode<infer T_1 extends string, infer S_2 extends _liveblocks_core.LsonObject, any> ? LiveAirNodeState<LiveAirNode<T_1, S_2, any>> : never) => void) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
    useNodeState: <T_2 extends LiveAirNode<any, any, any>, K extends keyof AirNodeState<T_2>>(nodeId: string, key: K) => [AirNodeState<T_2>[K], (newValue: AirNodeState<T_2>[K]) => void];
    useNodePathState: <T_3 extends AirNodeType<LiveAirNodeUnion>, S_3 extends (AirNodeShape<LiveAirNodeUnion> & {
        type: T_3;
    })["state"], K_1 extends keyof S_3>(nodePath: string[], nodeType: T_3, stateKey: K_1) => [S_3[K_1], (value: S_3[K_1]) => void];
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T_4>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_4, itemIsEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T_4])[];
    useStorage: <T_5>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion, Meta> extends infer T_6 ? T_6 extends LiveblocksStorageModel<LiveAirNodeUnion, Meta> ? T_6 extends _liveblocks_core.LsonObject ? { readonly [K_2 in keyof T_6]: _liveblocks_core.ToImmutable<Exclude<T_6[K_2], undefined>> | (undefined extends T_6[K_2] ? T_6[K_2] & undefined : never); } : T_6 extends _liveblocks_core.Json ? T_6 : never : never : never) => T_5, isEqual?: ((prev: T_5 | null, curr: T_5 | null) => boolean) | undefined) => T_5 | null;
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
        <T_7>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_7, isEqual?: ((prev: T_7, curr: T_7) => boolean) | undefined): T_7 | null;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>, _liveblocks_core.BaseUserMeta, never> | null>;
};

export { AirNodeIndex, AirNodeShape, AirNodeState, AirNodeType, LiveAirNode, LiveAirNodeState, LiveblocksPresence, LiveblocksStorageModel, liveblocksNodeConfig };
