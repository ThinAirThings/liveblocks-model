import { createClient } from "@liveblocks/client";
import { LiveAirNode, LiveblocksPresence, LiveblocksStorageModel } from "../../index.node.js";
import { createRoomContext } from "@liveblocks/react";
import { createLiveAirNodeFactory } from "../shared/createLiveAirNodeFactory.js";
import { customLiveHooksFactory } from "../shared/customLiveHooksFactory.js";

export const liveblocksBrowserConfig = <LiveAirNodeUnion extends LiveAirNode<any, any>,>(
    authEndpoint: NonNullable<Parameters<typeof createClient>[0]['authEndpoint']>,
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
        LiveblocksStorageModel<LiveAirNodeUnion>
    >(createClient({
        authEndpoint,
    }))
    const createLiveAirNode = createLiveAirNodeFactory<LiveAirNodeUnion>()
    const {
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
        useStorageGetNodeMap,
        useStorageGetNode,
        useMutationCreateNode,
        useMutationUpdateNode,
        useMutationDeleteNode,
    }
}