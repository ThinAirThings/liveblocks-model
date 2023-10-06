import { MutationHook } from "../hook-types.js"
import { AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import { Children } from "react";

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
        // Remove from parent
        const parentNodeId = nodeToDelete.get('parentNodeId')
        if (parentNodeId) {
            const parentNodeChildren = liveNodeMap.get(parentNodeId)!.get('children')
            parentNodeChildren.delete(parentNodeChildren.indexOf(nodeId))
        }
        liveNodeMap.delete(nodeId)
    }, [])
}