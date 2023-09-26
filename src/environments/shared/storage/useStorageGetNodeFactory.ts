import { StorageHook } from "../hook-types.js";
import { AirNodeState, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(useStorage: StorageHook<LiveAirNodeUnion, Meta>) => <
    N extends LiveAirNode<any, any>,
    R
>(
    nodeId: string,
    selector: (nodeState: N extends LiveAirNode<infer T, infer S> 
        ? AirNodeState<LiveAirNode<T, S>> 
        : never) => R
) => {
    return useStorage<ReturnType<typeof selector>>(
        root => {
            return selector(root.nodeMap.get(nodeId)!.state!)
        },
        (a,b)=>isEqual(a,b)
    )!
}