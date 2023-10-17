import { JsonObject, createClient } from "@liveblocks/client";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { RootLiveTreeNode } from "./types/RootLiveTreeNode.js";
import { LiveTreeMap } from "./types/LiveTreeMap.js";

export const getLiveTreeStorageObjects = async<
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
            const rootLiveTreeNode = new RootLiveTreeNode()
            return {
                liveTreeRoot: rootLiveTreeNode,
                liveTreeMap: new LiveTreeMap([
                    [rootLiveTreeNode.get('nodeId'), rootLiveTreeNode as any]
                ])
            }
        })()
    })
    const {root} = await room.getStorage()
    const liveTreeRoot = root.get('liveTreeRoot')
    const liveTreeMap = root.get('liveTreeMap')
    return {liveTreeRoot, liveTreeMap}
}