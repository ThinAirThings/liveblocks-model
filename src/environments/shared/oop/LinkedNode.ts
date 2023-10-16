import { LiveObject } from "@liveblocks/client"
import {v4 as uuidv4} from 'uuid'


type DataNode = {
    parentNodeId: string
    nodeId: string
    type: string
    data: {[key: string]: any}
}

type NodeIndex = {[type: string]: DataNode}

export const linkedNodeFactory = <
    Index extends NodeIndex,
    NodeType extends keyof Index&string
>(
    NodeIndex: Index
) => class LinkedNode<T extends NodeType=NodeType> implements DataNode {
    // Static
    static nodeMap: Map<string, DataNode>
    static linkedMap: Map<string, LinkedNode> = new Map();
    // Instance 
    public nodeId: string
    public parentNode: LinkedNode<any> | null
    public childNodes: LinkedNode[] = []
    public state: LiveObject<typeof NodeIndex[T]['data']>
    public get data() { return this.state.toImmutable()}

    constructor(nodeMap: Map<string, DataNode>, parentNode: LinkedNode, nodeOrType: DataNode | T) {
        this.parentNode = parentNode;
        if (nodeOrType instanceof Object && 'nodeId' in nodeOrType) {
            this.nodeId = nodeOrType.nodeId
            this.state = new LiveObject(nodeOrType.data)
        } else {
            this.nodeId = uuidv4()
            this.state = new LiveObject(NodeIndex[nodeOrType].data)
        }
    }
}