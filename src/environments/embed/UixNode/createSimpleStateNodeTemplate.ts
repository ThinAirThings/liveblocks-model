


import { JsonObject } from "@liveblocks/client";
import { UixNodeTemplate, createUixNodeTemplate } from "./createUixNodeTemplate.js";
import { SimpleStateNode } from "./SimpleStateNode.js";


export const createSimpleStateNodeTemplate = <
    CustomType extends string,
    State extends JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    state: State,
    childTemplates?: ChildTemplates
) => createUixNodeTemplate(customType, SimpleStateNode, { 
    state: state
}, childTemplates??{}) as UixNodeTemplate<
    CustomType,
    State,
    ChildTemplates
>