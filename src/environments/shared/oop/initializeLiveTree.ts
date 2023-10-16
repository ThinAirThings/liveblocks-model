import { JsonObject, LiveMap, createClient } from "@liveblocks/client"
import { ClassOfLiveTreeNodeFactory, IndexNode, LiveDataNode, StorageHook } from "./ClassOfLiveTreeNodeFactory.js"
import { createRoomContext } from "@liveblocks/react"


export type LiveblocksStorageModel2 = {
    nodeMap: LiveMap<string, LiveDataNode>
}

// You could possibly extend this.
export const initializeLiveTree = async <
    Index extends Record<string, IndexNode>,
    LiveblocksPresence extends JsonObject={},
>(
    liveblocksClient: ReturnType<typeof createClient>,
    roomId: string,
    NodeIndex: Index,
    liveblocksPresence: LiveblocksPresence,
    useStorage: StorageHook
) => {
    const room = liveblocksClient.enter<
        LiveblocksPresence,
        LiveblocksStorageModel2
    >(roomId, {
        initialPresence: liveblocksPresence, 
        initialStorage: {nodeMap: new LiveMap()}
    })

    const {root} = await room.getStorage()
    const liveNodeMap = root.get('nodeMap')
    const LiveTreeNode = ClassOfLiveTreeNodeFactory(
        NodeIndex, 
        useStorage,
        liveNodeMap
    )
    return LiveTreeNode
}