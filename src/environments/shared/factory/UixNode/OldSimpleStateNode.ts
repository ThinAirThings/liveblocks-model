import { LiveMap, LiveObject, Room } from "@liveblocks/client";
import { NodeTemplate } from "../NodeTemplate/createNodeTemplate.js";
import { LiveTreeStorageModel } from "../types/StorageModel.js";
import { LiveTreeNode } from "../LiveObjects/LiveTreeNode.js";
import { v4 as uuidv4 } from 'uuid'
import { useSyncExternalStore } from "react";
import { produce } from "immer";
import isEqual from "lodash.isequal";

export interface UixNode<
    ParentUixNode extends UixNode<any, any> | null=UixNode<any, any> | null,
    TemplateNode extends NodeTemplate=NodeTemplate
> {
    templateNode: TemplateNode
    parentNode: ParentUixNode
    nodeId: string
    type: TemplateNode['type']
    metadata: TemplateNode['metadata']
    create: <Type extends keyof TemplateNode['childNodes']>(type: Type) => UixNode<UixNode<ParentUixNode, TemplateNode>, TemplateNode['childNodes'][Type]>
    useData: <Key extends keyof TemplateNode['state']>(key: Key) => TemplateNode['state'][Key]
    mutate: <Key extends keyof TemplateNode['state']>(key: Key, value: TemplateNode['state'][Key]) => void
    delete: () => void
    useChildNodeTypeSet: <Type extends keyof TemplateNode['childNodes']>(type: Type) => Set<UixNode<UixNode<ParentUixNode, TemplateNode>, TemplateNode['childNodes'][Type]>>
    childNodeTypeSets: {
        [Key in keyof TemplateNode['childNodes']]: Set<
            UixNode<UixNode<ParentUixNode, TemplateNode>, TemplateNode['childNodes'][Key]>
        >
    }
}

export class SimpleStateNode<
    ParentUixNode extends UixNode<any, any> | null=UixNode<any, any> | null,
    TemplateNode extends NodeTemplate=NodeTemplate
> implements UixNode<ParentUixNode, TemplateNode> {
    nodeId: string;
    type: TemplateNode['type'];
    metadata: TemplateNode['metadata'];
    childNodeTypeSets: {
        [Key in keyof TemplateNode['childNodes']]: Set<
            UixNode<UixNode<ParentUixNode, TemplateNode>, TemplateNode['childNodes'][Key]>
        >
    }
    // Immer Cache
    #baseStateChildNodeTypeSets: UixNode<ParentUixNode, TemplateNode>['childNodeTypeSets']
    #useDataLastValues: Record<string, any>
    constructor(
        private liveTreeRoom: Room<{}, LiveTreeStorageModel, any, any>,
        public parentNode: ParentUixNode,
        private liveTreeNode: LiveTreeNode,
        public templateNode: TemplateNode,
        private uixNodeMap: Map<string, UixNode<any, any>>,
    ) {
        this.nodeId = liveTreeNode.get('nodeId')
        this.type = liveTreeNode.get('type')
        this.metadata = liveTreeNode.get('metadata')
        this.childNodeTypeSets = Object.fromEntries(Object.keys(templateNode.childNodes).map((type) => [type as any, new Set(
            [...liveTreeNode.get('childNodes').values()]
                .filter((liveTreeChildNode) => liveTreeChildNode.get('type') === type)
                .map((liveTreeChildNode) => new SimpleStateNode(
                    liveTreeRoom, <UixNode<ParentUixNode, TemplateNode>>this, liveTreeChildNode, templateNode.childNodes[type], uixNodeMap
                ))
        )]))
        this.#baseStateChildNodeTypeSets = Object.fromEntries(Object.keys(templateNode.childNodes).map((type) => [type as any, new Set(
            this.childNodeTypeSets[type].values()
        )]))
        this.#useDataLastValues = Object.fromEntries(Object.keys(liveTreeNode.toImmutable().state)
            .map(key => [key, {} as any]))
    }
    create: UixNode<ParentUixNode, TemplateNode>['create'] = (type) => {
        const newLiveTreeNode = new LiveTreeNode({
            metadata: {
                ...this.templateNode.childNodes[type as string].metadata,
                createdAt: new Date().toISOString()
            },
            nodeId: uuidv4(),
            type: type as string,
            parentNodeId: this.nodeId ?? null,
            parentType: this.type ?? null,
            stateDisplayKey: this.templateNode.childNodes[type as string].stateDisplayKey as string,
            state: new LiveObject(this.templateNode.childNodes[type as string].state),
            childNodes: new LiveMap([])
        })
        this.uixNodeMap.set(this.nodeId, <UixNode<ParentUixNode, TemplateNode>>this) // Set new live tree node in live tree map
        this.liveTreeNode.get('childNodes').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)  // Set new live tree node in parent live tree node
        const newNode = new SimpleStateNode(this.liveTreeRoom, <UixNode<ParentUixNode, TemplateNode>>this, newLiveTreeNode, this.templateNode.childNodes[type as string], this.uixNodeMap)
        this.childNodeTypeSets[type].add(newNode as any)    // Add to this runtime node's child node type set
        return newNode as any
    }
    useData: <Key extends keyof TemplateNode["state"]>(key: Key) => TemplateNode["state"][Key] = (key) => useSyncExternalStore((callback) => {
        const unsubscribe = this.liveTreeRoom.subscribe(this.liveTreeNode.get('state'), callback)
        return () => unsubscribe()
    }, () => {
        const newValue = this.liveTreeNode.get('state').toImmutable()[key as string]
        return isEqual(this.#useDataLastValues[key as string], newValue) 
            ? this.#useDataLastValues[key as string] 
            : this.#useDataLastValues[key as string] = newValue
    })
    mutate: UixNode<ParentUixNode, TemplateNode>['mutate'] = (key, value) => this.liveTreeNode.get('state').set(key as string, value)
    delete: UixNode<ParentUixNode, TemplateNode>['delete'] = () => {
        const deleteFromRuntimeMap = (runtimeNode: UixNode<any, any>) => {
            this.uixNodeMap.delete(runtimeNode.nodeId) 
            Object.values(runtimeNode.childNodeTypeSets).forEach((childTypeSet) => {
                childTypeSet.forEach((childRuntimeNode) => deleteFromRuntimeMap(childRuntimeNode))
            })
        }
        // Delete from Runtime Map
        deleteFromRuntimeMap(this)
        // Delete from Runtime Tree
        this.parentNode && this.parentNode.childNodeTypeSets[this.type].delete(<UixNode<any, any>> this)
        // Delete from Liveblocks Tree
        this.uixNodeMap.get(this.parentNode!.nodeId)!.liveTreeNode.get('childNodes').delete(this.liveTreeNode.get('nodeId'))
    }
    useChildNodeTypeSet: <
        Type extends keyof TemplateNode["childNodes"]
    >(type: Type) => Set<
        UixNode<UixNode<ParentUixNode, TemplateNode>, TemplateNode["childNodes"][Type]>
    > = (type) => useSyncExternalStore((callback) => {
            const unsubscribe = this.liveTreeRoom.subscribe(this.liveTreeNode.get('childNodes'), callback)
            return () => unsubscribe()
        }, () => produce(this.#baseStateChildNodeTypeSets[type], (draft) => {
                const liveNodeIds = new Set([...this.liveTreeNode.get('childNodes').keys()])
                const draftNodeIds = new Set([...draft].map((node) => node.nodeId))
                // If one of the existing nodes does not existing in the new set of liveNodeIds, delete it
                draft.forEach((node) => !liveNodeIds.has(node.nodeId) && draft.delete(node))
                // If one of the new liveNodeIds does not exist in the existing set of draftNodeIds, add it
                liveNodeIds.forEach((liveNodeId) => !draftNodeIds.has(liveNodeId) && draft.add(
                    this.uixNodeMap.get(liveNodeId)! as any  // This is fine because we know everything is already typed correctly.
                ))
            })
        )
}