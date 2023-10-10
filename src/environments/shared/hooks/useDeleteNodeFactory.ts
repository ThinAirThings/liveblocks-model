
import { AirNodeIndex, AirNodeUnion } from '../../../model/data-model.js'
import { MutationHook } from '../hook-types.js'

export const useDeleteNodeFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useMutation: MutationHook<Index, U>,
) => () => {
    return useMutation(({storage}, nodeId: string) => {
        const liveNodeMap = storage.get('nodeMap')
        const nodeMap = liveNodeMap.toImmutable()
        const chainDelete = (targetNodeId: string) => {
            liveNodeMap.delete(targetNodeId)
            const next = [...nodeMap].filter(([_,node])=>node.parentNodeId === targetNodeId)
            next.forEach(([nodeId])=>chainDelete(nodeId))
        }
        chainDelete(nodeId)
    }, [])
}