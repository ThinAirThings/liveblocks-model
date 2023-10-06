import { JsonObject } from "@liveblocks/client";
import { LiveblocksStorageModel } from "../../index.browser.js";
import { FC, ReactNode, Suspense } from "react";
import { createRoomContext } from "@liveblocks/react";



export const LiveblocksBrowserProviderFactory = <
    LiveblocksStorage extends LiveblocksStorageModel<any>,
    LiveblocksPresence extends JsonObject={},
>(
    RoomProvider: ReturnType<typeof createRoomContext<
        LiveblocksPresence,
        LiveblocksStorage
    >>["RoomProvider"],
    initialLiveblocksPresence: LiveblocksPresence,
    initialLiveblocksStorage: LiveblocksStorage,
): FC<{
    roomId: string
    Loading: () => JSX.Element
    children: ReactNode
}> => ({
    roomId,
    Loading,
    children
}) => {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={initialLiveblocksPresence}
            initialStorage={initialLiveblocksStorage}
        >
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </RoomProvider>
    )
}