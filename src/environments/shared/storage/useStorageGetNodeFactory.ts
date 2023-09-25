import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState } from "../../../model/data-model.js";
import { LiveObject, Lson, LsonObject } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <
    T extends (nodeState: LiveAirNodeState<LiveAirNodeUnion>) => any
>(
    nodeId: string,
    selector: T extends (nodeState: infer S) => infer R ? (nodeState: S) => R : never
): ReturnType<typeof selector> => useStorage(
    root => {
        return selector(root.nodeMap.get(nodeId)!.state!)
    },
    (a,b)=>isEqual(a,b)
)