import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeShape, LiveAirNodeState, UnionToIntersection } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => <T extends LiveAirNodeShape<LiveAirNodeUnion>['type']>() => useMutation((
    {storage}, {
        nodeId,
        updater
    }: {
        nodeId: string,
        updater: (nodeState: LiveAirNodeState<LiveAirNodeUnion&LiveAirNode<T, any>>) => void
    }
) => {
    const nodeState = storage.get('nodeMap').get(nodeId)!.get('state') as LiveAirNodeState<LiveAirNodeUnion&LiveAirNode<T, any>>
    updater(nodeState)
}, [])