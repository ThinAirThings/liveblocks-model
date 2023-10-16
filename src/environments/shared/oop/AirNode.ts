import { LiveMap, LiveObject, Lson, LsonObject } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import {v4 as uuidv4} from 'uuid'


export type StringKey<Index extends Record<string, any>> = keyof Index & string

export type IndexNode = {
    parentType: string | null
    stateDisplayKey: string
    state: LsonObject
}

export type LiveDataNodeShape = IndexNode & {
    nodeId: string
    parentNodeId: string | null
    type: string
    state: LiveObject<IndexNode['state']>
}

export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, LiveDataNode>
}



type StorageHook = ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel
    >
>['suspense']['useStorage']

export const defineClassOfRuntimeNode = <
    Index extends Record<string, IndexNode>
>(
    NodeIndex: Index,
    useStorage: StorageHook,
    liveNodeMap: LiveblocksStorageModel['nodeMap']
) => class RuntimeNode<T extends StringKey<Index>> {
    // Static
    static nodeMap = liveNodeMap
    static root: RuntimeNode<'root'>
    static {
        RuntimeNode.nodeMap = liveNodeMap
        const staticNodeMap = new Map(liveNodeMap.toImmutable())
        const buildTree = (node: InstanceType<typeof RuntimeNode<StringKey<Index>>>) => { 
            staticNodeMap.forEach((nextDataNode) => nextDataNode.parentNodeId === node.nodeId 
                && staticNodeMap.delete(nextDataNode.nodeId)
                && node.childNodes.add(
                    buildTree(new RuntimeNode(
                        nextDataNode.type, 
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
    public nodeId: string
    public type: T
    public parentNode: RuntimeNode<StringKey<Index> & Index[T]['parentType']> | null
    public parentNodeId: string | null
    public state: LiveObject<Index[T]['state']>
    public childNodes: Set<RuntimeNode<StringKey<Index>>> = new Set()
    constructor(
        type: T, 
        parentNode: RuntimeNode<T>['parentNode'],
        liveDataNode?: LiveObject<LiveDataNodeShape>
    ){
        
        this.type = type
        this.parentNode = parentNode
        this.parentNodeId = parentNode?.nodeId ?? null
        if (liveDataNode) {
            this.nodeId = liveDataNode.get('nodeId')
            this.state = liveDataNode.get('state')
        } else {
            this.nodeId = uuidv4()
            this.state = new LiveObject(NodeIndex[type].state) as LiveObject<Index[T]['state']>
            RuntimeNode.nodeMap.set(this.nodeId, new LiveObject({
                nodeId: this.nodeId,
                parentNodeId: this.parentNodeId,
                type: this.type,
                state: this.state
            }) satisfies LiveDataNode)
        }
    }
    update = <K extends keyof Index[T]['data']&string>(key: K, value: Index[T]['data'][K]) => {
        this.state.set(key, value)
    }
    // useState = <K extends keyof Index[T]['data']&string>(key: K) =>
    //     useSyncExternalStore(() => this.state.get(key)) as Index[T]['data'][K]
    // useState = <K extends keyof Index[T]['data']&string>(key: K) => 
    //     useStorage(() => this.state.get(key))
    useValue = <K extends keyof Index[T]['data']&string>(key: K) => 
        useStorage(({nodeMap}) => nodeMap.get(this.nodeId)?.data[key]) as Index[T]['data'][K]
}

const AirIndex = {
    'A': {
        parentType: 'root',
        data: {
            a: 1,
            cucumber: "Pickled"
        }
    },
    'B': {
        parentType: 'A',
        data: {
            b: 2
        }
    },
    'C': {
        parentType: 'B',
        data: {
            c: 3
        }
    }
} as const

// const AirNode = defineClassOfRuntimeNode(AirIndex)

// const a = new AirNode('A', null as any)

// const b = new AirNode('B', a)

// const aRef = b.parentNode
// const bb = new AirNode('B', a)
// a.state.get('')
// const d = a.useState('a')