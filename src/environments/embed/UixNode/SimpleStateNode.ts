import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";





export class SimpleStateNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    State extends JsonObject= JsonObject,
    CustomType extends string=string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    CustomType,
    State,
    CTR
>{
    static nodeType = 'SimpleStateNode' as const
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, State, CTR>>
    ){
        super(...args)
    }
}