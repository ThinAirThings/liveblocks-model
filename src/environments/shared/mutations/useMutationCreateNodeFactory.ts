import { MutationHook } from "../hook-types.js"
import { AirNodeIndex, AirNodeShape, AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { LiveObject, Lson } from "@liveblocks/client";
import {v4 as uuidv4} from 'uuid'
import { useContext } from "react";
import { AirNodeContext } from "../context/NodeContextFactory.js";

export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    NodeIndex: AirNodeIndex<LiveAirNodeUnion>,
    NodeContext: AirNodeContext<LiveAirNodeUnion>,
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
) => <
    T extends AirNodeType<LiveAirNodeUnion>,
    S extends Partial<(AirNodeShape<LiveAirNodeUnion>&{type: T})['state']>
>(): (
    type: T,
    state?: S
)=>string => {
    const [nodeCtx, updateNodeCtx] = useContext(NodeContext)
    return useMutation((
        {storage}, 
        type: T,
        state?: S
    ) => {
        const node = new LiveObject({
            nodeId: uuidv4(),
            type,
            parentType: NodeIndex[type].parentType,
            meta: {
                ...NodeIndex[type].meta,
                createdAt: new Date().toISOString()
            },
            links: new LiveObject({
                parent: [nodeCtx[NodeIndex[type].parentType]!]
            }),
            state: new LiveObject({
                ...NodeIndex[type].state,
                ...state,
            }),
        })
        const nodeId = node.get('nodeId')
        storage.get('nodeMap').set(nodeId, node as any)
        // Set Parent Links for new node
        storage.get('nodeMap')
            .get(node.get('links').get('parent')[0])!
            .get('links')
            .set(type, [
                ...new Set([...node.get('links').get('parent'), nodeId])
            ])
        // Update Node Context
        updateNodeCtx((nodeCtx) => {
            nodeCtx[type] = nodeId as any
        })
        return nodeId
    }, [])
}