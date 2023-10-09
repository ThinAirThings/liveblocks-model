import { JsonObject, LiveObject, LiveList, LiveMap } from '@liveblocks/client';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type AirNode<T extends string, S extends JsonObject, SK extends keyof S & string, M extends JsonObject = {}> = {
    nodeId: string;
    parentNodeId: string | null;
    type: T;
    nodeMeta: M & {
        createdAt: string;
    };
    state: S;
    stateDisplayKey: SK;
    childrenNodeIds: Array<string>;
};
type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string;
    parentNodeId: string | null;
    type: N extends AirNode<infer T, any, any> ? T : never;
    nodeMeta: N extends AirNode<any, any, infer M> ? M : never;
    state: N extends AirNode<any, infer S, any> ? LiveObject<S> : never;
    stateDisplayKey: N extends AirNode<any, infer S, any> ? keyof S & string : never;
    childrenNodeIds: LiveList<string>;
}>;
type AirNodeIndex<M extends JsonObject> = {
    readonly [type: string]: {
        readonly state: JsonObject;
        readonly nodeMeta: M;
        readonly stateDisplayKey: keyof JsonObject & string;
    };
};
type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    readonly [T in keyof Index & string]: AirNode<T, Index[T]['state'], Index[T]['stateDisplayKey'], Index[T]['nodeMeta']>;
}[keyof Index & string];
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any>>> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
};
type TypedNodeIndex<Index extends AirNodeIndex<any>, U extends AirNodeUnion<Index>> = {
    readonly [Type in U['type']]: {
        readonly state: (U & {
            type: Type;
        })['state'];
        readonly nodeMeta: (U & {
            type: Type;
        })['nodeMeta'];
        readonly stateDisplayKey: (U & {
            type: Type;
        })['stateDisplayKey'];
    };
};
declare const createNodeEntry: <S extends JsonObject, N extends keyof S & string, M extends JsonObject = {}>({ nodeMeta, state, stateDisplayKey }: {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}) => {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
};
declare const createNodeIndexFactory: (index: [string, <M extends JsonObject, S extends JsonObject, N extends keyof S & string>({ nodeMeta, state, stateDisplayKey }: {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}) => {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}][]) => [string, (string | (<M extends JsonObject, S extends JsonObject, N extends keyof S & string>({ nodeMeta, state, stateDisplayKey }: {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}) => {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}))[]][];

export { AirNodeIndex as A, LiveblocksStorageModel as L, TypedNodeIndex as T, UnionToIntersection as U, AirNodeUnion as a, LiveAirNode as b, AirNode as c, createNodeEntry as d, createNodeIndexFactory as e };
