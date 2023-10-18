import { JsonObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createRootNodeTemplate } from "./NodeTemplate/createRootNodeTemplate.js";
import { RootRuntimeNode, createRootRuntimeNode } from "./RuntimeNode/createRootRuntimeNode.js";
import { initializeLiveTreeStorageObjects } from "./initializeLiveTreeStorageObjects.js";
import { LiveTreeMap } from "./LiveObjects/LiveTreeMap.js";
import { RootLiveTreeNode } from "./types/RootLiveTreeNode.js";

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
                const {liveTreeRoot, liveTreeMap} = await initializeLiveTreeStorageObjects(
                    liveblocksClient,
                    roomId,
                    liveblocksPresence
                )
                setLiveTreeRootNode(createRootRuntimeNode(
                    rootNodeTemplate,
                    liveTreeRoot,
                    liveblocks.useStorage
                ))
            })()
        }, [])
        return (
            <liveblocks.RoomProvider
                id={roomId}
                initialPresence={liveblocksPresence}
                initialStorage={(() => {
                    const liveTreeMap = new LiveTreeMap([])
                    const rootLiveTreeNode = new RootLiveTreeNode(null as any)
                    liveTreeMap.set(rootLiveTreeNode.get('nodeId'), rootLiveTreeNode)
                    console.log("Root live tree node", rootLiveTreeNode)
                    return {
                        liveTreeRoot: rootLiveTreeNode,
                        liveTreeMap: liveTreeMap,
                    }
                })()}
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