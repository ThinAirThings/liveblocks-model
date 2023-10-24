import { JsonObject, LiveMap, LiveObject, Room } from "@liveblocks/client";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";
import { v4 as uuidv4 } from 'uuid'
import { LiveIndexNode, LiveIndexStorageModel } from "../LiveObjects/LiveIndexNode.js";

export class UixNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    CustomType extends string=string,
    State extends JsonObject= JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
>{
    // Static
    declare static nodeType: string
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get uixNodeType(){ return this.liveIndexNode.get('uixNodeType')}    // These should be type declared in the Subtype
    get customType(){ return this.liveIndexNode.get('customType')}
    get metadata(){ return this.liveIndexNode.get('metadata')}

    childNodeTypeSets: {
        [ChildType in keyof ChildTemplates]: Map<string, UixNode<
            UixNode<ParentUixNode, CustomType, State, ChildTemplates>,
            ChildTemplates[ChildType]['customType'],
            ChildTemplates[ChildType]['state'],
            ChildTemplates[ChildType]['childTemplates']
        >>
    }

    state: State
    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: UixNodeTemplate<CustomType, State, ChildTemplates>
    ){
        this.liveIndexNode = this.liveNodeMap.get(nodeId)!
        const childTemplatesMap = new Map(Object.entries(nodeTemplate.childTemplates)) as Map<
            keyof ChildTemplates,
            UixNodeTemplate<any, any, any>
        >
        this.childNodeTypeSets = Object.fromEntries(
            [...childTemplatesMap].map(([childType, childTemplate]) => 
                [childType, new Map<string, UixNode>([...this.liveIndexNode.get('childNodeIds')].map(([nodeId]) => 
                    [nodeId, new childTemplate.Constructor(
                        liveIndexRoom,
                        liveNodeMap,
                        this,
                        nodeId,
                        childTemplate
                    )] 
                ))] 
        ))  as typeof this.childNodeTypeSets
    }

    createChild <ChildType extends keyof ChildTemplates>(
        childType: ChildType
    ): UixNode<
        UixNode<ParentUixNode, CustomType, State, ChildTemplates>,
        ChildTemplates[ChildType]['customType'],
        ChildTemplates[ChildType]['state'],
        ChildTemplates[ChildType]['childTemplates']
    > {
        if (!this.nodeTemplate.childTemplates[childType as string]) throw new Error(`Child type ${childType as string} does not exist on node type ${this.nodeTemplate.customType}`)
        const childTemplate = this.nodeTemplate.childTemplates[childType as string]
        const newLiveIndexNode = new LiveIndexNode({
            nodeId: uuidv4(),
            metadata: {
                createdAt: new Date().toISOString()
            },
            uixNodeType: this.nodeTemplate.childTemplates[childType as ].Constructor.nodeType,
            customType: childType as string,
            parentNodeId: this.nodeId,
            parentType: this.customType,
            childNodeIds: new LiveMap(),
            stateDisplayKey: '', // Deal with this later,
            state: new LiveObject(),
        })
        return new this.nodeTemplate.childTemplates[childType as string].Constructor(
            this.liveIndexRoom,
            this.liveNodeMap,
            this,
            newLiveIndexNode.get('nodeId'),
            childTemplate
        )
    }
}