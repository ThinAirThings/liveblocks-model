import { LiveAirNode } from "../../../index.js"
import { MutationHook } from "../hook-types.js"


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