import { createRoomContext } from "@liveblocks/react";
import { ImmutableAirNode, LiveblocksPresence, LiveblocksStorageModel, NodeDataTypeIndex, StorageHook } from "..";

export const useStorageNodeState = <
    K extends keyof typeof NodeDataTypeIndex,
>(
    useStorage: StorageHook,
    nodeId: string,
    propKey: keyof typeof NodeDataTypeIndex[K]['defaultProps']
):  typeof NodeDataTypeIndex[K]['defaultProps'][typeof propKey]=> {
    return useStorage(root => {
        return (root.nodeMap.get(nodeId)! as unknown as ImmutableAirNode<K>)?.state[propKey]
    })
}
