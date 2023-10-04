import { JsonObject, Lson, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { customLiveHooksFactory } from "../shared/customLiveHooksFactory.js";
import { AirNodeIndex, LiveAirNode, LiveblocksStorageModel } from "../../model/data-model.js";
export const liveblocksBrowserConfig = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson,
    LiveblocksPresence extends JsonObject={}
>(
    NodeIndex: AirNodeIndex<LiveAirNodeUnion>,
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
        ...customLiveHooksFactory(
            NodeIndex,
            useStorage,
            useMutation,
        )
    }
}