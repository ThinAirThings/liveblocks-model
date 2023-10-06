
import { AirNodeIndex, AirNodeUnion } from '../../../model/data-model.js'
import { MutationHook } from '../hook-types.js'

export const useDeleteNodeFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useMutation: MutationHook<Index, U>,
) => {
    return useMutation(({storage}, nodeId: string) => {
        storage.get('nodeMap').delete(nodeId)
    }, [])
}