import { JsonObject } from "@liveblocks/client";
import { CustomNodeTemplate, NullableCustomNodeTemplateRecord } from "./CustomNodeTemplate.js";
import { UixNode } from "./UixNode.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";





export const createSimpleStateNode = <
    ParentUixNode extends UixNode<any, any, any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    ChildRecords extends NullableCustomNodeTemplateRecord,
>(
    parentNode: ParentUixNode,
    nodeTemplate: CustomNodeTemplate<
        UixNodeType,
        CustomType,
        ChildRecords
    >,
) => {
    const childRecords = nodeTemplate.childCustomNodeTemplateRecord
    const simpleStateNode: UixNode<
        ParentUixNode,
        UixNodeType,
        ChildRecords
    > = {
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


