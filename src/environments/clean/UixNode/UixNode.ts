import { JsonObject, LiveMap, LiveObject, Room } from "@liveblocks/client";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { v4 as uuidv4 } from 'uuid'
import { LiveIndexNode, LiveIndexStorageModel } from "../LiveObjects/LiveIndexNode.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";


export abstract class UixNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex= keyof typeof UixNodeTypeIndex,
    CustomType extends string=string,
    State extends JsonObject= JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
>{
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get uixNodeType(){ return this.liveIndexNode.get('uixNodeType')}    // These should be type declared in the Subtype
    get customType(){ return this.liveIndexNode.get('customType')}
    get metadata(){ return this.liveIndexNode.get('metadata')}

    // Abstract Methods
    // abstract create (
    //     ...args: ConstructorParameters<typeof UixNode<ParentUixNode, UixNodeType, CustomType, State, CTR>>
    // ): InstanceType<typeof UixNodeTypeIndex[UixNodeType]>

    state: State
    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: UixNodeTemplate< UixNodeType, CustomType, State, CTR>
    ){
        this.liveIndexNode = this.liveNodeMap.get(nodeId)!
    }

    createChild <ChildType extends keyof CTR>(
        childType: ChildType
    ): UixNode<
        UixNode<ParentUixNode, UixNodeType, CustomType, State, CTR>,
        CTR[ChildType]['uixNodeType'],
        CTR[ChildType]['customType'],
        CTR[ChildType]['state'],
        CTR[ChildType]['childTemplates']
    > {
        const childTemplate = this.nodeTemplate.childTemplates[childType]
        const newLiveIndexNode = new LiveIndexNode({
            nodeId: uuidv4(),
            metadata: {
                createdAt: new Date().toISOString()
            },
            uixNodeType: childTemplate.uixNodeType,
            customType: childType as string,
            parentNodeId: this.nodeId,
            parentType: this.customType,
            childNodeIds: new LiveMap(),
            stateDisplayKey: '', // Deal with this later,
            state: new LiveObject(),
        })
        return new UixNodeTypeIndex[childTemplate.uixNodeType](
            this.liveIndexRoom,
            this.liveNodeMap,
            this,
            newLiveIndexNode.get('nodeId'),
            childTemplate
        )
    }
}