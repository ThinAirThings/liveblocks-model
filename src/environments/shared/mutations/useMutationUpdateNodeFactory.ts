import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeState } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => (): (<N extends LiveAirNode<any, any, any>>(
    nodeId: string, 
    updater: (liveNodeState: N extends LiveAirNode<infer T, infer S, any> 
        ? LiveAirNodeState<LiveAirNode<T, S, any>>
        :never)=>void
)=> void) => useMutation((
    {storage}, 
    nodeId: string,
    updater: (liveNodeState: any) => void
) => {
    const nodeState = storage.get('nodeMap').get(nodeId)!.get('state') as any
    updater(nodeState)
}, [])