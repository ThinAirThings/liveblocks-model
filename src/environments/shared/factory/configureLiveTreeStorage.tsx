import { JsonObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { createRootNodeTemplate } from "./NodeTemplate/createRootNodeTemplate.js";
import { RootRuntimeNode, createRootRuntimeNode } from "./RuntimeNode/createRootRuntimeNode.js";
import { initializeLiveTreeRoom } from "./initializeLiveTreeRoom.js";
import { LiveTreeRootNode } from "./LiveObjects/LiveTreeRootNode.js";

export const configureLiveTreeStorage = <
    LiveblocksPresence extends JsonObject,
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
>(
    rootNodeTemplate: RootNodeTemplate,
    liveblocksPresence: LiveblocksPresence,
    createClientProps: Parameters<typeof createClient>[0],
) => {
    const liveblocksClient = createClient(createClientProps)
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveTreeStorageModel
    >(liveblocksClient)
    const LiveTreeRootNodeContext = createContext<
        RootRuntimeNode<RootNodeTemplate>
    >(null as any)
    const useLiveTreeRootNode = () => useContext(LiveTreeRootNodeContext)
    const LiveTreeRootNodeProvider: FC<{
        roomId: string
        children: ReactNode
    }> = ({
        roomId,
        children
    }) => {
        const [liveTreeRootNode, setLiveTreeRootNode] = useState<RootRuntimeNode<RootNodeTemplate>|null>(null)

        useEffect(() => {
            (async () => {
                const liveTreeRoom = initializeLiveTreeRoom(
                    liveblocksClient,
                    roomId,
                    liveblocksPresence
                )
                const liveTreeRootNode = await createRootRuntimeNode(
                    liveTreeRoom,
                    rootNodeTemplate,
                    liveblocks.useStorage
                )
                setLiveTreeRootNode(liveTreeRootNode)
            })()
        }, [])
        return (
            <liveblocks.RoomProvider
                id={roomId}
                initialPresence={liveblocksPresence}
                initialStorage={{liveTreeRootNode: new LiveTreeRootNode()}}
            >
                {liveTreeRootNode 
                    && <LiveTreeRootNodeContext.Provider value={liveTreeRootNode}>
                        {children}
                    </LiveTreeRootNodeContext.Provider>
                }
            </liveblocks.RoomProvider>
        )
    }
    return {
        LiveTreeRootNodeProvider,
        useLiveTreeRootNode,
    }
}