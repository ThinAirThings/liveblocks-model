import { AirNodeIndex, AirNodeUnion} from "../../model/data-model.js"
import { MutationHook, StorageHook } from "./hook-types.js"
import { useCreateNodeFactory } from "./hooks/useCreateNodeFactory.js"
import { useNodeStateFactory } from "./hooks/useNodeStateFactory.js"
import { useDeleteNodeFactory } from "./hooks/useDeleteNodeFactory.js"
import { useNodeMapFactory } from "./hooks/useNodeMapFactory.js"
import { useNodeNameStateFactory } from "./hooks/useNodeNameStateFactory.js"
import { useNodeIdFromTreeClimbFactory } from "./hooks/useNodeIdFromTreeClimbFactory.js"


export const customLiveHooksFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    NodeIndex: Index,
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => {
    const useNodeIdFromTreeClimb = useNodeIdFromTreeClimbFactory(useStorage)
    return {
        // Meta
        // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
        // Nodes -- Mutation
        useNodeMap: useNodeMapFactory(
            useStorage
        ),
        useNodeIdFromTreeClimb,
        useCreateNode: useCreateNodeFactory(
            NodeIndex,
            useMutation,
        ),
        useNodeState: useNodeStateFactory(
            useStorage,
            useMutation,
            useNodeIdFromTreeClimb,
        ),
        useNodeNameState: useNodeNameStateFactory(
            useStorage,
            useMutation
        ),
        useDeleteNode: useDeleteNodeFactory(
            useMutation
        )
    }
}