import { JsonObject, createClient } from "@liveblocks/client";
import { GenericLiveTreeNode, IndexNode, RootTreeNode } from "./ClassOfLiveTreeNodeFactory.js";
import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { initializeLiveTree } from "./initializeLiveTree.js";


export const LiveTreeBrowserConfig = <
    Index extends Record<string, IndexNode>,
    LiveblocksPresence extends JsonObject={},
>(
    NodeIndex: Index,
    liveblocksPresence: LiveblocksPresence,
) => {
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
                    roomId,
                    NodeIndex,
                    createClientProps,
                    liveblocksPresence
                )
                setLiveTreeNodeRoot(LiveTreeNode.root)
            })()
        }, [])
        return (
            <>{LiveTreeNodeRoot
                && <LiveTreeNodeRootContext.Provider value={LiveTreeNodeRoot}>
                    {children}
                </LiveTreeNodeRootContext.Provider>
            }</>
        )
    }
    return {
        LiveTreeNodeRootProvider,
        useLiveTreeNodeRoot,
    }
}