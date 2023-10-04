import { MutationHook } from "../hook-types.js"
import { LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useMutationDeleteNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => () => useMutation((
    {storage}, 
    nodeId: string
) => {
    storage.get('nodeMap').delete(nodeId)
}, [])