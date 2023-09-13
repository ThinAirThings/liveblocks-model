import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";


export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <K extends LiveAirNodeShape<LiveAirNodeUnion>['state']>(
    nodeId: string,
    key: K
): LiveAirNodeShape<LiveAirNodeUnion>['state'][K] => useStorage(root => {
    return root.nodeMap.get(nodeId)!.state[key]
})