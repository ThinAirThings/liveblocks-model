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
    parentNode: ParentRuntimeNode
    nodeId: string
    type: TemplateNode['type']
    metadata: TemplateNode['metadata']
    childNodes: Map<string, {
        [Key in keyof TemplateNode['childNodes']]: RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Key]>
    }[keyof TemplateNode['childNodes']]>
    create: <Type extends keyof TemplateNode['childNodes']>(type: Type) => RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Type]>
    useChildNodes: () => Set<{
        [Key in keyof TemplateNode['childNodes']]: ImmutableRuntimeNode<RuntimeNode<RuntimeNode<ParentRuntimeNode, TemplateNode>, TemplateNode['childNodes'][Key]>>
    }[keyof TemplateNode['childNodes']]>
    useData: <Key extends keyof TemplateNode['state']>(key: Key) => TemplateNode['state'][Key]
    mutate: <Key extends keyof TemplateNode['state']>(key: Key, value: TemplateNode['state'][Key]) => void
    delete: () => void
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
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
): RuntimeNode<ParentRuntimeNode, TemplateNode> => {
    
    const runtimeNode: RuntimeNode<ParentRuntimeNode, TemplateNode> = {
        runtimeNodeMap,
        liveTreeNode,
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
            const newNode = createRuntimeNode(liveTreeRoom, runtimeNode, newLiveTreeNode, templateNode.childNodes[type], runtimeNodeMap, useStorage)
            return newNode
        },
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
        })(),   // Note, this will need to be beefed up.
        mutate: (key, value) => liveTreeNode.get('state').set(key as string, value),
        delete: () => {
            const deleteFromRuntimeMap = (runtimeNode: RuntimeNode<any, any>) => {
                runtimeNodeMap.delete(runtimeNode.nodeId) 
                runtimeNode.childNodes.forEach((childRuntimeNode) => {
                    deleteFromRuntimeMap(childRuntimeNode)
                })
            }
            deleteFromRuntimeMap(runtimeNode)
            runtimeNodeMap.get(parentRuntimeNode!.nodeId)!.liveTreeNode.get('childNodes').delete(liveTreeNode.get('nodeId'))
        },
        useChildNodes: (() => {
            const baseState = new Set([...liveTreeNode.get('childNodes').toImmutable()].map(([_, immutableChildNode]) => {
                return {
                    nodeId: immutableChildNode.nodeId,
                    type: immutableChildNode.type,
                    metadata: immutableChildNode.metadata,
                    create: runtimeNode.childNodes.get(immutableChildNode.nodeId)!.create,
                    useChildNodes: runtimeNode.childNodes.get(immutableChildNode.nodeId)!.useChildNodes,
                    useData: runtimeNode.childNodes.get(immutableChildNode.nodeId)!.useData,
                    mutate: runtimeNode.childNodes.get(immutableChildNode.nodeId)!.mutate,
                    delete: runtimeNode.childNodes.get(immutableChildNode.nodeId)!.delete,
                }
            }))
            return () => useSyncExternalStore((callback) => {
                const unsubscribe = liveTreeRoom.subscribe(liveTreeNode.get('childNodes'), callback)
                return () => unsubscribe()
            }, () => produce(baseState, (draft) => {
                    const liveNodeIds = new Set([...liveTreeNode.get('childNodes').keys()])
                    const draftNodeIds = new Set([...draft].map((node) => node.nodeId))
                    // If one of the existing nodes does not existing in the new set of liveNodeIds, delete it
                    draft.forEach((node) => !liveNodeIds.has(node.nodeId) && draft.delete(node))
                    // If one of the new liveNodeIds does not exist in the existing set of draftNodeIds, add it
                    liveNodeIds.forEach((liveNodeId) => !draftNodeIds.has(liveNodeId) && draft.add({
                        nodeId: liveNodeId,
                        type: runtimeNodeMap.get(liveNodeId)!.type,
                        metadata: runtimeNodeMap.get(liveNodeId)!.metadata,
                        create: runtimeNode.childNodes.get(liveNodeId)!.create,
                        useChildNodes: runtimeNode.childNodes.get(liveNodeId)!.useChildNodes,
                        useData: runtimeNode.childNodes.get(liveNodeId)!.useData,
                        mutate: runtimeNode.childNodes.get(liveNodeId)!.mutate,
                        delete: runtimeNode.childNodes.get(liveNodeId)!.delete,
                    }))
                })
            )
        })(),
        childNodes: null as any, // Deferred until object is initialized,
    }
    // Handle self reference. The alternative here is to use a class
    runtimeNode['childNodes'] = new Map(
        [...liveTreeNode.get('childNodes').entries()]
        .map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
            liveTreeRoom, runtimeNode, nextLiveTreeNode, templateNode.childNodes[nextLiveTreeNode.get('type')], runtimeNodeMap, useStorage
        )])
    )
    return runtimeNode
}