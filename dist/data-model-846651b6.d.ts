import { LsonObject, Lson, LiveObject, LiveMap } from '@liveblocks/client';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type AirNode<T extends string, PT extends string | null, S extends LsonObject, SK extends keyof S & string, M extends Lson = {}> = {
    nodeId: string;
    type: T;
    parentNodeId: string | null;
    parentType: PT;
    state: S;
    stateDisplayKey: SK;
    nodeMeta: M & {
        createdAt: string;
    };
};
type StatelessAirNode<N extends AirNode<any, any, any, any>> = Omit<ReturnType<LiveAirNode<N>['toImmutable']>, 'state'>;
type LiveAirNode<N extends AirNode<any, any, any, any>> = LiveObject<{
    nodeId: string;
    type: N extends AirNode<infer T, any, any, any> ? T : never;
    parentNodeId: string | null;
    parentType: N extends AirNode<any, infer PT, any, any> ? PT : never;
    state: N extends AirNode<any, any, infer S, any> ? LiveObject<S> : never;
    stateDisplayKey: N extends AirNode<any, any, any, infer SK> ? SK : never;
    nodeMeta: N extends AirNode<any, any, any, any, infer M> ? M : never;
}>;
type AirNodeIndex<M extends LsonObject> = {
    [type: string]: {
        parentType: string | null;
        state: LsonObject;
        nodeMeta: M;
        stateDisplayKey: keyof LsonObject & string;
    };
};
type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    [T in (keyof Index) & string]: AirNode<T, Index[T]['parentType'], Index[T]['state'], Index[T]['stateDisplayKey'], Index[T]['nodeMeta']>;
}[keyof Index & string];
type StatelessAirNodeUnion<Index extends AirNodeIndex<any>> = {
    [T in (keyof Index) & string]: StatelessAirNode<AirNode<T, Index[T]['parentType'], Index[T]['state'], Index[T]['stateDisplayKey'], Index[T]['nodeMeta']>>;
}[keyof Index & string];
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any, any>>> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
};
type TypedNodeIndex<Index extends AirNodeIndex<any>, U extends AirNodeUnion<Index>> = {
    [Type in U['type']]: {
        parentType: (U & {
            type: Type;
        })['parentType'];
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
declare const createNodeEntry: <PT extends string | null, S extends LsonObject, N extends keyof S & string, M extends LsonObject = {}>({ parentType, nodeMeta, state, stateDisplayKey }: {
    parentType: PT;
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
}) => {
    parentType: PT;
    nodeMeta: M;
    state: S;
    stateDisplayKey: N;
};

export { AirNodeIndex as A, LiveblocksStorageModel as L, StatelessAirNodeUnion as S, TypedNodeIndex as T, UnionToIntersection as U, AirNodeUnion as a, LiveAirNode as b, AirNode as c, StatelessAirNode as d, createNodeEntry as e };
