import { Lson } from "@liveblocks/client";
import { LiveAirNode} from "../../model/data-model.js";
import { createLiveAirNodeFactory } from "./createLiveAirNodeFactory.js";
import { MutationHook, StorageHook } from "./hook-types.js";
import { useMutationCreateNodeFactory } from "./mutations/useMutationCreateNodeFactory.js";
import { useMutationDeleteNodeFactory } from "./mutations/useMutationDeleteNodeFactory.js";
import { useMutationUpdateNodeFactory } from "./mutations/useMutationUpdateNodeFactory.js";
import { useStorageGetNodeFactory } from "./storage/useStorageGetNodeFactory.js";
import { useStorageGetNodeMapFactory } from "./storage/useStorageGetNodeMap.js";
import { useStorageGetMetaFactory } from "./storage/useStorageGetMetaFactory.js";
import { useMutationUpdateMetaFactory } from "./mutations/useMutationUpdateMetaFactory.js";


export const customLiveHooksFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>,
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory>
) => {
    return {
        // Meta
        useStorageGetMeta: useStorageGetMetaFactory(useStorage),
        useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
        // Nodes -- Storage
        useStorageGetNodeMap: useStorageGetNodeMapFactory(useStorage),
        useStorageGetNode: useStorageGetNodeFactory(useStorage),
        // Nodes -- Mutation
        useMutationCreateNode: useMutationCreateNodeFactory(
            useMutation,
            createLiveAirNode
        ),
        useMutationUpdateNode: useMutationUpdateNodeFactory(useMutation),
        useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation),
        
    }
}