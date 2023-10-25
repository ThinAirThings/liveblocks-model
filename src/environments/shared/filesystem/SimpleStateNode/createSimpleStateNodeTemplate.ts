


import { JsonObject } from "@liveblocks/client";
import { UixNodeTemplate, createUixNodeTemplate } from "../UixNode/createUixNodeTemplate.js";
import { SimpleStateNode } from "./SimpleStateNode.js";


export const createSimpleStateNodeTemplate = <
    CustomType extends string,
    Metadata extends JsonObject,
    State extends JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    metadata: Metadata,
    state: State,
    childTemplates?: ChildTemplates
) => createUixNodeTemplate(customType, SimpleStateNode<State>, { 
    metadata: metadata,
    initialState: state
}, childTemplates??{}) as UixNodeTemplate<
    CustomType,
    typeof SimpleStateNode<State>,
    Metadata,
    ChildTemplates
>