import { JsonObject, createClient } from "@liveblocks/client";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { RootLiveTreeNode } from "./types/RootLiveTreeNode.js";
import { LiveTreeMap } from "./LiveObjects/LiveTreeMap.js";

export const initializeLiveTreeStorageObjects = async<
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
        initialStorage: (() => {
            const liveTreeMap = new LiveTreeMap([])
            const rootLiveTreeNode = new RootLiveTreeNode(liveTreeMap)
            return {
                liveTreeRoot: rootLiveTreeNode,
                liveTreeMap: new LiveTreeMap([
                    [rootLiveTreeNode.get('nodeId'), rootLiveTreeNode]
                ])
            }
        })()
    })
    const {root} = await room.getStorage()
    const liveTreeRoot = root.get('liveTreeRoot')
    const liveTreeMap = root.get('liveTreeMap')
    return {liveTreeRoot, liveTreeMap}
}