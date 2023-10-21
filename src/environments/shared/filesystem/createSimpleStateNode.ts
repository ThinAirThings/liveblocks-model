import { JsonObject } from "@liveblocks/client";
import { CustomNodeTemplate } from "./CustomNodeTemplate.js";
import { UixNode } from "./UixNode.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";





export const createSimpleStateNode = <
    ParentUixNode extends UixNode<any, any, any, any, any, any, any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
    NullableCustomNodeTemplateRecord extends Record<string, any> | null,
>(
    parentNode: ParentUixNode,
    {childCustomNodeTemplateRecord}: CustomNodeTemplate<
        UixNodeType, 
        CustomType, 
        Metadata, 
        State, 
        ImplementationIndex, 
        NullableCustomNodeTemplateRecord extends Record<string, any> 
            ? NonNullable<NullableCustomNodeTemplateRecord>
            : null
    >
) => {
    const simpleStateNode = childCustomNodeTemplateRecord
    ?  <UixNode<
        ParentUixNode,
        UixNodeType, 
        CustomType, 
        Metadata, 
        State, 
        ImplementationIndex, 
        NonNullable<NullableCustomNodeTemplateRecord>
    >> {
        parentNode: parentNode,
        create: (childType) => {}
    }
    : <UixNode<
        ParentUixNode,
        UixNodeType, 
        CustomType, 
        Metadata, 
        State, 
        ImplementationIndex, 
        null
    >> {
        parentNode: parentNode,
    }
    return simpleStateNode
}


