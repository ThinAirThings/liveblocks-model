import { LiveObject, LsonObject } from "@liveblocks/client"
import {v4 as uuidv4} from 'uuid'
import { LiveblocksStorageModel2 } from "./initializeRuntimeGraph.js"

export type StringKey<Index extends Record<string, any>> = keyof Index & string
export type IndexNode = {
    parentType: string | null
    stateDisplayKey: string
    state: LsonObject
}

export type LiveDataNode = LiveObject<Omit<IndexNode, 'state'> & {
    type: string
    nodeId: string
    parentNodeId: string | null
    state: LiveObject<IndexNode['state']>
}>

export const defineRuntimeNode = <
    Index extends Record<string, IndexNode>
>(
    NodeIndex: Index,
    liveNodeMap: LiveblocksStorageModel2['nodeMap']
) => class RuntimeNode<T extends StringKey<Index>> {
    // Static
    public static liveNodeMap = liveNodeMap
    public static root: RuntimeNode<'root'>
    static {
        const buildTree = (node: InstanceType<typeof RuntimeNode<StringKey<Index>>>) => { 
            liveNodeMap.forEach((nextDataNode) => nextDataNode.get('parentNodeId') === node.nodeId 
                && node.childNodes.add(
                    buildTree(new RuntimeNode(
                        nextDataNode.get('type'), 
                        node as InstanceType<typeof RuntimeNode<StringKey<Index>>>['parentNode'], 
                        nextDataNode
                    ))
                )
            )
            return node
        }
        RuntimeNode.root = buildTree(new RuntimeNode('root', null)) as RuntimeNode<'root'>
    }
    // Instance
    public liveDataNode: LiveDataNode
    public parentNode: RuntimeNode<StringKey<Index> & Index[T]['parentType']> | null
    public childNodes: Set<RuntimeNode<StringKey<Index>>> = new Set()

    // Live Data Node Getters
    get nodeId() { return this.liveDataNode.get('nodeId')}
    get type() { return this.liveDataNode.get('type')}
    get state() { return this.liveDataNode.get('state') }
    get stateDisplayKey() { return this.liveDataNode.get('stateDisplayKey')}
    constructor(
        type: T,
        parentNode: RuntimeNode<T>['parentNode'],
        liveDataNode?: LiveDataNode
    ){

        if (liveDataNode) {
            this.liveDataNode = liveDataNode
        } else {
            this.liveDataNode = new LiveObject({
                nodeId: uuidv4(),
                parentNodeId: parentNode?.nodeId ?? null,
                type: type,
                state: new LiveObject({...NodeIndex[type].state}),
                parentType: NodeIndex[type].parentType,
                stateDisplayKey: NodeIndex[type].stateDisplayKey
            }) satisfies LiveDataNode
            if (type === "root") {
                this.liveDataNode.set('nodeId', null as any)
            } else {
                liveNodeMap.set(this.nodeId, this.liveDataNode)
            }
        } 
        this.parentNode = parentNode
        this.parentNode?.childNodes.add(this)
    }
}