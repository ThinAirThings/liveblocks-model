import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";

type UixNodeTemplateProps<
    State extends JsonObject=JsonObject,
> = {
    state: State
}

export type UixNodeTemplate<
    CustomType extends string=string,
    UixNodeConstructor extends {new (...args: any[]): UixNode}={new (...args: any[]): UixNode},
    State extends JsonObject=JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}=Record<string, UixNodeTemplate<any, any, any, any>>,
> = {
    Constructor: UixNodeConstructor
    customType: CustomType
    state: State 
    childTemplates: ChildTemplates extends Record<string, UixNodeTemplate> ?{
        [ChildType in keyof ChildTemplates]: UixNodeTemplate<
            ChildTemplates[ChildType]['customType'],
            ChildTemplates[ChildType]['Constructor'],
            ChildTemplates[ChildType]['state'],
            ChildTemplates[ChildType]['childTemplates']
        >
    }: {}
}
export const createUixNodeTemplate = <
    CustomType extends string,
    UixNodeConstructor extends {new (...args: any[]): UixNode},
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
        UixNodeConstructor,
        State,
        ChildTemplates
    >
}


