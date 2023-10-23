import { JsonObject } from "@liveblocks/client"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"
import { HasHead } from "./UtilityTypes.js"




export class S3ObjectNode<
    ParentUixNode extends UixNode<any, any, any, any> | null,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
> implements UixNode<ParentUixNode, 'S3ObjectNode', State, CTS>{
    parentNode: ParentUixNode
    constructor(
        parentNode: ParentUixNode,
        public nodeTemplate: UixNodeTemplate<'S3ObjectNode', CustomType, State, CTS>
    ) {
        this.parentNode = parentNode
    }
    create = <ChildType extends HasHead<CTS> extends true ? CTS[number]['customType'] : never>(childType: ChildType): UixNode<
        UixNode<ParentUixNode, 'S3ObjectNode', State, CTS>,
        (CTS[number]&{customType: ChildType})['uixNodeType'], 
        (CTS[number]&{customType: ChildType})['state'],
        (CTS[number]&{customType: ChildType})['childTemplates']
    >  => {
        return new SimpleStateNode(this, this.nodeTemplate.childTemplates
            .filter(template=>template.customType === childType)[0]
        )
    }
}