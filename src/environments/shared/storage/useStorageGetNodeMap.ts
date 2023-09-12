
import { StorageHook } from "../hook-types.js";
import { LiveAirNode} from "../../../model/data-model.js";
export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useStorage: StorageHook<LiveAirNodeUnion>
) => ()  => useStorage(root => {
    return root.nodeMap
})