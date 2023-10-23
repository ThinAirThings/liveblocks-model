import { Json, LiveMap, LiveObject, Lson, Room } from "@liveblocks/client";
import { ILiveIndexNode, LiveIndexNode, LiveIndexStorageModel } from "./LiveIndexNode.js";
import { GenericCustomNodeTemplate } from "./CustomNodeTemplate.js";
import { UixNode } from "./UixNode.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";
import { v4 as uuidv4 } from 'uuid'
import { useSyncExternalStore } from "react";
import isEqual from "lodash.isequal";
import { produce } from "immer";



export class SimpleStateNode <
    ParentUixNode extends UixNode<any, any>,
    CustomNodeTemplate extends GenericCustomNodeTemplate,
> implements UixNode<ParentUixNode, CustomNodeTemplate>{
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get uixNodeType(){ return this.liveIndexNode.get('uixNodeType') as CustomNodeTemplate['uixNodeType']}
    get customType(){ return this.liveIndexNode.get('customType') as CustomNodeTemplate['customType']}
    get metadata(){ return this.liveIndexNode.get('metadata') as CustomNodeTemplate['metadata']}
    // UixNode Objects
    childNodeTypeSets: UixNode<ParentUixNode, CustomNodeTemplate>['childNodeTypeSets']
    // Immer Cache Objects
    #lastStorageValues: Record<string, any>
    #baseStateChildNodeTypeSets: UixNode<ParentUixNode, CustomNodeTemplate>['childNodeTypeSets']
    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: CustomNodeTemplate,
        public uixNodeMap: Map<string, UixNode<any, any>>
    ){
        this.liveIndexNode = liveNodeMap.get(nodeId)!
        this.childNodeTypeSets = nodeTemplate.childCustomNodeTemplateRecord 
            ? Object.fromEntries(
                Object.keys(nodeTemplate.childCustomNodeTemplateRecord)
                    .map((customType) => [customType, new Set(
                        [...this.liveIndexNode.get('childNodeIds').keys()]
                        .filter((childNodeId) => this.liveNodeMap.get(childNodeId)!.get('customType') === customType)
                        .map((childNodeId) => new UixNodeTypeIndex[this.liveIndexNode.get('uixNodeType')! as keyof typeof UixNodeTypeIndex]['Constructor'](
                            liveIndexRoom, liveNodeMap, this, childNodeId, nodeTemplate.childCustomNodeTemplateRecord![customType]
                        ))
                    )])
            ) as any //This is just a lack of type controls with Object.entries
            : null 
        // Set Immer Cache
        this.#lastStorageValues = Object.fromEntries(Object.keys(this.liveIndexNode.toImmutable().state)
            .map(key => [key, {} as any]))
        this.#baseStateChildNodeTypeSets = this.nodeTemplate.childCustomNodeTemplateRecord && Object.fromEntries(
            Object.keys(this.nodeTemplate.childCustomNodeTemplateRecord).map((customType) => [customType, new Set(
                this.childNodeTypeSets![customType].values()
            )])
        ) as any
    }
    create(childType: keyof CustomNodeTemplate['childCustomNodeTemplateRecord'])  {
        const newLiveIndexNode = new LiveIndexNode({
            nodeId: uuidv4(),
            metadata: {
                ...this.nodeTemplate.metadata,
                createdAt: new Date().toISOString()
            },
            uixNodeType: this.nodeTemplate.childCustomNodeTemplateRecord![childType as string].uixNodeType as string,
            customType: childType as string,
            parentNodeId: this.nodeId,
            parentType: this.customType,
            childNodeIds: new LiveMap(),
            stateDisplayKey: this.nodeTemplate.childCustomNodeTemplateRecord![childType as string].stateDisplayKey as string,
            state: new LiveObject(),
        })
        this.liveNodeMap.set(newLiveIndexNode.get('nodeId'), newLiveIndexNode)  // Set new live index node in live index map
        const newUixNode = new UixNodeTypeIndex[newLiveIndexNode.get('uixNodeType')! as keyof typeof UixNodeTypeIndex]['Constructor'](
            this.liveIndexRoom, this.liveNodeMap, this, newLiveIndexNode.get('nodeId'), this.nodeTemplate.childCustomNodeTemplateRecord![childType as string]
        )
        this.childNodeTypeSets![childType as string].add(newUixNode as any) // Add to childNodeTypeSets
        this.uixNodeMap.set(newUixNode.nodeId, newUixNode)  // Set UixNodeMap
        return newUixNode as any
    }

    // useStorage: UixNode<ParentUixNode, CustomNodeTemplate>['useStorage'] = (key) => useSyncExternalStore((callback) => {
    //     const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get('state'), callback)
    //     return () => unsubscribe()
    // }, () => {
    //     const newValue = this.liveIndexNode.get('state').toImmutable()[key as string]
    //     return isEqual(this.#lastStorageValues[key as string], newValue) 
    //         ? this.#lastStorageValues[key as string] 
    //         : this.#lastStorageValues[key as string] = newValue
    // })
    // mutate: UixNode<ParentUixNode, CustomNodeTemplate>['mutate'] = (
    //     key, value
    // ) => this.liveIndexNode.get('state').set(key as string, value as Json)
    // delete: UixNode<ParentUixNode, CustomNodeTemplate>['delete'] = () => {
    //     const deleteFromUixNodeMap = (uixNode: UixNode<any, any>) => {
    //         this.uixNodeMap.delete(uixNode.nodeId)
    //         Object.values(uixNode.childNodeTypeSets).forEach((childNodeTypeSet) => {
    //             childNodeTypeSet.forEach((childNode) => deleteFromUixNodeMap(childNode))
    //         })
    //     }
    //     // Delete from UixNodeMap
    //     deleteFromUixNodeMap(this)
    //     // Delete from the Parent Node
    //     this.parentNode && this.parentNode.childNodeTypeSets![this.customType].delete(this)
    // }
    // useChildNodeTypeSet: UixNode<ParentUixNode, CustomNodeTemplate>['useChildNodeTypeSet'] = (
    //     childType
    // ) => useSyncExternalStore((callback) => {
    //     const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get('childNodeIds'), callback)
    //     return () => unsubscribe()
    // }, () => produce(this.#baseStateChildNodeTypeSets![childType as any], (draft) => {
        
    // }))
}




class Thing {
    constructor(){

    }
    method1 = true ? () => {} : () => {}
}