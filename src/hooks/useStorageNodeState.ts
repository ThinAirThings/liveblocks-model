import { createRoomContext } from "@liveblocks/react";
import { ImmutableAirNode, LiveblocksPresence, LiveblocksStorageModel, NodeTypeIndex, StorageHook } from "..";

export const useStorageNodeState = <
    T extends keyof NodeTypeIndex,
    K extends keyof NodeTypeIndex[T]['defaultProps']
>(
    useStorage: StorageHook,
    nodeId: string,
    key: K
):  NodeTypeIndex[T]['defaultProps'][K]=> {
    return useStorage(root => {
        return (root.nodeMap.get(nodeId)! as unknown as ImmutableAirNode<NodeTypeIndex[T]['defaultProps']>)?.state[key]
    })
}