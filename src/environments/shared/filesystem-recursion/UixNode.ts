import { JsonObject, LiveMap, LiveObject, Room } from "@liveblocks/client";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { LiveIndexNode, LiveIndexStorageModel } from "../filesystem/LiveIndexNode.js";
import { v4 as uuidv4 } from 'uuid'


export abstract class UixNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
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

    state: State
    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: UixNodeTemplate< string, State, CTR>
    ){
        this.liveIndexNode = this.liveNodeMap.get(nodeId)!
    }

    createChild <ChildType extends keyof CTR>(
        childType: ChildType
    ): UixNode<
        UixNode<ParentUixNode, CustomType, State, CTR>,
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

        return newUixNode
    }
}