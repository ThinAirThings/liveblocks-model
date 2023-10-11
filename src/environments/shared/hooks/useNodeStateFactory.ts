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
    nodeType: T,
    stateKey: SK, 
) => {
    // Find node from treeclimb
    const targetNodeId = useStorage(({nodeMap}) => {
        const climbForTargetNode = (nodeId: string): string | null => {
            const node = nodeMap.get(nodeId)
            if (!node) return null
            if (node.type === nodeType) {
                return nodeId
            }
            if (node.parentNodeId === null) {
                return null
            }
            return climbForTargetNode(node.parentNodeId)
        }
        return climbForTargetNode(nodeId)
    })
    if (!targetNodeId) {
        throw new Error(`Node of type ${nodeType} not found in tree climb`)
    }
    const nodeState = useStorage((storage) => {
        return (storage.nodeMap.get(targetNodeId)?.state?.[stateKey])
    }) as S[SK]
    const mutation = useMutation(({storage}, 
        value: S[SK],
    ) => {
        storage.get('nodeMap').get(nodeId)?.get('state').set(stateKey, value)
    }, [nodeId, stateKey])
    return [nodeState, mutation] as const
}