import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";



export class SimpleStateNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex= keyof typeof UixNodeTypeIndex,
    State extends JsonObject= JsonObject,
    CustomType extends string=string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    UixNodeType,
    CustomType,
    State,
    CTR
>{
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, UixNodeType, CustomType, State, CTR>>
    ){
        super(...args)
    }
}