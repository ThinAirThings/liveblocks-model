import { ImmutableAirNode, NodeTypeIndex, StorageHook } from "..";

export const useStorageNodeState = <
    H extends StorageHook,
    T extends keyof NodeTypeIndex,
    K extends keyof NodeTypeIndex[T]['defaultProps']
>(
    useStorage: H,
    nodeId: string,
    key: K
) => {
    return useStorage(root => {
        return (root.nodeMap.get(nodeId)! as unknown as ImmutableAirNode<NodeTypeIndex[T]['defaultProps']>)?.state[key]
    })
}