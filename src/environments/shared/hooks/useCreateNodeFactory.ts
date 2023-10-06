import { LiveList, LiveObject, Lson } from '@liveblocks/client'
import { AirNodeIndex, AirNodeUnion } from '../../../model/data-model.js'
import { MutationHook } from '../hook-types.js'
import {v4 as uuidv4} from 'uuid'

export const useCreateNodeFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    NodeIndex: Index,
    useMutation: MutationHook<Index, U>,
) => <
    T extends U['type'],
    S extends Partial<(U & {type: T})['state']>,
>(): (
    parentNodeId: string | null,
    type: T,
    state?: S
)=>string => {
    return useMutation((
        {storage},
        parentNodeId: string | null,
        type: T,
        state?: S
    ) => {
        const nodeId = uuidv4()
        const node = new LiveObject({
            nodeId,
            parentNodeId,
            type,
            nodeMeta: {
                ...NodeIndex[type].nodeMeta,
                createdAt: new Date().toISOString()
            },
            children: new LiveList([]),
            stateDisplayKey: NodeIndex[type].stateDisplayKey,
            state: new LiveObject({
                ...NodeIndex[type].state,
                ...state,
            }),
        }) as any

        storage.get('nodeMap').set(nodeId, node as any)
        return nodeId
    }, [])
}