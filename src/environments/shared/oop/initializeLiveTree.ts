import { JsonObject, LiveMap, createClient } from "@liveblocks/client"
import { ClassOfLiveTreeNodeFactory, IndexNode, LiveDataNode } from "./ClassOfLiveTreeNodeFactory.js"
import { createRoomContext } from "@liveblocks/react"


export type LiveblocksStorageModel2 = {
    nodeMap: LiveMap<string, LiveDataNode>
}

// You could possibly extend this.
export const initializeLiveTree = async <
    Index extends Record<string, IndexNode>,
    LiveblocksPresence extends JsonObject={},
>(
    roomId: string,
    NodeIndex: Index,
    createClientProps: Parameters<typeof createClient>[0],
    liveblocksPresence: LiveblocksPresence,
) => {
    const liveblocksClient = createClient(createClientProps)
    const room = liveblocksClient.enter<
        LiveblocksPresence,
        LiveblocksStorageModel2
    >(roomId, {
        initialPresence: liveblocksPresence, 
        initialStorage: {nodeMap: new LiveMap()}
    })
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel2
    >(liveblocksClient)
    const {root} = await room.getStorage()
    const liveNodeMap = root.get('nodeMap')
    const LiveTreeNode = ClassOfLiveTreeNodeFactory(
        NodeIndex, 
        liveblocks.useStorage,
        liveNodeMap
    )
    return LiveTreeNode
}