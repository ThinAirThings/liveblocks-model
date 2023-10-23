import { JsonObject } from "@liveblocks/client"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"
import { HasHead } from "./UtilityTypes.js"
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js"


export class SimpleStateNode<
    ParentUixNode extends UixNode<any, any, any, any> | null,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
> implements UixNode<ParentUixNode, 'SimpleStateNode', State, CTS>{
    parentNode: ParentUixNode
    constructor(
        parentNode: ParentUixNode,
        public nodeTemplate: UixNodeTemplate<'SimpleStateNode', CustomType, State, CTS>
    ) {
        this.parentNode = parentNode
    }
    create = <ChildType extends HasHead<CTS> extends true ? CTS[number]['customType'] : never>(childType: ChildType): UixNode<
        UixNode<ParentUixNode, 'SimpleStateNode', State, CTS>,
        (CTS[number]&{customType: ChildType})['uixNodeType'], 
        (CTS[number]&{customType: ChildType})['state'],
        (CTS[number]&{customType: ChildType})['childTemplates']
    >  => {
        if (!this.nodeTemplate.childTemplates.filter(template=>template.customType === childType).length) throw new Error(`No child template with customType ${childType} found`)
        const childTemplate = this.nodeTemplate.childTemplates.filter(template=>template.customType === childType)[0]
        return new UixNodeTypeIndex[childTemplate.uixNodeType].Constructor(this, childTemplate)
    }
}