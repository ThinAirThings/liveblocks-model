
import { StorageHook } from "../hook-types.js";
import { LiveAirNode} from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => ()  => useStorage(root => {
    return root.nodeMap
})