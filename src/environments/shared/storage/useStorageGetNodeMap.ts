
import { LiveAirNode } from "../../../index.node.js";
import { StorageHook } from "../hook-types.js";

export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useStorage: StorageHook<LiveAirNodeUnion>
) => ()  => useStorage(root => {
    return root.nodeMap
})