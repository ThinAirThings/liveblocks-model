import { JsonObject } from "@liveblocks/client"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"
import { HasHead } from "./UtilityTypes.js"
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js"



export class SimpleStateNode<
    ParentUixNode extends UixNode | null,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
> extends UixNode<
    ParentUixNode,
    State,
    CTS
> {
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, State, CTS>>
    ){
        super(...args)
    }
}