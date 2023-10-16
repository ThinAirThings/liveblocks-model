import { JsonObject, LiveMap, createClient } from "@liveblocks/client";
import { LiveblocksStorageModel, defineClassOfRuntimeNode, iNode } from "./AirNode.js";
import { createRoomContext } from "@liveblocks/react";



// You could possibly extend this.
export const initializeRuntimeGraph = async <
    Index extends Record<string, iNode>,
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
        LiveblocksStorageModel
    >(roomId, {
        initialPresence: liveblocksPresence, 
        initialStorage: {nodeMap: new LiveMap()}
    })
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel
    >(liveblocksClient)
    const {root} = await room.getStorage()
    const liveNodeMap = root.get('nodeMap')
    const RuntimeNode = defineClassOfRuntimeNode(
        NodeIndex, 
        liveblocks.useStorage,
        liveNodeMap
    )
    
}