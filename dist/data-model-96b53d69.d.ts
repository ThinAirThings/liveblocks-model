import { LsonObject, LiveObject, LiveMap } from '@liveblocks/client';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type AirNode<T extends string, S extends LsonObject, SK extends keyof S & string, M extends LsonObject = {}> = {
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
type StatelessAirNode<N extends AirNode<any, any, any>> = Omit<ReturnType<LiveAirNode<N>['toImmutable']>, 'state'>;
type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string;
    parentNodeId: string | null;
    type: N extends AirNode<infer T, any, any> ? T : never;
    nodeMeta: N extends AirNode<any, any, infer M> ? M : never;
    state: N extends AirNode<any, infer S, any> ? LiveObject<S> : never;
    stateDisplayKey: N extends AirNode<any, any, infer SK> ? SK : never;
}>;
type AirNodeIndex<M extends LsonObject> = {
    [type: string]: {
        state: LsonObject;
        nodeMeta: M;
        stateDisplayKey: keyof LsonObject & string;
    };
};
type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    [T in (keyof Index) & string]: AirNode<T, Index[T]['state'], Index[T]['stateDisplayKey'], Index[T]['nodeMeta']>;
}[keyof Index & string];
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any>>> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
};
type TypedNodeIndex<Index extends AirNodeIndex<any>, U extends AirNodeUnion<Index>> = {
    [Type in U['type']]: {
        state: (U & {
            type: Type;
        })['state'];
        nodeMeta: (U & {
            type: Type;
        })['nodeMeta'];
        stateDisplayKey: (U & {
            type: Type;
        })['stateDisplayKey'];
    };
};
declare const createNodeEntry: <S extends LsonObject, N extends keyof S & string, M extends LsonObject = {}>({ nodeMeta, state, stateDisplayKey }: {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}) => {
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
};

export { AirNodeIndex as A, LiveblocksStorageModel as L, StatelessAirNode as S, TypedNodeIndex as T, UnionToIntersection as U, AirNodeUnion as a, LiveAirNode as b, AirNode as c, createNodeEntry as d };
