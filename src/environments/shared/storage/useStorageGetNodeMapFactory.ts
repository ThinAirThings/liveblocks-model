
import { StorageHook } from "../hook-types.js";
import { LiveAirNode, AirNodeShape, AirNodeType} from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => (
    nodeFilter?: (params: [
        nodeCtx: {[K in AirNodeType<LiveAirNodeUnion>]: string}, 
        ...Parameters<Parameters<Array<[string, AirNodeShape<LiveAirNodeUnion>]>['filter']>[0]>]
    ) => boolean
) => useStorage(root => {
    return nodeFilter
        ? new Map([...root.nodeMap].filter(nodeFilter as any))
        : root.nodeMap
})!