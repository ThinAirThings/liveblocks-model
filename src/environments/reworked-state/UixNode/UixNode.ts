import { JsonObject, LiveMap, LiveObject, Room } from "@liveblocks/client";
import { UixNodeConstructor, UixNodeTemplate, UixNodeType } from "./createUixNodeTemplate.js";
import { v4 as uuidv4 } from 'uuid'
import { LiveIndexNode, LiveIndexStorageModel } from "../LiveObjects/LiveIndexNode.js";
import { useSyncExternalStore } from "react";
import { produce } from "immer";


type ChildUixNode<
    ThisUixNode extends UixNode= UixNode<any>,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
    ChildType extends keyof ChildTemplates= keyof ChildTemplates,
> = UixNode<
    ThisUixNode,
    ChildTemplates[ChildType]['customType'],
    ChildTemplates[ChildType]['Constructor'],
    ChildTemplates[ChildType]['childTemplates']
>

export abstract class UixNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    CustomType extends string=string,
    NodeConstructor extends UixNodeConstructor=UixNodeConstructor,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
>{
    // Static
    declare static nodeType: string
    // Overrides
    abstract initialState: InstanceType<NodeConstructor>['initialState']
    abstract useStorage <Key extends keyof InstanceType<NodeConstructor>['initialState']> (key: Key): InstanceType<NodeConstructor>['initialState'][Key]
    abstract mutateStorage <Key extends keyof InstanceType<NodeConstructor>['initialState']> (key: Key, value: InstanceType<NodeConstructor>['initialState'][Key]): void
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get uixNodeType(){ return this.liveIndexNode.get('uixNodeType')}    // These should be type declared in the Subtype
    get state(){ return this.liveIndexNode.get('state') as LiveObject<any>} 
    get customType(){ return this.liveIndexNode.get('customType') as CustomType}
    get metadata(){ return this.liveIndexNode.get('metadata')}

    private childTemplatesMap: Map<
        string,
        UixNodeTemplate<any, any, any>
    >
    private childNodeTypeMaps: Map<string, Map<string, ChildUixNode<typeof this, ChildTemplates, keyof ChildTemplates>>>
    private baseStateChildNodeTypeMaps: Map<string, Map<string, ChildUixNode<typeof this, ChildTemplates, keyof ChildTemplates>>>
    private childTypeIsKey = (childType: string | number | symbol): childType is string => this.childTemplatesMap.has(childType as string)

    constructor(
        public liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: UixNodeTemplate<CustomType, UixNodeConstructor, any,  ChildTemplates>
    ){
        this.liveIndexNode = this.liveNodeMap.get(nodeId)!
        this.childTemplatesMap = new Map(Object.entries(nodeTemplate.childTemplates))
        this.childNodeTypeMaps = new Map(
            [...this.childTemplatesMap].map(([childType, childTemplate]) => 
                [childType, new Map<string, ChildUixNode<typeof this, ChildTemplates, keyof ChildTemplates>>([...this.liveIndexNode.get('childNodeIds')].map(([nodeId]) => 
                    [nodeId, new childTemplate.Constructor(
                        liveIndexRoom,
                        liveNodeMap,
                        this,
                        nodeId,
                        childTemplate
                    ) as ChildUixNode<typeof this, ChildTemplates, keyof ChildTemplates>] 
                ))] 
        ))
        this.baseStateChildNodeTypeMaps = new Map([...this.childNodeTypeMaps]
            .map(([childType, childNodeTypeMap]) =>
                [childType, new Map([...childNodeTypeMap])]
            )
        )
    }

    createChild <ChildType extends keyof ChildTemplates>(
        childType: ChildType
    ): UixNode<
        UixNode<ParentUixNode, CustomType, NodeConstructor, ChildTemplates>,
        ChildTemplates[ChildType]['customType'],
        ChildTemplates[ChildType]['Constructor'],
        ChildTemplates[ChildType]['childTemplates']
    > {
        
        if (!this.childTypeIsKey(childType)) throw new Error(`Child type ${childType as any} does not exist on node type ${this.nodeTemplate.customType}`)
        const childTemplate = this.childTemplatesMap.get(childType)!
        const newLiveIndexNode = new LiveIndexNode({
            nodeId: uuidv4(),
            metadata: {
                createdAt: new Date().toISOString()
            },
            uixNodeType: childTemplate.Constructor.nodeType,
            customType: childType as string,
            parentNodeId: this.nodeId,
            parentType: this.customType,
            childNodeIds: new LiveMap(),
            stateDisplayKey: '', // Deal with this later,
            state: new LiveObject(),
        })
        this.liveNodeMap.set(newLiveIndexNode.get('nodeId'), newLiveIndexNode)
        this.liveIndexNode.get('childNodeIds').set(newLiveIndexNode.get('nodeId'), null)
        const newUixNode = new childTemplate.Constructor(
            this.liveIndexRoom,
            this.liveNodeMap,
            this,
            newLiveIndexNode.get('nodeId'),
            childTemplate
        )
        this.childNodeTypeMaps.get(childType as string)!.set(newUixNode.nodeId, newUixNode)
        return newUixNode
    }
    useChildNodeTypeMap = <ChildType extends keyof ChildTemplates>(childType: ChildType): Map<string, 
        ChildUixNode<typeof this, ChildTemplates, ChildType>
    > => useSyncExternalStore((callback) => {
            const unsubscribe = this.liveIndexRoom.subscribe(this.liveNodeMap.get(this.liveIndexNode.get('nodeId'))!, callback)
            return () => unsubscribe()
        }, () => {
            if(!this.childTypeIsKey(childType)) throw new Error(`Child type ${childType as any} does not exist on node type ${this.nodeTemplate.customType}`)
            return produce(this.baseStateChildNodeTypeMaps.get(childType)!, (draft) => {
                const liveNodeIds = new Set([...this.liveIndexNode.get('childNodeIds').keys()])
                const draftNodeIds = new Set([...draft].map(([nodeId])=>nodeId))
                // If one of the existing nodes does not existing in the new set of liveNodeIds, delete it
                draftNodeIds.forEach((nodeId) => !liveNodeIds.has(nodeId) && draft.delete(nodeId))
                // If one of the new liveNodeIds does not exist in the existing set of draftNodeIds, add it
                liveNodeIds.forEach((liveNodeId) => !draftNodeIds.has(liveNodeId) 
                    && draft.set(liveNodeId, this.childNodeTypeMaps.get(childType)!.get(liveNodeId)! as any)
                )
            })
        })
    delete () {
        const deleteUixNode = (uixNode: UixNode) => {
            this.liveNodeMap.delete(uixNode.nodeId);
            uixNode.childNodeTypeMaps.forEach(typeMap => {
                typeMap.forEach((uixNode) => {
                    deleteUixNode(uixNode)
                })
            })
            this.childTemplatesMap.forEach((template) => {
                uixNode.childNodeTypeMaps.get(template.customType)!.forEach((uixNode) => {
                    deleteUixNode(uixNode)
                })
            })
        }
        deleteUixNode(this)
        this.parentNode 
            && this.parentNode.childNodeTypeMaps.get(this.customType)!.delete(this.nodeId)
            && this.parentNode.liveIndexNode.get('childNodeIds').delete(this.nodeId)
    }
}

