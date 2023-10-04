import { MutationHook } from "../hook-types.js"
import { AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import { useContext } from "react";
import { AirNodeContext } from "../context/NodeContextFactory.js";

export const useMutationDeleteNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    NodeContext: AirNodeContext<LiveAirNodeUnion>,
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => <
    T extends AirNodeType<LiveAirNodeUnion>,
>() => {
    const [nodeCtx, updateNodeCtx] = useContext(NodeContext)
    return useMutation((
        {storage}, 
        nodeType: T
    ) => {
        const nodeToDelete = storage.get('nodeMap').get(nodeCtx[nodeType]!)!
        const typesToClear = [...nodeToDelete.get('links').entries()]
            .filter(([_, nodeIds]) => nodeIds.length > 0)
            .map(([type, _]) => type)
        const deletionVisitor = (node: LiveAirNode<any, any, any>) => {
            const links = node.get('links').toImmutable();
            [...links].forEach(([_, nodeIds]) => {
                // Check each nodeId to see if it has any links
                nodeIds.forEach((nodeId: string) => {
                    const linkNode = storage.get('nodeMap').get(nodeId)
                    if (!linkNode) return
                    if (linkNode.get('links').toImmutable().size === 0){
                        // If it has no links, delete it. This is a leaf.
                        storage.get('nodeMap').delete(nodeId)
                        return
                    }
                    deletionVisitor(linkNode)
                    storage.get('nodeMap').delete(nodeId)
                })
            })
        }
        deletionVisitor(nodeToDelete)
        updateNodeCtx((nodeCtx: any) => {
            nodeCtx[nodeType] = null as any
            typesToClear.forEach(type => {
                nodeCtx[type] = null as any
            })
        })
    }, [])
}