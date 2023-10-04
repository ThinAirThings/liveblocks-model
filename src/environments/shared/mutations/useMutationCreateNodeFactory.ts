import { MutationHook } from "../hook-types.js"
import { AirNodeContext, AirNodeIndex, AirNodeShape, AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { LiveMap, LiveObject, Lson } from "@liveblocks/client";
import {v4 as uuidv4} from 'uuid'
import { useContext } from "react";

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
    console.log("Inside Creation", nodeCtx)
    return useMutation((
        {storage}, 
        type: T,
        state?: S
    ) => {
        console.log("Parent Node Id", nodeCtx[NodeIndex[type].parentType])
        const node = new LiveObject({
            nodeId: uuidv4(),
            type,
            parentNodeId: NodeIndex[type].parentType 
                ? nodeCtx[NodeIndex[type].parentType]!
                : null,
            parentType: NodeIndex[type].parentType,
            meta: {
                ...NodeIndex[type].meta,
                createdAt: new Date().toISOString()
            },
            links: new LiveMap([]),
            state: new LiveObject({
                ...NodeIndex[type].state,
                ...state,
            }),
        }) satisfies LiveAirNode<any, any, any>

        const nodeId = node.get('nodeId')
        storage.get('nodeMap').set(nodeId, node as any)
        // Return is parent is null
        if (!!NodeIndex[type].parentType) return nodeId  
        // Set Parent Links for new node
        const parentNode = storage.get('nodeMap').get(node.get('parentNodeId')!)!
        parentNode.get('links').set(type, [
            ...new Set([...parentNode.get('links').get(type)!, nodeId])
        ])
        // Update Node Context
        updateNodeCtx((nodeCtx) => {
            nodeCtx[type] = nodeId as any
        })
        return nodeId
    }, [nodeCtx])
}