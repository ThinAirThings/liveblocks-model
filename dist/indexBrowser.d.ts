import { L as LiveAirNode, a as LiveblocksPresence, b as LiveblocksStorageModel, c as LiveAirNodeShape } from './data-model-dd968e4a.js';
export { d as LiveAirNodeType, N as NodeId } from './data-model-dd968e4a.js';
import * as react from 'react';
import * as _liveblocks_react from '@liveblocks/react';
import * as _liveblocks_core from '@liveblocks/core';
import { createClient } from '@liveblocks/client';
import '@thinairthings/zoom-utils';

declare const liveblocksBrowserConfig: <LiveAirNodeUnion extends LiveAirNode<any, any>>(authEndpoint: NonNullable<Parameters<typeof createClient>[0]['authEndpoint']>) => {
    useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never>;
    useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void];
    useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
        addToHistory: boolean;
    } | undefined) => void;
    useOthersMapped: <T>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[];
    useStorage: <T_1>(selector: (root: LiveblocksStorageModel<LiveAirNodeUnion> extends infer T_2 ? T_2 extends LiveblocksStorageModel<LiveAirNodeUnion> ? T_2 extends _liveblocks_core.LsonObject ? { readonly [K in keyof T_2]: _liveblocks_core.ToImmutable<Exclude<T_2[K], undefined>> | (undefined extends T_2[K] ? T_2[K] & undefined : never); } : T_2 extends _liveblocks_core.Json ? T_2 : never : never : never) => T_1, isEqual?: ((prev: T_1, curr: T_1) => boolean) | undefined) => T_1;
    RoomProvider: (props: {
        id: string;
        children: react.ReactNode;
        shouldInitiallyConnect?: boolean | undefined;
        unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
        initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
        initialStorage?: LiveblocksStorageModel<LiveAirNodeUnion> | ((roomId: string) => LiveblocksStorageModel<LiveAirNodeUnion>) | undefined;
    }) => JSX.Element;
    useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_3>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_3, isEqual?: ((prev: T_3, curr: T_3) => boolean) | undefined): T_3;
    };
    RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion>, _liveblocks_core.BaseUserMeta, never> | null>;
    useHistory: () => _liveblocks_core.History;
    useCanUndo: () => boolean;
    useUndo: () => () => void;
    useCanRedo: () => boolean;
    useRedo: () => () => void;
    createLiveAirNode: <T_4 extends LiveAirNodeShape<LiveAirNodeUnion>["type"]>({ type, state, meta }: {
        type: T_4;
        state: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_4;
        })["state"];
        meta: (LiveAirNodeShape<LiveAirNodeUnion> & {
            type: T_4;
        })["meta"];
    }) => LiveAirNode<T_4, (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_4;
    })["state"], (LiveAirNodeShape<LiveAirNodeUnion> & {
        type: T_4;
    })["meta"]>;
    useStorageGetNodeMap: () => ReadonlyMap<string, _liveblocks_core.ToImmutable<LiveAirNodeUnion>> | null;
    useStorageGetNode: <K_1 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_1) => LiveAirNodeShape<LiveAirNodeUnion>["state"][K_1];
    useMutationCreateNode: () => (args_0: {
        type: any;
        state: any;
        meta: any;
    }) => void;
    useMutationUpdateNode: <K_2 extends keyof LiveAirNodeShape<LiveAirNodeUnion>["state"]>(nodeId: string, key: K_2) => (value: LiveAirNodeShape<LiveAirNodeUnion>["state"][K_2]) => void;
    useMutationDeleteNode: () => (nodeId: string) => void;
};

export { LiveAirNode, LiveAirNodeShape, LiveblocksPresence, LiveblocksStorageModel, liveblocksBrowserConfig };
