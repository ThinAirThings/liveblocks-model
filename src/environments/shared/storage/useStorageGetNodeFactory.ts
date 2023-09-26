import { StorageHook } from "../hook-types.js";
import { AirNodeState, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(useStorage: StorageHook<LiveAirNodeUnion, Meta>) => <
    S extends AirNodeState<any>,
    R
>(
    nodeId: string,
    selector: (nodeState: S extends AirNodeState<infer N extends LiveAirNode<any, any>> 
        ? AirNodeState<N> 
        : never) => (R | null)
) => {
    return useStorage<ReturnType<typeof selector>>(
        root => {
            const nodeState = root.nodeMap.get(nodeId)?.state
            return nodeState ? selector(nodeState) : null
        },
        (a,b)=>isEqual(a,b)
    )
}