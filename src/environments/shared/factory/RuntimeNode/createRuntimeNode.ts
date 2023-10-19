import { LiveMap, LiveObject, Room } from "@liveblocks/client"
import { LiveTreeNode } from "../LiveObjects/LiveTreeNode.js"
import { NodeTemplate } from "../NodeTemplate/createNodeTemplate.js"
import { v4 as uuidv4 } from 'uuid'
import { createRoomContext } from "@liveblocks/react"
import { LiveTreeStorageModel } from "../types/StorageModel.js"
import isEqual from "lodash.isequal"
import { useSyncExternalStore } from "react"
import { enableMapSet, produce } from "immer"
enableMapSet()

// Just keeping this for reference of how to do mapped types. This is not currently used
export type ImmutableRuntimeNode<
    T extends RuntimeNode<any, any>
> = {
    readonly [Property in keyof T as Exclude<Property, 'childNodes' | 'parentNode' | "runtimeNodeMap" | 'liveTreeNode'>]: T[Property]
}

export type RuntimeNode<
    ParentRuntimeNode extends RuntimeNode<any, any> | null,
    TemplateNode extends NodeTemplate<any, any, any, any>
> = {
    runtimeNodeMap: Map<string, RuntimeNode<any, any>>
    liveTreeNode: LiveTreeNode
    templateNode: TemplateNode
    parentNode: ParentRuntimeNode
    nodeId: string
    type: TemplateNode['type']
    metadata: TemplateNode['metadata']
    create: <Type extends keyof TemplateNode['childNodes']>(type: Type) => RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Type]>
    useData: <Key extends keyof TemplateNode['state']>(key: Key) => TemplateNode['state'][Key]
    mutate: <Key extends keyof TemplateNode['state']>(key: Key, value: TemplateNode['state'][Key]) => void
    delete: () => void
    useChildNodeTypeSet: <Type extends keyof TemplateNode['childNodes']>(type: Type) => Set<RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Type]>>
    childNodeTypeSets: {
        [Key in keyof TemplateNode['childNodes']]: Set<
            RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Key]>
        >
    }
}

export const createRuntimeNode = <
    ParentRuntimeNode extends RuntimeNode<any, any> | null,
    TemplateNode extends NodeTemplate<any, any, any, any>,
>(
    liveTreeRoom: Room<{}, LiveTreeStorageModel, any, any>,
    parentRuntimeNode: ParentRuntimeNode,
    liveTreeNode: LiveTreeNode,
    templateNode: TemplateNode,
    runtimeNodeMap: Map<string, RuntimeNode<any, any>>,
): RuntimeNode<ParentRuntimeNode, TemplateNode> => {
    
    const runtimeNode: RuntimeNode<ParentRuntimeNode, TemplateNode> = {
        runtimeNodeMap,
        liveTreeNode,
        templateNode,
        parentNode: parentRuntimeNode,
        nodeId: liveTreeNode.get('nodeId'),
        type: liveTreeNode.get('type'),
        metadata: liveTreeNode.get('metadata'),
        create: (type) => {
            const newLiveTreeNode = new LiveTreeNode({
                metadata: {
                    ...templateNode.childNodes[type].metadata,
                    createdAt: new Date().toISOString()
                },
                nodeId: uuidv4(),
                type: type as string,
                parentNodeId: liveTreeNode.get('nodeId') ?? null,
                parentType: liveTreeNode.get('type') ?? null,
                stateDisplayKey: templateNode.childNodes[type].stateDisplayKey,
                state: new LiveObject(templateNode.childNodes[type].state),
                childNodes: new LiveMap([])
            })
            runtimeNodeMap.set(runtimeNode.nodeId, runtimeNode) // Set new live tree node in live tree map
            liveTreeNode.get('childNodes').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)  // Set new live tree node in parent live tree node
            const newNode = createRuntimeNode(liveTreeRoom, runtimeNode, newLiveTreeNode, templateNode.childNodes[type], runtimeNodeMap)
            runtimeNode.childNodeTypeSets[type].add(newNode)    // Add to this runtime node's child node type set
            return newNode
        },
        // Note, this will need to be beefed up.
        useData: (() => {
            let lastValues = Object.fromEntries(Object.keys(liveTreeNode.toImmutable().state)
                .map(key => [key, {} as any]))
            return (key) => useSyncExternalStore((callback) => {
                const unsubscribe = liveTreeRoom.subscribe(liveTreeNode.get('state'), callback)
                return () => unsubscribe()
            }, () => {
                const newValue = liveTreeNode.get('state').toImmutable()[key as string]
                return isEqual(lastValues[key as string], newValue) 
                    ? lastValues[key as string] 
                    : lastValues[key as string] = newValue
            })
        })(),   
        mutate: (key, value) => liveTreeNode.get('state').set(key as string, value),
        delete: () => {
            const deleteFromRuntimeMap = (runtimeNode: RuntimeNode<any, any>) => {
                runtimeNodeMap.delete(runtimeNode.nodeId) 
                Object.values(runtimeNode.childNodeTypeSets).forEach((childTypeSet) => {
                    childTypeSet.forEach((childRuntimeNode) => deleteFromRuntimeMap(childRuntimeNode))
                })
            }
            // Delete from Runtime Map
            deleteFromRuntimeMap(runtimeNode)
            // Delete from Runtime Tree
            runtimeNode.parentNode && runtimeNode.parentNode.childNodeTypeSets[runtimeNode.type].delete(<RuntimeNode<any, any>> runtimeNode)
            // Delete from Liveblocks Tree
            runtimeNodeMap.get(runtimeNode.parentNode!.nodeId)!.liveTreeNode.get('childNodes').delete(liveTreeNode.get('nodeId'))
        },
        useChildNodeTypeSet: null as any, // Deferred until object is initialized,
        childNodeTypeSets: null as any,    // Deferred until object is initialized,
    }
    // Handle self reference. The alternative here is to use a class
    runtimeNode['childNodeTypeSets'] = Object.fromEntries(Object.keys(templateNode.childNodes).map((type) => [type as any, new Set(
        [...liveTreeNode.get('childNodes').values()]
            .filter((liveTreeChildNode) => liveTreeChildNode.get('type') === type)
            .map((liveTreeChildNode) => createRuntimeNode(
                liveTreeRoom, runtimeNode, liveTreeChildNode, templateNode.childNodes[type], runtimeNodeMap
            ))
    )]))

    runtimeNode['useChildNodeTypeSet'] = (() => {
        const baseStateChildNodeTypeSets = Object.fromEntries(Object.keys(templateNode.childNodes).map((type) => [type as any, new Set(
            runtimeNode.childNodeTypeSets[type].values()
        )])) as RuntimeNode<ParentRuntimeNode, TemplateNode>['childNodeTypeSets']
        
        return (type: keyof TemplateNode["childNodes"]) => useSyncExternalStore((callback) => {
            const unsubscribe = liveTreeRoom.subscribe(liveTreeNode.get('childNodes'), callback)
            return () => unsubscribe()
        }, () => produce(baseStateChildNodeTypeSets[type], (draft) => {
                const liveNodeIds = new Set([...liveTreeNode.get('childNodes').keys()])
                const draftNodeIds = new Set([...draft].map((node) => node.nodeId))
                // If one of the existing nodes does not existing in the new set of liveNodeIds, delete it
                draft.forEach((node) => !liveNodeIds.has(node.nodeId) && draft.delete(node))
                // If one of the new liveNodeIds does not exist in the existing set of draftNodeIds, add it
                liveNodeIds.forEach((liveNodeId) => !draftNodeIds.has(liveNodeId) && draft.add(
                    runtimeNodeMap.get(liveNodeId)! as any  // This is fine because we know everything is already typed correctly.
                ))
            })
        )
    })()
    return runtimeNode
}