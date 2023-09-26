import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeState } from "../../../model/data-model.js";
import { LiveObject, Lson } from "@liveblocks/client";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => () => useMutation((
    {storage}, 
    nodeId: string,
    updater: <S extends LiveAirNodeState<any>>(liveNodeState: S extends LiveAirNodeState<infer N>? LiveAirNodeState<N>:never) => void
) => {
    const nodeState = storage.get('nodeMap').get(nodeId)!.get('state') as any
    updater(nodeState)
}, [])