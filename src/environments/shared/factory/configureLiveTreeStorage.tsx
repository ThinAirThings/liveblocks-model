import { JsonObject, createClient } from "@liveblocks/client";
import { NodeTemplate } from "./types/NodeTemplate.js";
import { createRoomContext } from "@liveblocks/react";
import { LiveTreeStorageModel } from "./types/StorageModel.js";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createRootNodeFactory } from "./createRootNodeFactory.js";
import { RuntimeNodeTree } from "./types/RuntimeNodeTree.js";
import { getLiveTreeStorageObjects } from "./initializeStorageObjects.js";

export const configureLiveTreeStorage = <
    TemplateTree extends NodeTemplate<any>,
    RuntimeTree extends RuntimeNodeTree<TemplateTree>,
    LiveblocksPresence extends JsonObject
>(
    NodeTemplateTree: TemplateTree,
    liveblocksPresence: LiveblocksPresence,
    createClientProps: Parameters<typeof createClient>[0],
) => {
    const liveblocksClient = createClient(createClientProps)
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveTreeStorageModel
    >(liveblocksClient)
    type RuntimeTreeRootNode = ReturnType<typeof createRootNodeFactory<TemplateTree, RuntimeTree>>
    const LiveTreeRootNodeContext = createContext<
        RuntimeTreeRootNode
    >(null as any)
    const useLiveTreeRootNode = () => useContext(LiveTreeRootNodeContext)
    const LiveTreeRootNodeProvider: FC<{
        roomId: string
        children: ReactNode
    }> = ({
        roomId,
        children
    }) => {
        const [liveTreeRootNode, setLiveTreeRootNode] = useState<RuntimeTreeRootNode|null>(null)
        useEffect(() => {
            (async () => {
                const {liveTreeRoot, liveTreeMap} = await getLiveTreeStorageObjects(
                    liveblocksClient,
                    roomId,
                    liveblocksPresence
                )
                setLiveTreeRootNode(createRootNodeFactory(
                    NodeTemplateTree,
                    liveTreeRoot,
                    liveTreeMap,
                    liveblocks.useStorage
                ))
            })()
        }, [])
        return (
            <liveblocks.RoomProvider
                id={roomId}
                initialPresence={liveblocksPresence}
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

export { NodeTemplate } from "./types/NodeTemplate.js";

export type ChildlessNodeTemplate<T extends string> = Omit<NodeTemplate<T>, "childNodes">