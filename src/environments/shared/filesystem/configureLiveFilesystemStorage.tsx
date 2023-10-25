import { JsonObject, LiveMap, createClient } from "@liveblocks/client";
import { createRootNodeTemplate } from "./RootNode/createRootNodeTemplate.js";
import { createRoomContext } from "@liveblocks/react";
import { LiveIndexStorageModel } from "./LiveObjects/LiveIndexNode.js";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { RootNode } from "./RootNode/RootNode.js";
import { LiveIndexRootNode } from "./LiveObjects/LiveIndexRootNode.js";

export const configureLiveFilesystemStorage = <
    LiveblocksPresence extends JsonObject,
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
>(
    liveblocksPresence: LiveblocksPresence,
    createClientProps: Parameters<typeof createClient>[0],
    rootNodeTemplate: RootNodeTemplate
) => {
    const liveblocksClient = createClient(createClientProps)
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveIndexStorageModel
    >(liveblocksClient)
    const FilesystemRootNodeContext = createContext<
        RootNode<RootNodeTemplate['childTemplates']>
    >(null as any)
    const useLiveFilesystemRootNode = () => useContext(FilesystemRootNodeContext)
    const LiveFilesystemRootNodeProvider: FC<{
        roomId: string,
        children: ReactNode
    }> = ({
        roomId,
        children
    }) => {
        const [filesystemRootNode, setFilesystemRootNode] = useState<RootNode|null>(null)
        useEffect(() => {
            (async () => {
                const room = liveblocksClient.enter<
                    LiveblocksPresence,
                    LiveIndexStorageModel
                >(roomId, {
                    initialPresence: liveblocksPresence,
                    initialStorage: {
                        liveNodeMap: new LiveMap([[
                            "root", new LiveIndexRootNode()
                        ]])
                    }
                })
                const nodeMap = (await room.getStorage()).root.get("liveNodeMap")
                setFilesystemRootNode(new RootNode(
                    room,
                    nodeMap,
                    rootNodeTemplate
                ))
            })()
        }, [])
        return (
            <liveblocks.RoomProvider
                id={roomId}
                initialPresence={liveblocksPresence}
                initialStorage={{liveNodeMap: new LiveMap([[
                    "root", new LiveIndexRootNode()
                ]])}}
            >
                {filesystemRootNode
                    && <FilesystemRootNodeContext.Provider value={filesystemRootNode}>
                        {children}
                    </FilesystemRootNodeContext.Provider>
                }
            </liveblocks.RoomProvider>
        )
    }
    return {
        LiveFilesystemRootNodeProvider,
        useLiveFilesystemRootNode,
    }
}
