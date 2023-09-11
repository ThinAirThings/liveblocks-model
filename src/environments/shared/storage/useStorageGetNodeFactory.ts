import { LiveAirNode, LiveAirNodeShapeUnion } from "../../../index.js";
import { StorageHook } from "../hook-types.js";



export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useStorage: StorageHook<LiveAirNodeUnion>
) => <K extends keyof LiveAirNodeShapeUnion<LiveAirNodeUnion>['state']>(
    nodeId: string,
    key: K
): LiveAirNodeShapeUnion<LiveAirNodeUnion>['state'][K] => useStorage(root => {
    return root.nodeMap.get(nodeId)!.state[key]
})