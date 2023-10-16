import { JsonObject, LiveObject, LsonObject } from "@liveblocks/client"
import {v4 as uuidv4} from 'uuid'
import { LiveblocksStorageModel2 } from "./initializeLiveTree.js"
import { createRoomContext } from "@liveblocks/react"


//   _____                  
//  |_   _|  _ _ __  ___ ___
//    | || || | '_ \/ -_|_-<
//    |_| \_, | .__/\___/__/
//        |__/|_|           
export type IndexKey<Index extends Record<string, IndexNode>> = keyof Index
export type IndexNode = {
    parentType: string | null
    metadata: JsonObject
    stateDisplayKey: string
    state: Record<string, any>
}

export type LiveDataNode = LiveObject<Omit<IndexNode, 'state'> & {
    type: string
    nodeId: string | null
    parentNodeId: string | null
    state: LiveObject<LsonObject>
}>

export type RootTreeNode<Index extends Record<string, IndexNode>> = {
    parentNode: null
    parentType: null
    parentNodeId: null
    metadata: JsonObject
    type: 'root'
    nodeId: null
    childNodes: Set<
        ILiveTreeNode<Index> & {parentType: null}
    >
}
type StorageHook = ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel2
    >
>['suspense']['useStorage']

export type ILiveTreeNode<
    Index extends Record<string, IndexNode>
> = {
    [Type in keyof Index]:{
        parentNode: ILiveTreeNode<Index> | null
        parentType: Index[Type]['parentType']
        childNodes: Set<ILiveTreeNode<Index>>
        liveDataNode: LiveDataNode
        nodeId: string | null
        type: Type
        state: LiveObject<Index[Type]['state']>
        stateDisplayKey: Index[Type]['stateDisplayKey']
        metadata: Index[Type]['metadata']
        
        update: <
            K extends keyof Index[Type]['state'],
            V extends Index[Type]['state'][K]
        >(key: K, value: V) => void
        useState: <
            K extends keyof Index[Type]['state'],
            V extends Index[Type]['state'][K]
        >(key: K) => V
    }
}[keyof Index]
//   ___        _                
//  | __|_ _ __| |_ ___ _ _ _  _ 
//  | _/ _` / _|  _/ _ \ '_| || |
//  |_|\__,_\__|\__\___/_|  \_, |
//                          |__/ 
export const ClassOfLiveTreeNodeFactory = <
    Index extends {[key: string]: IndexNode}
>(
    NodeIndex: Index,
    useStorage: StorageHook,
    liveNodeMap: LiveblocksStorageModel2['nodeMap']
//    ___ _              ___       __ _      _ _   _          
//   / __| |__ _ ______ |   \ ___ / _(_)_ _ (_) |_(_)___ _ _  
//  | (__| / _` (_-<_-< | |) / -_)  _| | ' \| |  _| / _ \ ' \ 
//   \___|_\__,_/__/__/ |___/\___|_| |_|_||_|_|\__|_\___/_||_|
) => class LiveTreeNode<T extends IndexKey<Index>> {
    //   ___ _        _   _    
    //  / __| |_ __ _| |_(_)__ 
    //  \__ \  _/ _` |  _| / _|
    //  |___/\__\__,_|\__|_\__|
    public static liveNodeMap = liveNodeMap
    public static root: RootTreeNode<Index>
    static {
        const buildTree = (node: InstanceType<typeof LiveTreeNode<IndexKey<Index>>>) => { 
            liveNodeMap.forEach((nextDataNode) => nextDataNode.get('parentNodeId') === node.nodeId 
                && node.childNodes.add(
                    buildTree(new LiveTreeNode(
                        nextDataNode.get('type') as IndexKey<Index>, 
                        node as InstanceType<typeof LiveTreeNode<IndexKey<Index>>>['parentNode'], 
                        nextDataNode
                    ))
                )
            )
            return node
        }
        LiveTreeNode.root = buildTree(new LiveTreeNode('root' as IndexKey<Index>, null)) as unknown as RootTreeNode<Index>
    }

    //   ___         _                    
    //  |_ _|_ _  __| |_ __ _ _ _  __ ___ 
    //   | || ' \(_-<  _/ _` | ' \/ _/ -_)
    //  |___|_||_/__/\__\__,_|_||_\__\___|
    public parentNode: LiveTreeNode<IndexKey<Index>> | null
    public childNodes: Set<LiveTreeNode<IndexKey<Index>>> = new Set()

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
    get parentType() { return this.liveDataNode.get('parentType')}
    //    ___             _               _           
    //   / __|___ _ _  __| |_ _ _ _  _ __| |_ ___ _ _ 
    //  | (__/ _ \ ' \(_-<  _| '_| || / _|  _/ _ \ '_|
    //   \___\___/_||_/__/\__|_|  \_,_\__|\__\___/_|  
    constructor(
        type: T,
        parentNode: LiveTreeNode<IndexKey<Index>> | null,
        liveDataNode?: LiveDataNode
    ){
        if (liveDataNode) {
            this.liveDataNode = liveDataNode
        } else {
            this.liveDataNode = new LiveObject({
                nodeId: type === "root" ? null : uuidv4(),
                parentNodeId: parentNode?.nodeId ?? null,
                type: type as string,
                ...type !== "root" ? {
                    metadata: {...NodeIndex[type].metadata, createdAt: new Date().toISOString()},
                    state: new LiveObject({...NodeIndex[type].state}),
                    parentType: NodeIndex[type].parentType,
                    stateDisplayKey: NodeIndex[type].stateDisplayKey
                }: {}
            }) as any
            type !== "root" && liveNodeMap.set(this.nodeId!, this.liveDataNode)
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
    useState = <
        K extends keyof Index[T]['state'],
        V extends Index[T]['state'][K]
    >(key: K) =>
        useStorage(({nodeMap}) => nodeMap.get(this.nodeId!)?.state[key as string]) as V
}
