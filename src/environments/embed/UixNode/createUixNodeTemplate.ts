import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";

type UixNodeTemplateProps<
    State extends JsonObject=JsonObject,
> = {
    state: State
}

export type UixNodeTemplate<
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}=Record<string, UixNodeTemplate<any, any, any>>,
> = {
    Constructor: typeof UixNode
    customType: CustomType
    state: State 
    childTemplates: ChildTemplates extends Record<string, UixNodeTemplate> ?{
        [ChildType in keyof ChildTemplates]: UixNodeTemplate<
            ChildTemplates[ChildType]['customType'],
            ChildTemplates[ChildType]['state'],
            ChildTemplates[ChildType]['childTemplates']
        >
    }: {}
}

export const createUixNodeTemplate = <
    CustomType extends string,
    UixNodeConstructor extends {new (...args: any[]): InstanceType<typeof UixNode>},
    State extends JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    UixNodeConstructor: UixNodeConstructor,
    props: UixNodeTemplateProps<State>,
    childTemplates?: ChildTemplates
) => {
    return {
        customType,
        state: props.state,
        childTemplates: childTemplates??{}
    } as UixNodeTemplate<
        CustomType,
        State,
        ChildTemplates
    >
}


