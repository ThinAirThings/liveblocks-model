import { AirNodeIndex, AirNodeUnion} from "../../model/data-model.js"
import { MutationHook, StorageHook } from "./hook-types.js"
import { useCreateNodeFactory } from "./hooks/useCreateNodeFactory.js"
import { useNodeStateFactory } from "./hooks/useNodeStateFactory.js"
import { useDeleteNodeFactory } from "./hooks/useDeleteNodeFactory.js"


export const customLiveHooksFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    NodeIndex: Index,
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => {
    return {
        // Meta
        // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
        // Nodes -- Mutation
        useCreateNode: useCreateNodeFactory(
            NodeIndex,
            useMutation,
        ),
        useNodeState: useNodeStateFactory(
            useStorage,
            useMutation
        ),
        useDeleteNode: useDeleteNodeFactory(
            useMutation
        )
    }
}