import { JsonObject, LiveObject, LsonObject } from "@liveblocks/client"
import {v4 as uuidv4} from 'uuid'
import { LiveblocksStorageModel2 } from "./initializeRuntimeGraph.js"
import { createRoomContext } from "@liveblocks/react"


//   _____                  
//  |_   _|  _ _ __  ___ ___
//    | || || | '_ \/ -_|_-<
//    |_| \_, | .__/\___/__/
//        |__/|_|           
export type IndexKey<Index extends Record<string, any>> = keyof Index
export type IndexNode = {
    parentType: string | null
    metadata: JsonObject&{createdAt: string}
    stateDisplayKey: string
    state: Record<string, any>
}

export type LiveDataNode = LiveObject<Omit<IndexNode, 'state'> & {
    type: string
    nodeId: string | null
    parentNodeId: string | null
    state: LiveObject<LsonObject>
}>
type StorageHook = ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel2
    >
>['suspense']['useStorage']

//   ___        _                
//  | __|_ _ __| |_ ___ _ _ _  _ 
//  | _/ _` / _|  _/ _ \ '_| || |
//  |_|\__,_\__|\__\___/_|  \_, |
//                          |__/ 
export const defineRuntimeNode = <
    Index extends {[key: string]: IndexNode}
>(
    NodeIndex: Index,
    useStorage: StorageHook,
    liveNodeMap: LiveblocksStorageModel2['nodeMap']
//    ___ _              ___       __ _      _ _   _          
//   / __| |__ _ ______ |   \ ___ / _(_)_ _ (_) |_(_)___ _ _  
//  | (__| / _` (_-<_-< | |) / -_)  _| | ' \| |  _| / _ \ ' \ 
//   \___|_\__,_/__/__/ |___/\___|_| |_|_||_|_|\__|_\___/_||_|
) => class RuntimeNode<T extends IndexKey<Index>> {
    //   ___ _        _   _    
    //  / __| |_ __ _| |_(_)__ 
    //  \__ \  _/ _` |  _| / _|
    //  |___/\__\__,_|\__|_\__|
    public static liveNodeMap = liveNodeMap
    public static root: RuntimeNode<'root'>
    static {
        const buildTree = (node: InstanceType<typeof RuntimeNode<IndexKey<Index>>>) => { 
            liveNodeMap.forEach((nextDataNode) => nextDataNode.get('parentNodeId') === node.nodeId 
                && node.childNodes.add(
                    buildTree(new RuntimeNode(
                        nextDataNode.get('type') as IndexKey<Index>, 
                        node as InstanceType<typeof RuntimeNode<IndexKey<Index>>>['parentNode'], 
                        nextDataNode
                    ))
                )
            )
            return node
        }
        RuntimeNode.root = buildTree(new RuntimeNode('root' as IndexKey<Index>, null)) as RuntimeNode<'root'>
    }

    //   ___         _                    
    //  |_ _|_ _  __| |_ __ _ _ _  __ ___ 
    //   | || ' \(_-<  _/ _` | ' \/ _/ -_)
    //  |___|_||_/__/\__\__,_|_||_\__\___|
    public parentNode: RuntimeNode<IndexKey<Index> & Index[T]['parentType']> | null
    public childNodes: Set<RuntimeNode<IndexKey<Index>>> = new Set()

    //   _    _            ___  _     _        _   
    //  | |  (_)_ _____   / _ \| |__ (_)___ __| |_ 
    //  | |__| \ V / -_) | (_) | '_ \| / -_) _|  _|
    //  |____|_|\_/\___|  \___/|_.__// \___\__|\__|
    //                             |__/            
    public liveDataNode: LiveDataNode
    get nodeId() { return this.liveDataNode.get('nodeId')}
    get type() { return this.liveDataNode.get('type')}
    get state() { return this.liveDataNode.get('state') }
    get stateDisplayKey() { return this.liveDataNode.get('stateDisplayKey')}
    get metadata() { return this.liveDataNode.get('metadata')}
    //    ___             _               _           
    //   / __|___ _ _  __| |_ _ _ _  _ __| |_ ___ _ _ 
    //  | (__/ _ \ ' \(_-<  _| '_| || / _|  _/ _ \ '_|
    //   \___\___/_||_/__/\__|_|  \_,_\__|\__\___/_|  
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
                type: type as string,
                metadata: {...NodeIndex[type].metadata, createdAt: new Date().toISOString()},
                state: new LiveObject({...NodeIndex[type].state}),
                parentType: NodeIndex[type].parentType,
                stateDisplayKey: NodeIndex[type].stateDisplayKey
            }) satisfies LiveDataNode
            if (type === "root") {
                this.liveDataNode.set('nodeId', null)
            } else {
                liveNodeMap.set(this.nodeId!, this.liveDataNode)
            }
        } 
        this.parentNode = parentNode
        this.parentNode?.childNodes.add(this as any)
    }

    //   __  __     _   _            _    
    //  |  \/  |___| |_| |_  ___  __| |___
    //  | |\/| / -_)  _| ' \/ _ \/ _` (_-<
    //  |_|  |_\___|\__|_||_\___/\__,_/__/
    update = <
        K extends keyof Index[T]['state'],
        V extends Index[T]['state'][K]
    >(key: K, value: V):void => {
        this.state.set(key as string, value)
    }                  
    useValue = <
        K extends keyof Index[T]['state'],
        V extends Index[T]['state'][K]
    >(key: K) =>
        useStorage(({nodeMap}) => nodeMap.get(this.nodeId!)?.state[key as string]) as V
}
