import { createRoomContext } from "@liveblocks/react"
import { LiveblocksPresence, LiveblocksStorageModel } from ".."

export const useMutationDeleteNode = (
    useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']
) => {
    return useMutation(({storage}, nodeId: string) => {
        storage.get("nodeMap").delete(nodeId)
    }, [])
}