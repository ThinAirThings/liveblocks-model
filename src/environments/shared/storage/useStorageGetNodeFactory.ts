import { StorageHook } from "../hook-types.js";
import { LiveAirNode, LiveAirNodeShape } from "../../../model/data-model.js";


export const useStorageGetNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useStorage: StorageHook<LiveAirNodeUnion>
) => <K extends keyof LiveAirNodeShape<LiveAirNodeUnion>['state']>(
    nodeId: string,
    key: K
): LiveAirNodeShape<LiveAirNodeUnion>['state'][K] => useStorage(root => {
    return root.nodeMap.get(nodeId)!.state[key]
})