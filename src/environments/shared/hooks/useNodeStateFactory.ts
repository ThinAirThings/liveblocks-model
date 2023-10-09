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
    SK extends (keyof S)&string,
>(
    nodeId: string,
    _nodeType: T,
    stateKey: SK, 
) => {
    const nodeState = useStorage((storage) => {
        return ((storage.nodeMap.get(nodeId)!).state)[stateKey]
    }) as S[SK]
    const mutation = useMutation(({storage}, 
        value: S[SK],
    ) => {
        (storage.get('nodeMap').get(nodeId)!).get('state').set(stateKey, value)
    }, [])
    return [nodeState, mutation] as const
}