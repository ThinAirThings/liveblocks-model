import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState } from "../../../model/data-model.js";
import { LiveObject, Lson, LsonObject } from "@liveblocks/client";
import isEqual from "lodash.isequal";



export type Selector<T, out R>= (
    nodeState: T extends LiveAirNode<any, infer S> ? ReturnType<LiveObject<S>['toImmutable']> : never
) => R
export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => <
    T extends LiveAirNode<any, any>
>(
    nodeId: string,
    selector: Selector<T, ReturnType<Selector<T, any>>>
): ReturnType<typeof selector> => useStorage<ReturnType<typeof selector>>(
    root => {
        return selector(root.nodeMap.get(nodeId)!.state!)
    },
    (a,b)=>isEqual(a,b)
)