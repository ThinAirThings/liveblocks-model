import { MutationHook } from "../hook-types.js"
import { LiveAirNode } from "../../../model/data-model.js";

export const useMutationDeleteNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useMutation: MutationHook<LiveAirNodeUnion>
) => () => useMutation((
    {storage}, 
    nodeId: string
) => {
    storage.get('nodeMap').delete(nodeId)
}, [])