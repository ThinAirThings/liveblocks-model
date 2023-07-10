import { createRoomContext } from "@liveblocks/react";
import { ImmutableAirNode, LiveblocksPresence, LiveblocksStorageModel, NodeTypeIndex } from "..";


export const useStorageNodeState = <
    T extends keyof NodeTypeIndex,
    K extends keyof NodeTypeIndex[T]['defaultProps']
>(
    useStorage: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage'],
    nodeId: string,
    key: K
) => {
    return useStorage(root => {
        return (root.nodeMap.get(nodeId)! as unknown as ImmutableAirNode<NodeTypeIndex[T]['defaultProps']>)?.state[key]
    })
}