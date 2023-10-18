import { LiveMap, LiveObject } from "@liveblocks/client";
import { LiveTreeNode } from "./LiveObjects/LiveTreeNode.js";
import { v4 as uuidv4 } from 'uuid'
import { RootLiveTreeNode } from "./types/RootLiveTreeNode.js";
import { createRoomContext } from "@liveblocks/react";
import { LiveTreeMap } from "./LiveObjects/LiveTreeMap.js";
import { NodeTemplate } from "./types/NodeTemplate.js";
import { RuntimeNode } from "./types/RuntimeNode.js";
import { RuntimeNodeTree } from "./types/RuntimeNodeTree.js";
import { createNodeTemplateIndex } from "./NodeTemplate/createNodeTemplateIndex.js";


type RuntimeBuilderNode = {
    parentNode: RuntimeBuilderNode | null
    childNodes: Set<RuntimeBuilderNode>
}

export const createRootNode = <
    TemplateTree extends NodeTemplate<any>,
    RuntimeTree extends RuntimeNodeTree<TemplateTree>,
>(
    NodeTemplateTree: TemplateTree,
    liveTreeRoot: RootLiveTreeNode,
    liveTreeMap: LiveTreeMap,
    useStorage: ReturnType<typeof createRoomContext>['suspense']['useStorage']
) => {
    const nodeTemplateIndex = createNodeTemplateIndex({}, NodeTemplateTree)
    const createRuntimeNode = (parentRuntimeNode: any, liveTreeNode: LiveTreeNode) => {
        const runtimeNode = {
            ...Object.fromEntries(Object.entries(liveTreeNode.toImmutable()).filter( ([key]) => key !== 'state')) as Omit<ReturnType<LiveTreeNode['toImmutable']>, 'state'>,
            parentNode: parentRuntimeNode,
            childNodes: new Set(),
            create: (type: string) => {
                const newLiveTreeNode = new LiveTreeNode({
                    metadata: nodeTemplateIndex[type].metadata,
                    nodeId: uuidv4(),
                    type,
                    parentNodeId: liveTreeNode.get('nodeId') ?? null,
                    parentType: liveTreeNode.get('type') ?? null,
                    stateDisplayKey: nodeTemplateIndex[type].stateDisplayKey,
                    state: new LiveObject(nodeTemplateIndex[type].state),
                    parentNode: liveTreeNode ?? null,
                    childNodes: new LiveMap([])
                })
                liveTreeMap.set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)
                liveTreeNode.get('childNodes').set(newLiveTreeNode.get('nodeId'), newLiveTreeNode)
                const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode)
                runtimeNode.childNodes.add(newNode)
                return newNode
            },
            useChildNodes: () => useStorage(() => liveTreeNode.get('childNodes').values()),
            useRead: (key: string) => useStorage(() => liveTreeNode.get('state').get(key)),
            read: (key: string) => liveTreeNode?.get('state').get(key),
            update: (key: string, value: any) => liveTreeNode?.get('state').set(key, value),
            delete: () => {
                const deleteChildren = (liveTreeNode: LiveTreeNode) => {
                    liveTreeMap.delete(liveTreeNode.get('nodeId')) 
                    liveTreeNode.get('childNodes').forEach((liveTreeNode) => {
                        deleteChildren(liveTreeNode)
                    })
                }
                deleteChildren(liveTreeNode)
                liveTreeNode.get('parentNode')?.get('childNodes').delete(liveTreeNode.get('nodeId'))
            }
        }
        return runtimeNode as RuntimeNode<any> & RuntimeBuilderNode
    }
    const buildTree = (runtimeNode: RuntimeNode<any> & RuntimeBuilderNode, liveTreeNode: LiveTreeNode) => {
        liveTreeNode.get('childNodes').forEach((liveTreeNode) => {
            runtimeNode.childNodes.add(buildTree(
                createRuntimeNode(runtimeNode, liveTreeNode), 
                liveTreeNode
            ))
        })
        return runtimeNode 
    }
    return buildTree({
            type: "Root",
            childNodes: new Set(),
        } as any,
        liveTreeRoot as any
    ) as unknown as Pick<RuntimeTree, 'nodeId' | 'type' | 'childNodes'>
}

// const rootNode = createRootNodeFactory(TestNodeTemplateTree, new RootLiveTreeNode())
// rootNode.childNodes.forEach((node) => node.create(''))