
import { StorageHook } from "../hook-types.js";
import { LiveAirNode, AirNodeType} from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => (nodeType?: AirNodeType<LiveAirNodeUnion>)  => useStorage(root => {
    return nodeType 
        ? new Map([...root.nodeMap].filter(([,node]) => node.type === nodeType))
        : root.nodeMap
})!