import { JsonObject, LiveMap, LiveObject } from "@liveblocks/client";
import { LiveTreeNode } from "./types/LiveTreeNode.js";
import { v4 as uuidv4 } from 'uuid'
import { RootLiveTreeNode } from "./types/RootLiveTreeNode.js";
import { createRoomContext } from "@liveblocks/react";
import { LiveTreeMap } from "./types/LiveTreeMap.js";
import { NodeTemplate } from "./types/NodeTemplate.js";
import { RuntimeNode } from "./types/RuntimeNode.js";



const TestNodeTemplateTree = {
    type: "Root" as const,
    metadata: {},
    stateDisplayKey: '' as const,
    state: {},
    childNodes: {
        "BusinessNode": {
            type: "BusinessNode" as const,
            metadata: {},
            stateDisplayKey: 'businessName' as const,
            state: {
                businessName: "New Business"
            },
            childNodes: {
                "EmployeeNode": {
                    type: "EmployeeNode" as const,
                    metadata: {},
                    stateDisplayKey: 'employeeName' as const,
                    state: {
                        employeeName: "New Employee"
                    },
                    childNodes: null
                },
                "ItemNode": {
                    type: "ItemNode" as const,
                    metadata: {},
                    stateDisplayKey: 'itemName' as const,
                    state: {
                        itemName: "New Item"
                    },
                    childNodes: null
                } 
            } as const
        }
    }    
}

const createNodeTemplateIndex = <T extends NodeTemplate<any>>(indexObject: Record<string, any>, templateTreeNode: T) => {
    indexObject[templateTreeNode.type] = {
        ...templateTreeNode,
        childNodeTypes: templateTreeNode.childNodes ? Object.keys(templateTreeNode.childNodes) : null
    }
    delete indexObject[templateTreeNode.type].childNodes
    templateTreeNode.childNodes && Object.values(templateTreeNode.childNodes).forEach((node) => {
        createNodeTemplateIndex(indexObject, node)
    })
    return indexObject
}

type RuntimeBuilderNode = {
    parentNode: RuntimeBuilderNode | null
    childNodes: Set<RuntimeBuilderNode>
}
type TypedRuntimeTree<Node extends NodeTemplate<any>> = Node extends {childNodes: Record<string, any>} 
    ? RuntimeNode<Node> & {
        childNodes: Set<{
            [K in keyof Node['childNodes']]: TypedRuntimeTree<Node['childNodes'][K]> & {parentNode: Node}
        }[keyof Node['childNodes']]>
        useChildNodes: () => Set<{
            [K in keyof Node['childNodes']]: TypedRuntimeTree<Node['childNodes'][K]> & {parentNode: Node}
        }[keyof Node['childNodes']]>
    } : RuntimeNode<Node> & {
        childNodes: null
    }

export const createRootNodeFactory = <
    TemplateTree extends NodeTemplate<any>,
    RuntimeTree extends TypedRuntimeTree<TemplateTree>,
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
    ) as unknown as RuntimeTree
}

// const rootNode = createRootNodeFactory(TestNodeTemplateTree, new RootLiveTreeNode())


// rootNode.childNodes.forEach((node) => node.create(''))