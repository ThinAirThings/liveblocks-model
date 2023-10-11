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
    nodeId: string | null,
    _nodeType: T,
    stateKey: SK, 
) => {
    const nodeState = useStorage((storage) => {
        return nodeId 
            ? (storage.nodeMap.get(nodeId)?.state?.[stateKey] as S[SK]) ?? null
            : null
    }) 
    const mutation = useMutation(({storage}, 
        value: S[SK],
    ) => {
        nodeId 
            ? storage.get('nodeMap').get(nodeId)?.get('state').set(stateKey, value)
            : console.log("The useMutation inside of useNodeState was passed a null nodeId. Make sure to check for the existence of the nodeState before calling the mutation.")
    }, [nodeId, stateKey])
    return [nodeState, mutation] as const
}