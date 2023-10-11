import { LiveList, LiveObject, Lson } from '@liveblocks/client'
import { AirNode, AirNodeIndex, AirNodeUnion, LiveAirNode, StatelessAirNode, TypedNodeIndex } from '../../../model/data-model.js'
import { MutationHook } from '../hook-types.js'
import {v4 as uuidv4} from 'uuid'

export const useCreateNodeFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
    TypedIndex extends TypedNodeIndex<Index, U>,
>(
    NodeIndex: TypedIndex,
    useMutation: MutationHook<Index, U>,
) => <
    T extends U['type'],
    S extends (U & {type: T})['state']
>(): (
    parentNodeId: string | null,
    type: T,
    state?: Partial<S>
)=> StatelessAirNode<
    AirNode<T, S, any>
> => {
    return useMutation((
        {storage},
        parentNodeId: string | null,
        type: T,
        state?: Partial<S>
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
            }as S) ,
        }) satisfies LiveAirNode<AirNode<T, S, any>>
        storage.get('nodeMap').set(nodeId, node as any)
        return {
            ...node.toImmutable(),
            state: undefined
        }
    }, [])
}