import { NodeTemplate } from "../factory/NodeTemplate/createNodeTemplate.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { HasHead, HasTail } from "./UtilityTypes.js";
import { JsonObject, LiveMap, LiveObject, Room } from "@liveblocks/client";
import { LiveIndexNode, LiveIndexStorageModel } from "./LiveIndexNode.js";
import { v4 as uuidv4 } from 'uuid'
import { useSyncExternalStore } from "react";
import { produce } from "immer";

type ChildTypeMap<
    ParentUixNode extends UixNode | null = UixNode<any> | null,
    State extends JsonObject=JsonObject,
    CTS extends UixNodeTemplate[] | []=UixNodeTemplate[] | []
> = {
    [ChildType in CTS[number]['customType']]: Map<string, UixNode<
        UixNode<ParentUixNode, State, CTS>,
        (CTS[number]&{customType: ChildType})['state'],
        (CTS[number]&{customType: ChildType})['childTemplates']
    >>
}

export abstract class UixNode<
    ParentUixNode extends UixNode | null = UixNode<any> | null,
    State extends JsonObject=JsonObject,
    CTS extends UixNodeTemplate[] | []=UixNodeTemplate[] | []
>{
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get uixNodeType(){ return this.liveIndexNode.get('uixNodeType')}    // These should be type declared in the Subtype
    get customType(){ return this.liveIndexNode.get('customType')}
    get metadata(){ return this.liveIndexNode.get('metadata')}
    // UixNode Properties
    childNodeTypeMaps: ChildTypeMap<ParentUixNode, State, CTS> 
    // Immer Cache
    #baseStateChildNodeTypeMaps: ChildTypeMap<ParentUixNode, State, CTS>
    // Abstract Methods

    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: UixNodeTemplate<keyof typeof UixNodeTypeIndex, string, State, CTS>
    ) {
        this.liveIndexNode = liveNodeMap.get(nodeId)!
        this.childNodeTypeMaps= nodeTemplate.childTemplates.reduce((obj, template) => {
            obj[template.customType] = new Map([...this.liveIndexNode.get('childNodeIds')]
                .map(([nodeId])=>[nodeId, new UixNodeTypeIndex[template.uixNodeType].Constructor(liveIndexRoom, liveNodeMap, this, nodeId, template)])
            )
            return obj
        }, <ChildTypeMap<ParentUixNode, State, CTS>>{})
        this.#baseStateChildNodeTypeMaps = nodeTemplate.childTemplates.reduce((obj, template) => {
            obj[template.customType] = new Map(
                [...this.childNodeTypeMaps[template.customType]].map(([nodeId, node])=>[nodeId, node])
            )
            return obj
        }, <ChildTypeMap<ParentUixNode, State, CTS>>{})
    }
    create = <ChildType extends HasHead<CTS> extends true ? CTS[number]['customType'] : never>(childType: ChildType): UixNode<
        UixNode<ParentUixNode, State, CTS>,
        (CTS[number]&{customType: ChildType})['state'],
        (CTS[number]&{customType: ChildType})['childTemplates']
    >  => {
        if (!this.nodeTemplate.childTemplates.filter(template=>template.customType === childType).length) throw new Error(`No child template with customType ${childType} found`)
        const childTemplate = this.nodeTemplate.childTemplates.find(template=>template.customType === childType)!
        const newLiveIndexNode = new LiveIndexNode({
            nodeId: uuidv4(),
            metadata: {
                createdAt: new Date().toISOString()
            },
            uixNodeType: childTemplate.uixNodeType,
            customType: childType,
            parentNodeId: this.nodeId,
            parentType: this.customType,
            childNodeIds: new LiveMap(),
            stateDisplayKey: '', // Deal with this later,
            state: new LiveObject(),
        })
        this.liveNodeMap.set(newLiveIndexNode.get('nodeId')!, newLiveIndexNode)
        const newUixNode =  new UixNodeTypeIndex[childTemplate.uixNodeType].Constructor(
            this.liveIndexRoom, this.liveNodeMap, this, newLiveIndexNode.get('nodeId')!, childTemplate 
        )
        this.childNodeTypeMaps[childType].set(newUixNode.nodeId, newUixNode)
        return newUixNode
    }
    useChildNodeTypeMap = <ChildType extends HasHead<CTS> extends true ? CTS[number]['customType'] : never>(type: ChildType): Map<string, UixNode<
        UixNode<ParentUixNode, State, CTS>,
        (CTS[number]&{customType: ChildType})['state'],
        (CTS[number]&{customType: ChildType})['childTemplates']
    >> => useSyncExternalStore((callback) => {
            const unsubscribe = this.liveIndexRoom.subscribe(this.liveNodeMap.get(this.liveIndexNode.get('nodeId'))!, callback)
            return () => unsubscribe()
        }, () => produce(this.#baseStateChildNodeTypeMaps[type], (draft) => {
            const liveNodeIds = new Set([...this.liveIndexNode.get('childNodeIds').keys()])
            const draftNodeIds = new Set([...draft].map(([nodeId])=>nodeId))
            // If one of the existing nodes does not existing in the new set of liveNodeIds, delete it
            draftNodeIds.forEach((nodeId) => !liveNodeIds.has(nodeId) && draft.delete(nodeId))
            // If one of the new liveNodeIds does not exist in the existing set of draftNodeIds, add it
            liveNodeIds.forEach((liveNodeId) => !draftNodeIds.has(liveNodeId) 
                && draft.set(liveNodeId, this.childNodeTypeMaps[type].get(liveNodeId)! as any)
            )
        }))
    
    delete = () => {
        const deleteUixNode = (uixNode: UixNode) => {
            this.liveNodeMap.delete(uixNode.nodeId);
            [...this.nodeTemplate.childTemplates].forEach((template) => {
                uixNode.childNodeTypeMaps[template.customType].forEach((uixNode) => {
                    deleteUixNode(uixNode)
                })
            })
        }
        this.parentNode && this.parentNode.childNodeTypeMaps[this.customType].delete(this.nodeId)
    }
}

