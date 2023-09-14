import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <K extends keyof LiveAirNodeState<LiveAirNodeUnion>>(
    nodeId: string,
    key: K
): LiveAirNodeState<LiveAirNodeUnion>[K] => useStorage(root => {
    return root.nodeMap.get(nodeId)!.state[key]
}, (a,b)=>isEqual(a,b))