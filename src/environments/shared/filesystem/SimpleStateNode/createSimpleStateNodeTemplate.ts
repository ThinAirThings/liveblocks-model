


import { JsonObject } from "@liveblocks/client";
import { UixNodeTemplate, createUixNodeTemplate } from "../UixNode/createUixNodeTemplate.js";
import { SimpleStateNode } from "./SimpleStateNode.js";

type SimpleStateNodeConfig<
    Metadata extends JsonObject=JsonObject,
    State extends JsonObject=JsonObject,
> = {
    metadata: Metadata
    state: State,
    stateDisplayKey: keyof State
}

export const createSimpleStateNodeTemplate = <
    CustomType extends string,
    Metadata extends JsonObject,
    State extends JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    config: SimpleStateNodeConfig<Metadata, State>,
    childTemplates?: ChildTemplates
) => createUixNodeTemplate(customType, SimpleStateNode<State>, { 
    metadata: config.metadata,
    initialState: config.state,
    stateDisplayKey: config.stateDisplayKey as string
}, childTemplates??{}) as UixNodeTemplate<
    CustomType,
    typeof SimpleStateNode<State>,
    Metadata,
    ChildTemplates
>