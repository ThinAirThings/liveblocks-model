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
    readonly [Property in keyof T as Exclude<Property, 'childNodes' | 'parentNode' | "runtimeTreeNodeMap">]: T[Property]
}

export type RuntimeNode<
    ParentRuntimeNode extends RuntimeNode<any, any> | null,
    TemplateNode extends NodeTemplate<any, any, any, any>
> = {
    runtimeTreeNodeMap: Map<string, RuntimeNode<any, any>>
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
    runtimeTreeNodeMap: Map<string, RuntimeNode<any, any>>,
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
): RuntimeNode<ParentRuntimeNode, TemplateNode> => {
    const runtimeNode: RuntimeNode<ParentRuntimeNode, TemplateNode> =  {
        runtimeTreeNodeMap,
        parentNode: parentRuntimeNode,
        nodeId: liveTreeNode.get('nodeId'),
        type: liveTreeNode.get('type'),
        metadata: liveTreeNode.get('metadata'),
        childNodes: new Map(
            [...liveTreeNode.get('childNodes').entries()]
                .map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
                    runtimeNode, nextLiveTreeNode, templateNode.childNodes[nextLiveTreeNode.get('type')], runtimeTreeNodeMap, useStorage
                )])),
        create: (type) => {
            const newLiveTreeNode = new LiveTreeNode({
                metadata: templateNode.childNodes[type].metadata,
                nodeId: uuidv4(),
                type: type as string,
                parentNodeId: liveTreeNode.get('nodeId') ?? null,
                parentType: liveTreeNode.get('type') ?? null,
                stateDisplayKey: templateNode.childNodes[type].stateDisplayKey,
                state: new LiveObject(templateNode.childNodes[type].state),
                parentNode: liveTreeNode ?? null,
                childNodes: new LiveMap([])
            })
            runtimeTreeNodeMap.set(runtimeNode.nodeId, runtimeNode) // Set new live tree node in live tree map
            liveTreeNode.get('childNodes').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)  // Set new live tree node in parent live tree node
            const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode, templateNode.childNodes[type], runtimeTreeNodeMap, useStorage)
            return newNode
        },
        useData: (key) => useStorage(() => liveTreeNode.toImmutable().state[key as string]),
        mutate: (key, value) => liveTreeNode.get('state').set(key as string, value),
        delete: () => {
            const deleteFromRuntimeMap = (runtimeNode: RuntimeNode<any, any>) => {
                runtimeTreeNodeMap.delete(runtimeNode.nodeId) 
                runtimeNode.childNodes.forEach((childRuntimeNode) => {
                    deleteFromRuntimeMap(childRuntimeNode)
                })
            }
            deleteFromRuntimeMap(runtimeNode)
            liveTreeNode.get('parentNode')?.get('childNodes').delete(liveTreeNode.get('nodeId'))
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
        }, (a, b) => isEqual(a, b))
    }
    return runtimeNode
}