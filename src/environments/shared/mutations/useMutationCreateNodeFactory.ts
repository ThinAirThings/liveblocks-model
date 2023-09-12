import { createLiveAirNodeFactory } from "../createLiveAirNodeFactory.js"
import { MutationHook } from "../hook-types.js"
import { LiveAirNode } from "../../../model/data-model.js";
export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useMutation: MutationHook<LiveAirNodeUnion>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory>
) => () => useMutation((
    {storage}, 
    {type, meta, state}: Parameters<typeof createLiveAirNode>[0]
) => {
    const node = createLiveAirNode({type, meta, state})
    const nodeId = node.get('nodeId')
    storage.get('nodeMap').set(nodeId, node as any)
}, [])