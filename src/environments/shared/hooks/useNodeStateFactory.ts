import { AirNodeIndex, AirNodeUnion, LiveAirNode } from '../../../model/data-model.js'
import { MutationHook, StorageHook } from '../hook-types.js'

export const useNodeStateFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => <
    T extends U['type'],
    S extends (U & {type: T})['state'],
    K extends keyof S,
>(
    nodeId: string,
    _nodeType: T,
    stateKey: K, 
) => {
    const nodeState = useStorage((storage) => {
        return ((storage.nodeMap.get(nodeId)!).state as any)[stateKey as any] as any
    }) as S[K]
    const mutation = useMutation(({storage}, 
        value: S[K],
    ) => {
        (storage.get('nodeMap').get(nodeId)!).get('state').set(stateKey as any, value)
    }, [])
    return [nodeState, mutation] as const
}