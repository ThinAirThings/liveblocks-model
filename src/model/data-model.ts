import { JsonObject, LiveList, LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type AirNode<
    T extends string,
    S extends LsonObject,
    SK extends keyof S&string,
    M extends LsonObject={}
> = {
    nodeId: string,
    parentNodeId: string | null,
    type: T,
    nodeMeta: M&{createdAt: string}
    state: S,
    stateDisplayKey: SK
    childrenNodeIds: Array<string>
}

export type StatelessAirNode<
    N extends AirNode<any, any, any>
> = Omit<ReturnType<LiveAirNode<N>['toImmutable']>, 'state'>

export type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string,
    parentNodeId: string | null,
    type: N extends AirNode<infer T, any, any> ? T : never,
    nodeMeta: N extends AirNode<any, any, infer M> ? M : never,
    state: N extends AirNode<any, infer S, any> ? LiveObject<S> : never
    stateDisplayKey: N extends AirNode<any, any, infer SK> ? SK : never,
}>

export type AirNodeIndex<M extends LsonObject> = {
    [type: string]: {
        state: LsonObject,
        nodeMeta: M,
        stateDisplayKey: keyof LsonObject&string
    }
}

export type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    [T in (keyof Index)&string]: AirNode<
        T,
        Index[T]['state'],
        Index[T]['stateDisplayKey'],
        Index[T]['nodeMeta']
    >
}[keyof Index&string]

export type LiveblocksStorageModel<
    LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any>>,
> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>
}

export type TypedNodeIndex<
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
> = {
    [Type in U['type']]: {
        state: (U&{type: Type})['state'],
        nodeMeta: (U&{type: Type})['nodeMeta'],
        stateDisplayKey: (U&{type: Type})['stateDisplayKey']
    }
}

export const createNodeEntry = <
    S extends LsonObject,
    N extends keyof S&string,
    M extends LsonObject={},
>({
    nodeMeta,
    state,
    stateDisplayKey
}:{
    nodeMeta: M, 
    state: S, 
    stateDisplayKey: N
}) => ({
    nodeMeta,
    state,
    stateDisplayKey
})
