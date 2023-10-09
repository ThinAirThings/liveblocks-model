import { JsonObject, LiveList, LiveMap, LiveObject, Lson } from "@liveblocks/client"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type AirNode<
    T extends string,
    S extends JsonObject,
    SK extends keyof S&string,
    M extends JsonObject={}
> = {
    nodeId: string,
    parentNodeId: string | null,
    type: T,
    nodeMeta: M&{createdAt: string}
    state: S,
    stateDisplayKey: SK
    childrenNodeIds: Array<string>
}

export type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string,
    parentNodeId: string | null,
    type: N extends AirNode<infer T, any, any> ? T : never,
    nodeMeta: N extends AirNode<any, any, infer M> ? M : never,
    state: N extends AirNode<any, infer S, any> ? LiveObject<S> : never
    stateDisplayKey: N extends AirNode<any, infer S, any> ? keyof S&string : never,
    childrenNodeIds: LiveList<string>
}>

export type AirNodeIndex<M extends JsonObject> = {
    readonly [type: string]: {
        readonly state: JsonObject,
        readonly nodeMeta: M,
        readonly stateDisplayKey: keyof JsonObject&string
    }
}

export type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    readonly [T in keyof Index&string]: AirNode<
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
    readonly [Type in U['type']]: {
        readonly state: (U&{type: Type})['state'],
        readonly nodeMeta: (U&{type: Type})['nodeMeta'],
        readonly stateDisplayKey: (U&{type: Type})['stateDisplayKey']
    }
}

export const createNodeEntry = <
    S extends JsonObject,
    N extends keyof S&string,
    M extends JsonObject={},
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

export const createNodeIndexFactory = (index: Array<[string, <
    M extends JsonObject,
    S extends JsonObject,
    N extends keyof S&string,
>({
    nodeMeta,
    state,
    stateDisplayKey
}:{
    nodeMeta: M, 
    state: S, 
    stateDisplayKey: N
})=>{
    nodeMeta: M,
    state: S,
    stateDisplayKey: N
}]>) => Object.entries(index.map(([type, entry])=>[type, entry]))