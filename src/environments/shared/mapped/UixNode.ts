import { NodeTemplate } from "../factory/NodeTemplate/createNodeTemplate.js";
import { UixNodeTypeIndex } from "../filesystem/UixNodeTypeIndex.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { HasTail } from "./UtilityTypes.js";




export type UixNode<
    ParentUixNode extends UixNode<any, any, any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CTU extends UixNodeTemplate<any, any, any>[] | [],
> = {
    parentNode: ParentUixNode
    create: <ChildType extends HasTail<CTU> extends true ? CTU[number]['customType'] : never>
        (childType: ChildType) => UixNode<
            UixNode<ParentUixNode, UixNodeType, CTU>,
            (CTU[number]&{customType: ChildType})['uixNodeType'], 
            (CTU[number]&{customType: ChildType})['childTemplates']
        >
}

class SimpleStateNode<
    ParentUixNode extends UixNode<any, any, any> | null,
    CustomType extends string,
    CTU extends UixNodeTemplate<any, any, any>[] | [],
> implements UixNode<ParentUixNode, 'SimpleStateNode', CTU>{
    parentNode: ParentUixNode
    constructor(
        parentNode: ParentUixNode,
        public nodeTemplate: UixNodeTemplate<
            'SimpleStateNode',
            CustomType,
            CTU
        >
    ) {
        this.parentNode = parentNode
    }
    create = <ChildType extends HasTail<CTU> extends true ? CTU[number]['customType'] : never>(childType: ChildType): UixNode<
        UixNode<ParentUixNode, 'SimpleStateNode', CTU>,
        (CTU[number]&{customType: ChildType})['uixNodeType'], 
        (CTU[number]&{customType: ChildType})['childTemplates']
    >  => {
            return new SimpleStateNode(this, this.nodeTemplate.childTemplates[childType])
        }
}


export const createSimpleStateNode = <
    ParentUixNode extends UixNode<any, any, any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    CTU extends UixNodeTemplate<any, any, any>[] | [],
>(
    parentNode: ParentUixNode,
    nodeTemplate: UixNodeTemplate<
        UixNodeType,
        CustomType,
        CTU
    >
): UixNode<
    ParentUixNode,
    UixNodeType,
    CTU
> => {
    const simpleStateNode = {
        parentNode,
        create: (childType) => {
            if(!childRecords) throw new Error(`Cannot create child node of type ${childType as string} for node of type ${nodeTemplate.uixNodeType}`)
            return createSimpleStateNode(
                simpleStateNode,
                childRecords[childType as string]
            )
        }
    }
    return simpleStateNode
}
