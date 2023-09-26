import { StorageHook } from "../hook-types.js";
import { AirNodeState, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <
    S extends AirNodeState<any>,
    R
>(
    nodeId: string,
    selector: (nodeState: S extends AirNodeState<infer N> ? AirNodeState<N> : never) => R
) => {
    return useStorage<ReturnType<typeof selector>>(
        root => {
            return selector(root.nodeMap.get(nodeId)!.state!)
        },
        (a,b)=>isEqual(a,b)
    )!
}