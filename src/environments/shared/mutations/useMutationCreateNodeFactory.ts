import { MutationHook } from "../hook-types.js"
import { AirNodeIndex, AirNodeShape, AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { LiveList, LiveObject, Lson } from "@liveblocks/client";
import {v4 as uuidv4} from 'uuid'

export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    NodeIndex: AirNodeIndex<LiveAirNodeUnion>,
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
) => <
    T extends AirNodeType<LiveAirNodeUnion>,
    S extends Partial<(AirNodeShape<LiveAirNodeUnion>&{type: T})['state']>,
    SK extends keyof S
>(): (
    parentNodeId: string | null,
    type: T,
    stateDisplayKey: SK,
    state?: S
)=>string => {
    return useMutation((
        {storage},
        parentNodeId: string | null,
        type: T,
        stateDisplayKey: SK,
        state?: S
    ) => {
        const node = new LiveObject({
            nodeId: uuidv4(),
            parentNodeId,
            type,
            meta: {
                ...NodeIndex[type].meta,
                createdAt: new Date().toISOString()
            },
            children: new LiveList([]),
            stateDisplayKey: stateDisplayKey as string,
            state: new LiveObject({
                ...NodeIndex[type].state,
                ...state,
            }),
        }) satisfies LiveAirNode<any, any>

        const nodeId = node.get('nodeId')
        storage.get('nodeMap').set(nodeId, node as any)
        // Return is parent is null
        if (!!parentNodeId) return nodeId  
        // Set Parent Links for new node
        const parentNode = storage.get('nodeMap').get(node.get('parentNodeId')!)!
        parentNode.get('children').push(nodeId)
        return nodeId
    }, [])
}