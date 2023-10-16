import { JsonObject, createClient } from "@liveblocks/client";
import { GenericLiveTreeNode, IndexNode } from "./ClassOfLiveTreeNodeFactory.js";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { initializeLiveTree } from "./initializeLiveTree.js";


export const LiveTreeBrowserConfig = <
    Index extends Record<string, IndexNode>,
    LiveblocksPresence extends JsonObject={},
>(
    NodeIndex: Index,
    liveblocksPresence: LiveblocksPresence,
) => {
    const LiveTreeNodeContext = createContext<
        GenericLiveTreeNode<Index>
    >(null as any)
    const useLiveTreeNode = () => useContext(LiveTreeNodeContext)
    const LiveTreeNodeProvider: FC<{
        roomId: string
        createClientProps: Parameters<typeof createClient>[0]
        children: ReactNode
    }> = ({
        roomId,
        createClientProps,
        children
    }) => {
        const [LiveTreeNode, setLiveTreeNode] = useState<GenericLiveTreeNode<Index>|null>(null)
        useEffect(() => {
            (async () => {
                const LiveTreeNode = await initializeLiveTree(
                    roomId,
                    NodeIndex,
                    createClientProps,
                    liveblocksPresence
                )
                console.log(LiveTreeNode.root)
                // setLiveTreeNode(LiveTreeNode)
            })()
        }, [])
        return (
            <>{LiveTreeNode 
                && <LiveTreeNodeContext.Provider value={LiveTreeNode}>
                    {children}
                </LiveTreeNodeContext.Provider>
            }</>
        )
    }
    return {
        LiveTreeNodeProvider,
        useLiveTreeNode,
    }
}