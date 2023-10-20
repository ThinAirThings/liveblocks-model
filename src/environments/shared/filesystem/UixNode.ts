import { Room } from "@liveblocks/client"
import { GenericCustomNodeTemplateRecord, GenericCustomNodeTemplate } from "./CustomNodeTemplate.js"
import { LiveIndexStorageModel } from "./LiveIndexNode.js"

export type UixNodeConstructor<
    ParentUixNode extends UixNode | null,
    CustomNodeTemplate extends GenericCustomNodeTemplate
> = {
    new (
        liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        parentNode: ParentUixNode,
        nodeId: string,
        nodeTemplate: CustomNodeTemplate,
    ): UixNode<ParentUixNode, CustomNodeTemplate>
}

export interface UixNode<
    ParentUixNode extends UixNode<any, any> | null=UixNode<any, any> | null,
    CustomNodeTemplate extends GenericCustomNodeTemplate=GenericCustomNodeTemplate,
> {
    // Properties
    nodeTemplate: CustomNodeTemplate
    parentNode: ParentUixNode
    nodeId: string
    uixNodeType: CustomNodeTemplate['uixNodeType']
    customType: CustomNodeTemplate['customType']
    metadata: CustomNodeTemplate['metadata']
    create:  <
        ChildType extends keyof NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>,
    >(childType: ChildType) => UixNode<UixNode<any, GenericCustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[ChildType]>


    // useStorage: <Key extends keyof CustomNodeTemplate['state']>(key: Key) => CustomNodeTemplate['state'][Key]
    // mutate:     <Key extends keyof CustomNodeTemplate['state']>(key: Key, value: CustomNodeTemplate['state'][Key]) => void
    // delete: () => void
    // useChildNodeTypeSet: <
    //     ChildType extends keyof CustomNodeTemplate['childCustomNodeTemplateRecord'],
    // >(childType: ChildType) => Set<UixNode<UixNode<ParentUixNode, CustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[ChildType]>> 
    // // Recursive Continuation
    // childNodeTypeSets:  CustomNodeTemplate['childCustomNodeTemplateRecord'] extends NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']> 
    //     ?{
    //         [Key in keyof NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>]: Set<
    //             UixNode<UixNode<ParentUixNode, CustomNodeTemplate>, NonNullable<CustomNodeTemplate['childCustomNodeTemplateRecord']>[Key]>
    //         >
    //     }
    //     : null
}


