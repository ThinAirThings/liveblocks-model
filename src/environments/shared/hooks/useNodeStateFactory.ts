import { AirNodeIndex, AirNodeUnion,  StatelessAirNodeUnion } from '../../../model/data-model.js'
import { MutationHook, StorageHook } from '../hook-types.js'

export const useNodeStateFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => <
    T extends StatelessAirNodeUnion<Index>,
    S extends (U&{type: T['type']})['state'],
    SK extends keyof S & string,
>(
    node: T,
    stateKey: SK, 
) => {
    // Find node from treeclimb
    const nodeState = useStorage((storage) => {
        return (storage.nodeMap.get(node.nodeId)?.state?.[stateKey])
    }) as S[SK]
    const mutation = useMutation(({storage}, 
        value: S[SK],
    ) => {
        storage.get('nodeMap').get(node.nodeId)?.get('state').set(stateKey, value)
    }, [node, stateKey])
    return [nodeState, mutation] as const
}