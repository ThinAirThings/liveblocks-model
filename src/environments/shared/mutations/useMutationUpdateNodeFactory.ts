import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState, UnionToIntersection } from "../../../model/data-model.js";
import { LiveObject, Lson } from "@liveblocks/client";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => <T extends LiveAirNode<any, any>>() => useMutation((
    {storage}, 
    nodeId: string,
    updater: (nodeState: T extends LiveAirNode<any, infer S> ? LiveObject<S> : never) => void
) => {
    const nodeState = storage.get('nodeMap').get(nodeId)!.get('state') as T extends LiveAirNode<any, infer S> ? LiveObject<S> : never
    updater(nodeState)
}, [])