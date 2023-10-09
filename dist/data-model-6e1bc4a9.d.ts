import { JsonObject, LiveObject, LiveList, LiveMap } from '@liveblocks/client';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type AirNode<T extends string, S extends JsonObject, N extends keyof S & string, M extends JsonObject = {}> = {
    nodeId: string;
    parentNodeId: string | null;
    type: T;
    nodeMeta: M & {
        createdAt: string;
    };
    stateDisplayKey: N;
    state: S;
    childrenNodeIds: Array<string>;
};
type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string;
    parentNodeId: string | null;
    type: N extends AirNode<infer T, any, any> ? T : never;
    nodeMeta: N extends AirNode<any, any, any, infer M> ? M : never;
    stateDisplayKey: N extends AirNode<any, any, infer S, any> ? keyof S & string : never;
    state: N extends AirNode<any, infer S, any, any> ? LiveObject<S> : never;
    childrenNodeIds: LiveList<string>;
}>;
type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    readonly [T in keyof Index]: AirNode<T extends string ? T : never, Index[T]['state'], Index[T]['stateDisplayKey'], Index[T]['nodeMeta']>;
}[keyof Index];
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any>>> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
};
type AirNodeIndex<M extends JsonObject> = {
    readonly [type: string]: {
        readonly state: JsonObject;
        readonly nodeMeta: M;
        readonly stateDisplayKey: keyof JsonObject & string;
    };
};
type TypedAirNodeIndex<Index extends AirNodeIndex<any>> = {
    readonly [T in keyof Index]: {
        readonly state: Index[T]['state'];
        readonly nodeMeta: Index[T]['nodeMeta'];
        readonly stateDisplayKey: Index[T]['stateDisplayKey'];
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

export { AirNodeIndex as A, LiveblocksStorageModel as L, TypedAirNodeIndex as T, UnionToIntersection as U, AirNodeUnion as a, LiveAirNode as b, AirNode as c, createNodeEntry as d };
