import { JsonObject, Room } from "@liveblocks/client"
import {  CustomNodeTemplate, NullableCustomNodeTemplateRecord } from "./CustomNodeTemplate.js"
import { LiveIndexStorageModel } from "./LiveIndexNode.js"
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js"




export type UixNode<
    ParentUixNode extends UixNode<any, any, any> | null, 
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    ChildRecords extends NullableCustomNodeTemplateRecord,
> = {
    parentNode: ParentUixNode
    create: <
        ChildType extends keyof ChildRecords,
    >(childType: ChildType) => UixNode<
        UixNode<ParentUixNode, UixNodeType, NonNullable<ChildRecords>>, 
        NonNullable<ChildRecords>[ChildType]['uixNodeType'],
        NonNullable<ChildRecords>[ChildType]['childCustomNodeTemplateRecord']
    >
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


