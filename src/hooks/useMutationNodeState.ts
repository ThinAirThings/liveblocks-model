import { AirNode, MutationHook, NodeDataTypeIndex } from "../index.js"

export const useMutationNodeState = <
    K extends keyof typeof NodeDataTypeIndex
,>(
    useMutation: MutationHook,
    nodeId: string,
    propKey: keyof typeof NodeDataTypeIndex[K]['defaultProps']
) => {
    return useMutation(({storage}, value: typeof NodeDataTypeIndex[K]['defaultProps'][typeof propKey]) => {
        (storage.get("nodeMap")!.get(nodeId)! as AirNode<K>).get("state")!.set(propKey, value as any)
    }, [])
}
