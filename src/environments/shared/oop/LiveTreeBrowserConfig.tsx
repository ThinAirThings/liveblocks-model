import { JsonObject, createClient } from "@liveblocks/client";
import {  IndexNode, RootTreeNode } from "./ClassOfLiveTreeNodeFactory.js";
import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { LiveblocksStorageModel2, initializeLiveTree } from "./initializeLiveTree.js";
import { createRoomContext } from "@liveblocks/react";


export const LiveTreeBrowserConfig = <
    Index extends Record<string, IndexNode>,
    LiveblocksPresence extends JsonObject={},
>(
    NodeIndex: Index,
    liveblocksPresence: LiveblocksPresence,
    createClientProps: Parameters<typeof createClient>[0],
) => {
    const liveblocksClient = createClient(createClientProps)
    const {suspense: liveblocks} = createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel2
    >(liveblocksClient)
    const LiveTreeNodeRootContext = createContext<
        RootTreeNode<Index>
    >(null as any)
    const useLiveTreeNodeRoot = () => useContext(LiveTreeNodeRootContext)
    const LiveTreeNodeRootProvider: FC<{
        roomId: string
        createClientProps: Parameters<typeof createClient>[0]
        children: ReactNode
    }> = ({
        roomId,
        createClientProps,
        children
    }) => {
        // const LiveTreeNodeRef = useRef<GenericLiveTreeNode<Index>|null>(null)
        const [LiveTreeNodeRoot, setLiveTreeNodeRoot] = useState<RootTreeNode<Index>|null>(null)
        useEffect(() => {
            (async () => {
                const LiveTreeNode = await initializeLiveTree(
                    liveblocksClient,
                    roomId,
                    NodeIndex,
                    liveblocksPresence,
                    liveblocks.useStorage
                )
                LiveTreeNode.root.childNodes.forEach(ChildNode => {ChildNode.type})
                setLiveTreeNodeRoot(LiveTreeNode.root)
            })()
        }, [])
        return (
            <>{LiveTreeNodeRoot
                && <liveblocks.RoomProvider 
                    id={roomId} 
                    initialPresence={liveblocksPresence}
                >
                    <LiveTreeNodeRootContext.Provider value={LiveTreeNodeRoot}>
                        {children}
                    </LiveTreeNodeRootContext.Provider>
                </liveblocks.RoomProvider>

            }</>
        )
    }
    return {
        LiveTreeNodeRootProvider,
        useLiveTreeNodeRoot,
    }
}