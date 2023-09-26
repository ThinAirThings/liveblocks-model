
import { StorageHook } from "../hook-types.js";
import { LiveAirNode, AirNodeType, AirNodeShape} from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => (
    nodeFilter?: Parameters<Array<[string, AirNodeShape<LiveAirNodeUnion>]>['filter']>[0]
) => useStorage(root => {
    return nodeFilter
        ? new Map([...root.nodeMap].filter(nodeFilter as any))
        : root.nodeMap
})!