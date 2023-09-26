import { createLiveAirNodeFactory } from "../createLiveAirNodeFactory.js"
import { MutationHook } from "../hook-types.js"
import { LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory<LiveAirNodeUnion>>
) => () => useMutation((
    {storage}, 
    type: Parameters<typeof createLiveAirNode>[0],
    {meta, state}: Parameters<typeof createLiveAirNode>[1]
) => {
    const node = createLiveAirNode(type, {meta, state})
    const nodeId = node.get('nodeId')
    storage.get('nodeMap').set(nodeId, node as any)
    return nodeId
}, [])