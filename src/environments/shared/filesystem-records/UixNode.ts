import { NodeTemplate } from "../factory/NodeTemplate/createNodeTemplate.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { HasHead, HasTail } from "./UtilityTypes.js";
import { JsonObject } from "@liveblocks/client";



export class UixNode<
    ParentUixNode extends UixNode | null = UixNode<any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex=keyof typeof UixNodeTypeIndex,
    State extends JsonObject=JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>
>{
    parentNode: ParentUixNode
    childNodeTypeSets: {
        [ChildType in keyof CTR]: Set<UixNode<
            UixNode<ParentUixNode, UixNodeType, State, CTR>,
            CTR[ChildType]['uixNodeType'], 
            CTR[ChildType]['state'],
            CTR[ChildType]['childTemplates']
        >>
    }
    constructor(
        parentNode: ParentUixNode,
        public nodeTemplate: UixNodeTemplate<UixNodeType, string, State, CTR>
    ) {
        this.parentNode = parentNode
    }
    create = <ChildType extends keyof CTR>(childType: ChildType): UixNode<
        UixNode<ParentUixNode, UixNodeType,  State, CTR>,
        CTR[ChildType]['uixNodeType'], 
        CTR[ChildType]['state'],
        CTR[ChildType]['childTemplates']
    >  => {
        const uixNodeType = this.nodeTemplate.childTemplates[childType].uixNodeType
        // if (!this.nodeTemplate.childTemplates.filter(template=>template.customType === childType).length) throw new Error(`No child template with customType ${childType} found`)
        // const childTemplate = this.nodeTemplate.childTemplates.find(template=>template.customType === childType)!
        const newNode =  new UixNodeTypeIndex[uixNodeType].Constructor(this, this.nodeTemplate.childTemplates[childType] as any)
        // this.childNodeTypeSets[childType].add(newNode as any)
        return newNode
    }
}

