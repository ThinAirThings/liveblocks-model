import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, T as TypedNodeIndex, c as AirNode, S as StatelessAirNodeUnion } from './data-model-846651b6.js';
export { d as StatelessAirNode, U as UnionToIntersection, e as createNodeEntry } from './data-model-846651b6.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import { FC, ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { JsonObject, createClient, Lson, LiveObject, LsonObject, LiveMap, Room } from '@liveblocks/client';

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
    useStorage: <T_4>(selector: (root: _liveblocks_core.ToImmutable<LiveblocksStorage>) => T_4, isEqual?: ((prev: T_4, curr: T_4) => boolean) | undefined) => T_4;
    useSelf: {
        (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
        <T_5>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T_5, isEqual?: ((prev: T_5, curr: T_5) => boolean) | undefined): T_5;
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
        readonly type: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never, undefined>> | (undefined extends (U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never) ? (U extends AirNode<infer T_6 extends string, any, any, any, {}> ? T_6 : never) & undefined : never);
        readonly parentNodeId: string | null;
        readonly parentType: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never, undefined>> | (undefined extends (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) ? (U extends AirNode<any, infer PT extends string | null, any, any, {}> ? PT : never) & undefined : never);
        readonly state: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never, undefined>> | (undefined extends (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) ? (U extends AirNode<any, any, infer S extends _liveblocks_core.LsonObject, any, {}> ? _liveblocks_core.LiveObject<S> : never) & undefined : never);
        readonly stateDisplayKey: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) ? (U extends AirNode<any, any, any, infer SK extends string, {}> ? SK : never) & undefined : never);
        readonly nodeMeta: _liveblocks_core.ToImmutable<Exclude<U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never, undefined>> | (undefined extends (U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never) ? (U extends AirNode<any, any, any, any, infer M extends Lson> ? M : never) & undefined : never);
    }>;
    useStatelessNodeMap: (nodeFilter?: ((value: [string, U], index: number, array: [string, U][]) => unknown) | undefined) => Map<string, StatelessAirNodeUnion<Index>>;
    useNodeIdFromTreeClimb: <T_7 extends U["type"]>(nodeId: string, nodeType: T_7) => string;
    useCreateNode: <T_8 extends U["type"], S_1 extends (U & {
        type: T_8;
    })["state"]>() => (parentNodeId: string | null, type: T_8, state?: Partial<S_1> | undefined) => StatelessAirNodeUnion<Index> & {
        type: T_8;
    };
    useNodeState: <T_9 extends StatelessAirNodeUnion<Index> | null, S_2 extends (U & {
        type: Exclude<T_9, null>["type"];
    })["state"], SK_1 extends keyof S_2 & string>(node: T_9, stateKey: SK_1) => readonly [T_9 extends null ? S_2[SK_1] | null : S_2[SK_1], (value: S_2[SK_1]) => void, boolean];
    useNodeNameState: (nodeId: string) => readonly [string, (value: string) => void];
    useDeleteNode: () => (nodeId: string) => void;
};

type NodeTemplateProps<S extends JsonObject, M extends JsonObject = {}> = {
    metadata: M;
    state: S;
    stateDisplayKey: keyof S;
};
type NodeTemplate<Type extends string = string, Metadata extends JsonObject = JsonObject, State extends JsonObject = JsonObject, ChildNodes extends Record<string, NodeTemplate<any, any, any, any>> | null = null> = {
    type: Type;
    metadata: Metadata;
    state: State;
    stateDisplayKey: keyof State;
    childNodes: ChildNodes;
};
declare const createNodeTemplate: <Type extends string, S extends JsonObject, M extends JsonObject, ChildNodes extends Record<string, NodeTemplate<any, any, any, any>> | null = null>(type: Type, props: NodeTemplateProps<S, M>, childNodes?: ChildNodes | undefined) => NodeTemplate<Type, M, S, ChildNodes extends null ? null : NonNullable<ChildNodes>>;

type ILiveTreeNode = LiveObject<{
    metadata: JsonObject;
    nodeId: string;
    type: string;
    parentNodeId: string | null;
    parentType: string | null;
    stateDisplayKey: string;
    state: LiveObject<LsonObject>;
    childNodes: LiveMap<string, ILiveTreeNode>;
}>;
declare class LiveTreeNode extends LiveObject<ILiveTreeNode extends LiveObject<infer T> ? T : never> {
    constructor(data: {
        metadata: JsonObject;
        nodeId: string;
        type: string;
        parentNodeId: string | null;
        parentType: string | null;
        stateDisplayKey: string;
        state: LiveObject<LsonObject>;
        childNodes: LiveMap<string, ILiveTreeNode>;
    });
}

declare class LiveTreeRootNode extends LiveTreeNode {
    constructor();
}

type LiveTreeStorageModel = {
    liveTreeRootNode: LiveTreeRootNode;
};

type ImmutableRuntimeNode<T extends RuntimeNode<any, any>> = {
    readonly [Property in keyof T as Exclude<Property, 'childNodes' | 'parentNode' | "runtimeNodeMap" | 'liveTreeNode'>]: T[Property];
};
type RuntimeNode<ParentRuntimeNode extends RuntimeNode<any, any> | null, TemplateNode extends NodeTemplate<any, any, any, any>> = {
    runtimeNodeMap: Map<string, RuntimeNode<any, any>>;
    liveTreeNode: LiveTreeNode;
    templateNode: TemplateNode;
    parentNode: ParentRuntimeNode;
    nodeId: string;
    type: TemplateNode['type'];
    metadata: TemplateNode['metadata'];
    create: <Type extends keyof TemplateNode['childNodes']>(type: Type) => RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Type]>;
    useData: <Key extends keyof TemplateNode['state']>(key: Key) => TemplateNode['state'][Key];
    mutate: <Key extends keyof TemplateNode['state']>(key: Key, value: TemplateNode['state'][Key]) => void;
    delete: () => void;
    useChildNodeTypeSet: <Type extends keyof TemplateNode['childNodes']>(type: Type) => Set<RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Type]>>;
    childNodeTypeSets: {
        [Key in keyof TemplateNode['childNodes']]: Set<RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Key]>>;
    };
};
declare const createRuntimeNode: <ParentRuntimeNode extends RuntimeNode<any, any> | null, TemplateNode extends NodeTemplate<any, any, any, any>>(liveTreeRoom: Room<{}, LiveTreeStorageModel, any, any>, parentRuntimeNode: ParentRuntimeNode, liveTreeNode: LiveTreeNode, templateNode: TemplateNode, runtimeNodeMap: Map<string, RuntimeNode<any, any>>) => RuntimeNode<ParentRuntimeNode, TemplateNode>;

declare const createRootNodeTemplate: <ChildNodes extends Record<string, NodeTemplate<any, any, any, any>>>(childNodes: ChildNodes) => NodeTemplate<"RootNode", {}, {
    root: string;
}, ChildNodes extends null ? null : NonNullable<ChildNodes>>;

declare const createRootRuntimeNode: <RootNodeTemplate extends NodeTemplate<"RootNode", {}, {
    root: string;
}, Record<string, NodeTemplate<any, any, any, any>>>>(liveTreeRoom: Room<{}, LiveTreeStorageModel, any, any>, rootNodeTemplate: RootNodeTemplate) => Promise<RuntimeNode<null, RootNodeTemplate>>;
type RootRuntimeNode<RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>> = Awaited<ReturnType<typeof createRootRuntimeNode<RootNodeTemplate>>>;

declare const configureLiveTreeStorage: <LiveblocksPresence extends JsonObject, RootNodeTemplate extends NodeTemplate<"RootNode", {}, {
    root: string;
}, Record<string, NodeTemplate<any, any, any, any>>>>(rootNodeTemplate: RootNodeTemplate, liveblocksPresence: LiveblocksPresence, createClientProps: Parameters<typeof createClient>[0]) => {
    LiveTreeRootNodeProvider: FC<{
        roomId: string;
        children: ReactNode;
    }>;
    useLiveTreeRootNode: () => RootRuntimeNode<RootNodeTemplate>;
};

export { AirNode, AirNodeIndex, AirNodeUnion, ImmutableRuntimeNode, LiveAirNode, LiveblocksStorageModel, NodeTemplate, RuntimeNode, StatelessAirNodeUnion, TypedNodeIndex, configureLiveTreeStorage, createNodeTemplate, createRootNodeTemplate, createRuntimeNode, liveblocksBrowserConfig };
