import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState } from "../../../model/data-model.js";
import { LiveObject, Lson, LsonObject } from "@liveblocks/client";
import isEqual from "lodash.isequal";

export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <T extends LiveAirNode<any, any>, R>(
    nodeId: string,
    selector: (nodeState: T extends LiveAirNode<any, infer S> ? ReturnType<LiveObject<S>['toImmutable']> : never) => R
): R => useStorage(
    root => {
        return selector(root.nodeMap.get(nodeId)!.state!) as any
    },
    (a,b)=>isEqual(a,b)
)