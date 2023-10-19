import { LiveMap, LiveObject } from "@liveblocks/client"
import { LiveTreeNode } from "../LiveObjects/LiveTreeNode.js"
import { NodeTemplate } from "../NodeTemplate/createNodeTemplate.js"
import { v4 as uuidv4 } from 'uuid'
import { createRoomContext } from "@liveblocks/react"
import { LiveTreeStorageModel } from "../types/StorageModel.js"
import isEqual from "lodash.isequal"

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
            const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode, templateNode.childNodes[type], runtimeNodeMap, useStorage)
            return newNode
        },
        useData: (key) => useStorage(() => liveTreeNode.toImmutable().state[key as string]),
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
        useChildNodes: () => useStorage(() => {
            return new Set([...liveTreeNode.toImmutable()!.childNodes].map(([nodeId, immutableChildNode]) => {
                return {
                    nodeId: immutableChildNode.nodeId,
                    type: immutableChildNode.type,
                    metadata: immutableChildNode.metadata,
                    create: runtimeNode.childNodes.get(nodeId)!.create,
                    useChildNodes: runtimeNode.childNodes.get(nodeId)!.useChildNodes,
                    useData: runtimeNode.childNodes.get(nodeId)!.useData,
                    mutate: runtimeNode.childNodes.get(nodeId)!.mutate,
                    delete: runtimeNode.childNodes.get(nodeId)!.delete,
                }
            }))
        }, (a, b) => isEqual(a, b)),
        childNodes: null as any, // Deferred until object is initialized,
    }
    // Handle self reference. The alternative here is to use a class
    runtimeNode['childNodes'] = new Map(
        [...liveTreeNode.get('childNodes').entries()]
        .map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
            runtimeNode, nextLiveTreeNode, templateNode.childNodes[nextLiveTreeNode.get('type')], runtimeNodeMap, useStorage
        )])
    )
    return runtimeNode
}