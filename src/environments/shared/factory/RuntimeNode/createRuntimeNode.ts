import { LiveMap, LiveObject } from "@liveblocks/client"
import { LiveTreeNode } from "../LiveObjects/LiveTreeNode.js"
import { NodeTemplate } from "../NodeTemplate/createNodeTemplate.js"
import { v4 as uuidv4 } from 'uuid'
import { createRoomContext } from "@liveblocks/react"
import { LiveTreeStorageModel } from "../types/StorageModel.js"
import isEqual from "lodash.isequal"

export type ImmutableRuntimeNode<
    T extends RuntimeNode<any>
> = {
    readonly [Property in keyof T as Exclude<Property, 'childNodes'>]: T[Property]
}

export type RuntimeNode<
    TemplateNode extends NodeTemplate<any, any, any, any>
> = {
    nodeId: string
    type: TemplateNode['type']
    metadata: TemplateNode['metadata']
    childNodes: Map<string, {
        [Key in keyof TemplateNode['childNodes']]: RuntimeNode<TemplateNode['childNodes'][Key]>
    }[keyof TemplateNode['childNodes']]>
    create: <Type extends keyof TemplateNode['childNodes']>(type: Type) => RuntimeNode<TemplateNode['childNodes'][Type]>
    useChildNodes: () => Set<{
        [Key in keyof TemplateNode['childNodes']]: ImmutableRuntimeNode<RuntimeNode<TemplateNode['childNodes'][Key]>>
    }[keyof TemplateNode['childNodes']]>
    useData: <Key extends keyof TemplateNode['state']>(key: Key) => TemplateNode['state'][Key]
    mutate: <Key extends keyof TemplateNode['state']>(key: Key, value: TemplateNode['state'][Key]) => void
    // useRead: (key: string) => any
    // read: (key: string) => any
    // update: (key: string, value: any) => void
    // delete: () => void
}



export const createRuntimeNode = <
    TemplateNode extends NodeTemplate<any, any, any, any>,
>(
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
    liveTreeNode: LiveTreeNode,
    templateNode: TemplateNode,
): RuntimeNode<TemplateNode> => {
    const runtimeNode: RuntimeNode<TemplateNode> =  {
        nodeId: liveTreeNode.get('nodeId'),
        type: liveTreeNode.get('type'),
        metadata: liveTreeNode.get('metadata'),
        childNodes: new Map(
            [...liveTreeNode.get('childNodes').entries()]
                .map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
                    useStorage, nextLiveTreeNode, templateNode.childNodes[nextLiveTreeNode.get('type')]
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
            const newNode = createRuntimeNode(useStorage, newLiveTreeNode, templateNode.childNodes[type])
            templateNode.childNodes[type].childNodes.push(newNode)
            return newNode
        },
        useData: (key) => useStorage((root) => root.liveTreeMap.get(liveTreeNode.get('nodeId'))!.state[key as string]),
        mutate: (key, value) => liveTreeNode.get('state').set(key as string, value),
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
                }
            }))
        }, (a, b) => isEqual(a, b))
    }
    return runtimeNode
}