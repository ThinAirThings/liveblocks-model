import { LiveAirNode } from "../../../index.js"
import { createLiveAirNodeFactory } from "../createLiveAirNodeFactory.js"
import { MutationHook } from "../hook-types.js"

export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useMutation: MutationHook<LiveAirNodeUnion>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory>
) => () => useMutation((
    {storage}, 
    {type, state}: Parameters<typeof createLiveAirNode>[0]
) => {
    const node = createLiveAirNode({type, state})
    const nodeId = node.get('nodeId')
    storage.get('nodeMap').set(nodeId, node as any)
}, [])