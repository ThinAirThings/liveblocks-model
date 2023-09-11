import { LiveAirNode } from "../../index.js";
import { createLiveAirNodeFactory } from "./createLiveAirNodeFactory.js";
import { MutationHook, StorageHook } from "./hook-types.js";
import { useMutationCreateNodeFactory } from "./mutations/useMutationCreateNodeFactory.js";
import { useMutationDeleteNodeFactory } from "./mutations/useMutationDeleteNodeFactory.js";
import { useMutationUpdateNodeFactory } from "./mutations/useMutationUpdateNodeFactory.js";
import { useStorageGetNodeFactory } from "./storage/useStorageGetNodeFactory.js";
import { useStorageGetNodeMapFactory } from "./storage/useStorageGetNodeMap.js";


export const customLiveHooksFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useStorage: StorageHook<LiveAirNodeUnion>,
    useMutation: MutationHook<LiveAirNodeUnion>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory>
) => {
    return {
        useStorageGetNodeMap: useStorageGetNodeMapFactory(useStorage),
        useStorageGetNode: useStorageGetNodeFactory(useStorage),
        useMutationCreateNode: useMutationCreateNodeFactory(
            useMutation,
            createLiveAirNode
        ),
        useMutationUpdateNode: useMutationUpdateNodeFactory(useMutation),
        useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation)
    }
}