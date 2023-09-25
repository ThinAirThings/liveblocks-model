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
        updater: (node: LiveAirNodeUnion&LiveAirNode<T, any>) => void
    }
) => {
    const node = storage.get('nodeMap').get(nodeId)! 
    updater(node)
}, [])