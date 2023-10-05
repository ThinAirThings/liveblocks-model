import { MutationHook } from "../hook-types.js"
import { AirNodeIndex, AirNodeShape, AirNodeType, LiveAirNode } from "../../../model/data-model.js";
import { LiveList, LiveObject, Lson } from "@liveblocks/client";
import {v4 as uuidv4} from 'uuid'
import { CurrentNodepathContextFactory } from "../context/CurrentNodepathContext.js";

export const useMutationCreateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    NodeIndex: AirNodeIndex<LiveAirNodeUnion>,
    useCurrentNodepath: ReturnType<typeof CurrentNodepathContextFactory>['useCurrentNodepath'],
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
) => <
    T extends AirNodeType<LiveAirNodeUnion>,
    S extends Partial<(AirNodeShape<LiveAirNodeUnion>&{type: T})['state']>,
>(): (
    type: T,
    state?: S
)=>string => {
    const [currentNodepath, _, depth] = useCurrentNodepath()
    const parentNodeId = currentNodepath[depth-1] ?? null
    return useMutation((
        {storage},
        type: T,
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
            stateDisplayKey: NodeIndex[type].stateDisplayKey as any,
            state: new LiveObject({
                ...NodeIndex[type].state,
                ...state,
            }),
        }) satisfies LiveAirNode<any, any>

        const nodeId = node.get('nodeId')
        storage.get('nodeMap').set(nodeId, node as any)
        // Return is parent is null
        if (!parentNodeId) return nodeId  
        // Set Children for parent node
        const parentNode = storage.get('nodeMap').get(parentNodeId)!
        parentNode.get('children').push(nodeId)
        return nodeId
    }, [parentNodeId])
}