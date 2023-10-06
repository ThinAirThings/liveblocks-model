import { JsonObject, LiveList, LiveMap, LiveObject, Lson } from "@liveblocks/client"

export type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type AirNode<
    T extends string,
    S extends JsonObject,
    N extends keyof S&string,
    M extends JsonObject={}
> = {
    nodeId: string,
    parentNodeId: string | null,
    type: T,
    nodeMeta: M&{createdAt: string}
    stateDisplayKey: N
    state: S,
    childrenNodeIds: Array<string>
}

export type LiveAirNode<N extends AirNode<any, any, any>> = LiveObject<{
    nodeId: string,
    parentNodeId: string | null,
    type: N extends AirNode<infer T, any, any> ? T : never,
    nodeMeta: N extends AirNode<any, any, any, infer M> ? M : never,
    stateDisplayKey: N extends AirNode<any, any, infer S, any> ? keyof S&string : never,
    state: N extends AirNode<any, infer S, any, any> ? LiveObject<S> : never
    childrenNodeIds: LiveList<string>
}>

export type AirNodeUnion<Index extends AirNodeIndex<any>> = {
    readonly [T in keyof Index]: AirNode<
        T extends string ? T : never,
        Index[T]['state'],
        Index[T]['stateDisplayKey'],
        Index[T]['nodeMeta']
    >
}[keyof Index]

export type LiveblocksStorageModel<
    LiveAirNodeUnion extends LiveAirNode<AirNode<any, any, any>>,
> = {
    nodeMap: LiveMap<string, LiveAirNodeUnion>
}

export type AirNodeIndex<M extends JsonObject> = {
    readonly [type: string]: {
        readonly state: JsonObject,
        readonly nodeMeta: M,
        readonly stateDisplayKey: keyof JsonObject&string
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