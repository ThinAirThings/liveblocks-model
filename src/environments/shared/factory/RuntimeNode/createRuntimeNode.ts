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
    readonly [Property in keyof T as Exclude<Property, 'childNodes' | 'parentNode'>]: T[Property]
}

export type RuntimeNode<
    ParentRuntimeNode extends RuntimeNode<any, any> | null,
    TemplateNode extends NodeTemplate<any, any, any, any>
> = {
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
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
): RuntimeNode<ParentRuntimeNode, TemplateNode> => {
    const runtimeNode: RuntimeNode<ParentRuntimeNode, TemplateNode> =  {
        parentNode: parentRuntimeNode,
        nodeId: liveTreeNode.get('nodeId'),
        type: liveTreeNode.get('type'),
        metadata: liveTreeNode.get('metadata'),
        childNodes: new Map(
            [...liveTreeNode.get('childNodes').entries()]
                .map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
                    runtimeNode, nextLiveTreeNode, templateNode.childNodes[nextLiveTreeNode.get('type')], useStorage
                )])),
        create: (type) => {
            const newLiveTreeNode = new LiveTreeNode({
                liveTreeMap: liveTreeNode.get('liveTreeMap'),
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
            liveTreeNode.get('liveTreeMap').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode) // Set new live tree node in live tree map
            liveTreeNode.get('childNodes').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)  // Set new live tree node in parent live tree node
            const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode, templateNode.childNodes[type], useStorage)
            templateNode.childNodes[type].childNodes.push(newNode)
            return newNode
        },
        useData: (key) => useStorage((root) => root.liveTreeMap.get(liveTreeNode.get('nodeId'))!.state[key as string]),
        mutate: (key, value) => liveTreeNode.get('state').set(key as string, value),
        delete: () => {
            const deleteChildren = (liveTreeNode: LiveTreeNode) => {
                liveTreeNode.get('liveTreeMap').delete(liveTreeNode.get('nodeId')) 
                liveTreeNode.get('childNodes').forEach((liveTreeNode) => {
                    deleteChildren(liveTreeNode)
                })
            }
            deleteChildren(liveTreeNode)
            liveTreeNode.get('parentNode')?.get('childNodes').delete(liveTreeNode.get('nodeId'))
        },
        useChildNodes: () => useStorage((root) => {
            return new Set([...root.liveTreeMap.get(liveTreeNode.get('nodeId'))!.childNodes].map(([nodeId, immutableChildNode]) => {
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