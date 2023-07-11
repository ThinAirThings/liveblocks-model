import { createRoomContext } from "@liveblocks/react"
import { LiveblocksPresence, LiveblocksStorageModel, createAirNode } from ".."

export const useMutationCreateNode = (useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']) => {
    return useMutation(({storage}, {type, state}: Parameters<typeof createAirNode>[0]) => {
        const node = createAirNode({type, state})
        const nodeId = node.get("nodeId")
        storage.get("nodeMap").set(nodeId, node)
        return nodeId
    }, [])
}