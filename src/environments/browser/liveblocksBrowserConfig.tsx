import { JsonObject, Lson, createClient } from "@liveblocks/client"
import {AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel} from "../../model/data-model.js"
import { createRoomContext } from "@liveblocks/react"
import { LiveblocksBrowserProviderFactory } from "./LiveblocksBrowserProviderFactory.js"
import { customLiveHooksFactory } from "../shared/customLiveHooksFactory.js"


export const liveblocksBrowserConfig = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
    LiveblocksStorage extends LiveblocksStorageModel<LiveAirNode<U>>,
    LiveblocksPresence extends JsonObject={},
>(
    NodeIndex: Index,
    createClientProps: Parameters<typeof createClient>[0],
    initialLiveblocksPresence: LiveblocksPresence,
    initialLiveblocksStorage: LiveblocksStorage,
) => {
    const {
        suspense: liveblocks
    } = createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorage
    >(createClient(createClientProps))

    return {
        ...customLiveHooksFactory(
            NodeIndex,
            liveblocks.useStorage,
            liveblocks.useMutation,
        ),
        LiveblocksProvider: LiveblocksBrowserProviderFactory(
            liveblocks.RoomProvider,
            initialLiveblocksPresence,
            initialLiveblocksStorage
        ),
        ...liveblocks
    }
}