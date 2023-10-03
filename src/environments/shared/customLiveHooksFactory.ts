import { Lson } from "@liveblocks/client";
import { LiveAirNode} from "../../model/data-model.js";
import { createLiveAirNodeFactory } from "./createLiveAirNodeFactory.js";
import { MutationHook, StorageHook } from "./hook-types.js";
import { useMutationCreateNodeFactory } from "./mutations/useMutationCreateNodeFactory.js";
import { useMutationDeleteNodeFactory } from "./mutations/useMutationDeleteNodeFactory.js";
import { useMutationUpdateNodeFactory } from "./mutations/useMutationUpdateNodeFactory.js";
import { useStorageGetNodeFactory } from "./storage/useStorageGetNodeFactory.js";
import { useStorageGetNodeMapFactory } from "./storage/useStorageGetNodeMapFactory.js";
import { useStorageGetMetaFactory } from "./storage/useStorageGetMetaFactory.js";
import { useMutationUpdateMetaFactory } from "./mutations/useMutationUpdateMetaFactory.js";
import { useNodeStateFactory } from "./combined/useNodeStateFactory.js";
import { NodeContextFactory } from "./context/NodeContextFactory.js";


export const customLiveHooksFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>,
    useMutation: MutationHook<LiveAirNodeUnion, Meta>,
    createLiveAirNode: ReturnType<typeof createLiveAirNodeFactory>
) => {
    const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation)
    const useStorageGetNode = useStorageGetNodeFactory(useStorage)
    const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode)
    const {
        NodeContext,
        NodeContextProvider,
        useNodeContext,
        useNodeStateContext,
    } = NodeContextFactory<LiveAirNodeUnion, Meta>(useNodeState)
    return {
        // Meta
        useStorageGetMeta: useStorageGetMetaFactory(useStorage),
        useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
        // Nodes -- Storage
        useStorageGetNodeMap: useStorageGetNodeMapFactory(
            NodeContext,
            useStorage
        ),
        useStorageGetNode,
        // Nodes -- Mutation
        useMutationCreateNode: useMutationCreateNodeFactory(
            useMutation,
            createLiveAirNode
        ),
        useMutationUpdateNode,
        useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation),
        // Nodes -- Combined
        useNodeState,
        // Context
        NodeContext,
        NodeContextProvider,
        useNodeContext,
        useNodeStateContext,
    }
}