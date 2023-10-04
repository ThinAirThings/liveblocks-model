import { MutationHook } from "../hook-types.js"
import { AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useMutationDeleteNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => () => {
    return useMutation((
        {storage}, 
        nodeId: string
    ) => {
        const liveNodeMap = storage.get('nodeMap')
        const nodeToDelete = liveNodeMap.get(nodeId)!
        const deletionVisitor = (node: LiveAirNode<any, any, any>) => {
            const children = node.get('children').toImmutable();
            children.forEach((childId: string) => {
                const child = liveNodeMap.get(childId)!
                deletionVisitor(child)
                liveNodeMap.delete(childId)
            })
        }
        deletionVisitor(nodeToDelete)
    }, [])
}