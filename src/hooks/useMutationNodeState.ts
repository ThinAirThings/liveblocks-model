import {  LiveblocksPresence, LiveblocksStorageModel, NodeTypeIndex } from ".."
import {createRoomContext} from "@liveblocks/react"

export const useMutationNodeState = <
    T extends keyof NodeTypeIndex,
    K extends keyof NodeTypeIndex[T]['defaultProps']
,>(
    useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'],
    nodeId: string,
    key: K
) => {
    return useMutation(({storage}, value: NodeTypeIndex[T]['defaultProps'][K]) => {
        storage.get("nodeMap")!.get(nodeId)!.get("state")!.set(key as any, value)
    }, [])
}