import { JsonObject } from "@liveblocks/client"

type NodeTemplateProps <
    S extends JsonObject,
    M extends JsonObject = {}
> = {
    metadata: M
    state: S
    stateDisplayKey: keyof S
}

export type NodeTemplate<
    Type extends string=string,
    Metadata extends JsonObject=JsonObject,
    State extends JsonObject=JsonObject,
    ChildNodes extends Record<string, NodeTemplate<any, any,  any, any>> | null=Record<string, NodeTemplate<any, any,  any, any>>,
> = {
    type: Type
    metadata: Metadata
    state: State
    stateDisplayKey: keyof State
    childNodes: ChildNodes
}

export const createNodeTemplate = <
    Type extends string,
    S extends JsonObject,
    M extends Record<string, JsonObject>,
    ChildNodes extends Record<string, NodeTemplate<any, any, any, any>> | null=null,
>(
    type: Type, 
    props: NodeTemplateProps<S, M>,
    childNodes?: ChildNodes
): NodeTemplate<Type, M, S, ChildNodes extends null ? null : NonNullable<ChildNodes>> => {
    return {
        type,
        metadata: props.metadata,
        stateDisplayKey: props.stateDisplayKey,
        state: props.state,
        childNodes: childNodes??null as any // This is perfectly legal to get typescript to handle the optional undefined case.
                                            // This happens because you can't mix type parameters and runtime parameters.
    }
}

