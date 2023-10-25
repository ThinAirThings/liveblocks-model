import { A as AirNodeIndex, a as AirNodeUnion, L as LiveblocksStorageModel, b as LiveAirNode, T as TypedNodeIndex, c as AirNode, S as StatelessAirNodeUnion } from './data-model-846651b6.js';
export { d as StatelessAirNode, U as UnionToIntersection, e as createNodeEntry } from './data-model-846651b6.js';
import * as _liveblocks_react from '@liveblocks/react';
import * as react from 'react';
import { FC, ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';
import { JsonObject, createClient, Lson, LiveMap, LiveObject, LsonObject, Room } from '@liveblocks/client';

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

type S3ObjectInterfaceState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error';
    objectName: string;
    data: string;
    previousUploadResponse: string;
};
declare class S3ObjectNode<ParentUixNode extends UixNode | null = UixNode<any> | null, CustomType extends string = string, ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate>> extends UixNode<ParentUixNode, CustomType, typeof S3ObjectNode, ChildTemplates> {
    static nodeType: "S3ObjectNode";
    initialState: S3ObjectInterfaceState;
    proxyUrl: string;
    constructor(...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, any, ChildTemplates>>);
    mutateStorage<Key extends keyof S3ObjectInterfaceState>(key: Key, value: S3ObjectInterfaceState[Key]): void;
    useStorage<Key extends keyof S3ObjectInterfaceState>(key: Key): S3ObjectInterfaceState[Key];
}

declare class SimpleStateNode<State extends JsonObject = JsonObject, ParentUixNode extends UixNode | null = UixNode<any> | null, CustomType extends string = string, ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate>> extends UixNode<ParentUixNode, CustomType, typeof SimpleStateNode, ChildTemplates> {
    static nodeType: "SimpleStateNode";
    initialState: State;
    lastStorageValues: State;
    constructor(...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, any, ChildTemplates>>);
    mutateStorage<Key extends keyof State>(key: Key, value: State[Key]): void;
    useStorage<Key extends keyof State>(key: Key): State[Key];
}

type UixNodeTemplateProps<Metadata extends JsonObject = JsonObject> = {
    metadata: Metadata;
    initialState?: JsonObject;
};
type UixNodeType = RootNode | S3ObjectNode | SimpleStateNode;
type UixNodeConstructor = {
    new (...args: any[]): UixNodeType;
};
type UixNodeTemplate<CustomType extends string = string, NodeConstructor extends UixNodeConstructor = UixNodeConstructor, Metadata extends JsonObject = JsonObject, ChildTemplates extends Record<string, UixNodeTemplate> | {} = Record<string, UixNodeTemplate<any, any, any, any>>> = {
    customType: CustomType;
    metadata: Metadata;
    initialState?: InstanceType<NodeConstructor>['initialState'];
    Constructor: NodeConstructor;
    childTemplates: ChildTemplates extends Record<string, UixNodeTemplate> ? {
        [ChildType in keyof ChildTemplates]: UixNodeTemplate<ChildTemplates[ChildType]['customType'], ChildTemplates[ChildType]['Constructor'], ChildTemplates[ChildType]['metadata'], ChildTemplates[ChildType]['childTemplates']>;
    } : {};
};
declare const createUixNodeTemplate: <CustomType extends string, Metadata extends JsonObject, NodeConstructor extends UixNodeConstructor, ChildTemplates extends {} | Record<string, UixNodeTemplate<string, UixNodeConstructor, JsonObject, Record<string, UixNodeTemplate<any, any, any, any>>>> = {}>(customType: CustomType, UixNodeConstructor: NodeConstructor, props: UixNodeTemplateProps<Metadata>, childTemplates?: ChildTemplates | undefined) => UixNodeTemplate<CustomType, NodeConstructor, Metadata, ChildTemplates>;

type LiveIndexStorageModel = {
    liveNodeMap: LiveMap<string, ILiveIndexNode>;
};
type ILiveIndexNode = LiveObject<{
    nodeId: string;
    metadata: JsonObject;
    uixNodeType: string;
    customType: string;
    parentNodeId: string | null;
    parentType: string | null;
    stateDisplayKey: string;
    state: LiveObject<LsonObject>;
    childNodeIds: LiveMap<string, null>;
}>;
declare class LiveIndexNode extends LiveObject<ILiveIndexNode extends LiveObject<infer T> ? T : never> {
    constructor(data: {
        nodeId: string;
        metadata: JsonObject;
        uixNodeType: string;
        customType: string;
        parentNodeId: string | null;
        parentType: string | null;
        childNodeIds: LiveMap<string, null>;
        stateDisplayKey: string;
        state: LiveObject<LsonObject>;
    });
}

type ChildUixNode<ThisUixNode extends UixNode = UixNode<any>, ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate<any, any, any>>, ChildType extends keyof ChildTemplates = keyof ChildTemplates> = UixNode<ThisUixNode, ChildTemplates[ChildType]['customType'], ChildTemplates[ChildType]['Constructor'], ChildTemplates[ChildType]['childTemplates']>;
declare abstract class UixNode<ParentUixNode extends UixNode | null = UixNode<any> | null, CustomType extends string = string, NodeConstructor extends UixNodeConstructor = UixNodeConstructor, ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate<any, any, any>>> {
    liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>;
    private liveNodeMap;
    parentNode: ParentUixNode;
    nodeTemplate: UixNodeTemplate<CustomType, UixNodeConstructor, any, ChildTemplates>;
    static nodeType: string;
    abstract initialState: InstanceType<NodeConstructor>['initialState'];
    abstract useStorage<Key extends keyof InstanceType<NodeConstructor>['initialState']>(key: Key): InstanceType<NodeConstructor>['initialState'][Key];
    abstract mutateStorage<Key extends keyof InstanceType<NodeConstructor>['initialState']>(key: Key, value: InstanceType<NodeConstructor>['initialState'][Key]): void;
    liveIndexNode: LiveIndexNode;
    get nodeId(): string;
    get uixNodeType(): string;
    get state(): LiveObject<any>;
    get customType(): CustomType;
    get metadata(): JsonObject;
    private childTemplatesMap;
    private childNodeTypeMaps;
    private baseStateChildNodeTypeMaps;
    private childTypeIsKey;
    constructor(liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>, liveNodeMap: LiveIndexStorageModel['liveNodeMap'], parentNode: ParentUixNode, nodeId: string, nodeTemplate: UixNodeTemplate<CustomType, UixNodeConstructor, any, ChildTemplates>);
    createChild<ChildType extends keyof ChildTemplates>(childType: ChildType): UixNode<UixNode<ParentUixNode, CustomType, NodeConstructor, ChildTemplates>, ChildTemplates[ChildType]['customType'], ChildTemplates[ChildType]['Constructor'], ChildTemplates[ChildType]['childTemplates']>;
    useChildNodeTypeMap: <ChildType extends keyof ChildTemplates>(childType: ChildType) => Map<string, ChildUixNode<this, ChildTemplates, ChildType>>;
    delete(): void;
}

declare class RootNode<ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate>> extends UixNode<null, 'root', typeof RootNode, ChildTemplates> {
    initialState: any;
    static nodeType: "RootNode";
    constructor(liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>, liveNodeMap: LiveIndexStorageModel['liveNodeMap'], rootNodeTemplate: UixNodeTemplate<'root', typeof RootNode, {}, ChildTemplates>);
    useStorage<Key extends never>(key: Key): {}[Key];
    mutateStorage<Key extends never>(key: Key, value: {}[Key]): void;
}

declare const configureLiveFilesystemStorage: <LiveblocksPresence extends JsonObject, RootNodeTemplate extends UixNodeTemplate<"root", typeof RootNode, {}, Record<string, UixNodeTemplate>>>(liveblocksPresence: LiveblocksPresence, createClientProps: Parameters<typeof createClient>[0], rootNodeTemplate: RootNodeTemplate) => {
    LiveFilesystemRootNodeProvider: FC<{
        roomId: string;
        children: ReactNode;
    }>;
    useLiveFilesystemRootNode: () => RootNode<RootNodeTemplate["childTemplates"]>;
};

declare const createRootNodeTemplate: <ChildTemplates extends Record<string, UixNodeTemplate> = Record<string, UixNodeTemplate>>(childTemplates: ChildTemplates) => UixNodeTemplate<"root", typeof RootNode, {}, ChildTemplates>;

type SimpleStateNodeConfig<Metadata extends JsonObject = JsonObject, State extends JsonObject = JsonObject> = {
    metadata: Metadata;
    state: State;
};
declare const createSimpleStateNodeTemplate: <CustomType extends string, Metadata extends JsonObject, State extends JsonObject, ChildTemplates extends {} | Record<string, UixNodeTemplate> = {}>(customType: CustomType, config: SimpleStateNodeConfig<Metadata, State>, childTemplates?: ChildTemplates | undefined) => UixNodeTemplate<CustomType, {
    new (liveIndexRoom: _liveblocks_core.Room<{}, LiveIndexStorageModel, any, any>, liveNodeMap: _liveblocks_core.LiveMap<string, ILiveIndexNode>, parentNode: UixNode<any, string, UixNodeConstructor, Record<string, UixNodeTemplate<any, any, any>>> | null, nodeId: string, nodeTemplate: UixNodeTemplate<string, UixNodeConstructor, any, Record<string, UixNodeTemplate>>): SimpleStateNode<State, UixNode<any, string, UixNodeConstructor, Record<string, UixNodeTemplate<any, any, any>>> | null, string, Record<string, UixNodeTemplate>>;
    nodeType: "SimpleStateNode";
}, Metadata, ChildTemplates>;

export { AirNode, AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel, StatelessAirNodeUnion, TypedNodeIndex, UixNode, UixNodeConstructor, UixNodeTemplate, UixNodeTemplateProps, UixNodeType, configureLiveFilesystemStorage, createRootNodeTemplate, createSimpleStateNodeTemplate, createUixNodeTemplate, liveblocksBrowserConfig };
