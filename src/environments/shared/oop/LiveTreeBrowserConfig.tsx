import { JsonObject, createClient } from "@liveblocks/client";
import { GenericLiveTreeNode, IndexNode } from "./ClassOfLiveTreeNodeFactory.js";
import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
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
        const LiveTreeNodeRef = useRef<GenericLiveTreeNode<Index>|null>(null)
        const [LiveTreeNodeReady, setLiveTreeNodeReady] = useState<boolean>(false)
        useEffect(() => {
            (async () => {
                const LiveTreeNode = await initializeLiveTree(
                    roomId,
                    NodeIndex,
                    createClientProps,
                    liveblocksPresence
                )
                console.log(LiveTreeNode.root)
                LiveTreeNodeRef.current = LiveTreeNode
                setLiveTreeNodeReady(true)
            })()
        }, [])
        return (
            <>{LiveTreeNodeReady 
                && <LiveTreeNodeContext.Provider value={LiveTreeNodeRef.current!}>
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