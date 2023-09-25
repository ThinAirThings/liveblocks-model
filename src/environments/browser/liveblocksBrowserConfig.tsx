import { Lson, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { createLiveAirNodeFactory } from "../shared/createLiveAirNodeFactory.js";
import { customLiveHooksFactory } from "../shared/customLiveHooksFactory.js";
import { LiveAirNode, LiveblocksPresence, LiveblocksStorageModel } from "../../model/data-model.js";
export const liveblocksBrowserConfig = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    createClientProps: Parameters<typeof createClient>[0],
) => {
    const {
        suspense: {
            useRoom,
            useMyPresence,
            useUpdateMyPresence,
            useOthersMapped,
            useStorage,
            RoomProvider,
            useMutation,
            useSelf,
            RoomContext,
            useHistory,
            useCanUndo,
            useUndo,
            useCanRedo,
            useRedo,
        }
    } = createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorageModel<LiveAirNodeUnion, Meta>
    >(createClient(createClientProps))
    const createLiveAirNode = createLiveAirNodeFactory<LiveAirNodeUnion>()
    const {
        // Meta
        useStorageGetMeta,
        useMutationUpdateMeta,
        // Nodes
        useStorageGetNodeMap,
        useStorageGetNode,
        useMutationCreateNode,
        useMutationUpdateNode,
        useMutationDeleteNode,
    } = customLiveHooksFactory(
        useStorage,
        useMutation,
        createLiveAirNode,
    )
    return {
        useRoom,
        useMyPresence,
        useUpdateMyPresence,
        useOthersMapped,
        useStorage,
        RoomProvider,
        useMutation,
        useSelf,
        RoomContext,
        useHistory,
        useCanUndo,
        useUndo,
        useCanRedo,
        useRedo,
        createLiveAirNode,
        // Meta
        useStorageGetMeta,
        useMutationUpdateMeta,
        // Nodes
        useStorageGetNodeMap,
        useStorageGetNode,
        useMutationCreateNode,
        useMutationUpdateNode,
        useMutationDeleteNode,
    }
}