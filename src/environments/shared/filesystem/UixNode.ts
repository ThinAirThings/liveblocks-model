import { JsonObject, Room } from "@liveblocks/client"
import {  CustomNodeTemplate } from "./CustomNodeTemplate.js"
import { LiveIndexStorageModel } from "./LiveIndexNode.js"
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js"

// type ExtractParentNode<T> = 
//     T extends UixNode<infer ParentNode, infer CustomTemplate> 
//         ? UixNode<ParentNode, CustomTemplate> 
//         : never


export type UixNode<
    ParentUixNode extends UixNode<any, any, any, any, any, any, any> | null, 
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
    NullableCustomNodeTemplateRecord extends Record<string, any> | null,
> = {
    parentNode: ParentUixNode
    create: NullableCustomNodeTemplateRecord extends Record<string, any> 
        ? <ChildType extends keyof NullableCustomNodeTemplateRecord>(childType: ChildType) => void
        : never
}

export const createUixNode = <
    ParentUixNode extends UixNode<any, any, any, any, any, any, any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
    NullableCustomNodeTemplateRecord extends Record<string, any> | null,
>(
    parentNode: ParentUixNode,
    nodeTemplate: CustomNodeTemplate<
        UixNodeType, 
        CustomType, 
        Metadata, 
        State, 
        ImplementationIndex, 
        NullableCustomNodeTemplateRecord
    >
) => {

}


// & {
//     // Properties
//     nodeTemplate: CustomNodeTemplate
//     parentNode: ParentUixNode
//     nodeId: string
//     uixNodeType: CustomNodeTemplate['uixNodeType']
//     customType: CustomNodeTemplate['customType']
//     metadata: CustomNodeTemplate['metadata']
//     create:  <
//         ChildType extends keyof NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>,
//     >(childType: ChildType) => UixNode<UixNode<any, CustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[ChildType]>


//     // useStorage: <Key extends keyof CustomNodeTemplate['state']>(key: Key) => CustomNodeTemplate['state'][Key]
//     // mutate:     <Key extends keyof CustomNodeTemplate['state']>(key: Key, value: CustomNodeTemplate['state'][Key]) => void
//     // delete: () => void
//     // useChildNodeTypeSet: <
//     //     ChildType extends keyof CustomNodeTemplate['childCustomNodeTemplateRecord'],
//     // >(childType: ChildType) => Set<UixNode<UixNode<ParentUixNode, CustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[ChildType]>> 
//     // // Recursive Continuation
//     // childNodeTypeSets:  CustomNodeTemplate['childCustomNodeTemplateRecord'] extends NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']> 
//     //     ?{
//     //         [Key in keyof NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>]: Set<
//     //             UixNode<UixNode<ParentUixNode, CustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[Key]>
//     //         >
//     //     }
//     //     : null
// }


