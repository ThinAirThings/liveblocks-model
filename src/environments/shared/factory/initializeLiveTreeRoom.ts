import { JsonObject, createClient } from "@liveblocks/client";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { LiveTreeRootNode } from "./LiveObjects/LiveTreeRootNode.js";

export const initializeLiveTreeRoom = <
    LiveblocksPresence extends JsonObject
>(
    liveblocksClient: ReturnType<typeof createClient>,
    roomId: string,
    liveblocksPresence: LiveblocksPresence,
) => {
    const room = liveblocksClient.enter<
        LiveblocksPresence,
        LiveTreeStorageModel
    >(roomId, {
        initialPresence: liveblocksPresence,
        initialStorage: {
            liveTreeRootNode: new LiveTreeRootNode()
        }
    })
    return room
}
    // const {root} = await room.getStorage()
    // return root.get('liveTreeRootNode')