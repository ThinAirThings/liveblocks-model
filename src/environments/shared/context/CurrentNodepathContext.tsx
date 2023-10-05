import { Context, ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import { ImmerHook, useImmer } from "use-immer"
import { AirNodeIndex, AirNodeShape, AirNodeState, AirNodeType, LiveAirNode } from "../../../index.node.js"
import { Lson } from "@liveblocks/client"
import { useNodeStateFactory } from "../combined/useNodeStateFactory.js"
import { StorageHook } from "../hook-types.js"


export const CurrentNodepathContextFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    NodeIndex: AirNodeIndex<LiveAirNodeUnion>,
    useStorage: StorageHook<LiveAirNodeUnion, Meta>,
    useNodeState: ReturnType<typeof useNodeStateFactory<
        LiveAirNodeUnion,
        Meta
    >>
) => {
    const CurrentNodepathContext = createContext<{
        baseId: string,
        dirId: string | null,
        nodePath: Array<string>,
        updateBaseId: (nodeId: string) => void,
    }>({
        baseId: "/",
        dirId: "/",
        nodePath: [],
        updateBaseId: () => console.log("No CurrentNodepathContextProvider"),
    })

    const useCurrentNodepath = () => useContext(CurrentNodepathContext)
    return {
        CurrentNodepathContext,
        useCurrentNodepath,
        // RelativeNodepathProvider: ({
        //     children
        // }: {
        //     children: ReactNode
        // }) => {
        //     let [currentNodepath, _, nodeDepth] = useCurrentNodepath()
        //     nodeDepth++
        //     const [nodepath, updateNodepath] = useImmer<Array<string>>(currentNodepath);
        //     const updateBaseId = (nodeId: string) => {
        //         updateNodepath(draft => {
        //             draft[nodeDepth] = nodeId
        //         })
        //     }
        //     useEffect(() => {
        //         updateNodepath(draft => {
        //             currentNodepath.forEach((nodeId, index) => {
        //                 draft[index] = nodeId
        //             })
        //         })
        //     }, [currentNodepath])

        //     return (
        //         <CurrentNodepathContext.Provider value={[nodepath, updateBaseId, nodeDepth]}>
        //             {children}
        //         </CurrentNodepathContext.Provider>
        //     )
        // },
        AbsoluteNodepathProvider: ({
            absoluteNodePath,
            children
        }:{
            absoluteNodePath: Array<string>,
            children: ReactNode
        }) => {
            // If the absoluteNodePath is empty, we're at the root
            absoluteNodePath = absoluteNodePath.length === 0 
                ? ["/"] 
                : absoluteNodePath
            const [nodepath, updateNodePath] = useImmer<Array<string>>(absoluteNodePath)
            useEffect(() => {
                updateNodePath(draft => {
                    absoluteNodePath.forEach((nodeId, index) => {
                        draft[index] = nodeId
                    })
                })
            }, [absoluteNodePath])
            const updateBaseId = (nodeId: string) => {
                updateNodePath(draft => {
                    // Not [-1] here because were trying to add a new node to the end of the path
                    draft[absoluteNodePath.length] = nodeId
                })
            }
            return (
                <CurrentNodepathContext.Provider value={{
                    baseId: nodepath[nodepath.length-1]??"/",
                    dirId: nodepath[nodepath.length-2]??"/",
                    nodePath: nodepath,
                    updateBaseId
                }}>
                    {children}
                </CurrentNodepathContext.Provider>
            )
        },
        useNodeStateContext: <
            T extends AirNodeType<LiveAirNodeUnion>,
            S extends ((AirNodeShape<LiveAirNodeUnion> & {type: T})['state']),
            K extends keyof S
        >(
            nodeType: T,
            stateKey: K
        ) => {
            const {nodePath} = useCurrentNodepath()
            // Walk up the nodepath until we find a node that has the type we're looking for
            const targetNodeId = useStorage((root) => {
                return nodePath.find(nodeId => {
                    root.nodeMap.get(nodeId)?.type === nodeType
                })
            })
            if (!targetNodeId) throw new Error(`No node of type ${nodeType} found in nodepath`)
            return useNodeState<any, any>(targetNodeId!, stateKey) as unknown as [
                S[K],
                (value: S[K]) => void
            ]
        },
        useNodeDisplayName: <
            T extends AirNodeType<LiveAirNodeUnion>,
        >(
            nodeType: T
        ) => {
            const {nodePath} = useCurrentNodepath()
            // Walk up the nodepath until we find a node that has the type we're looking for
            const targetNodeId = useStorage((root) => {
                return nodePath.find(nodeId => {
                    return root.nodeMap.get(nodeId)?.type === nodeType
                })
            })
            if (!targetNodeId) throw new Error(`No node of type ${nodeType} found in nodepath`)
            return useNodeState<any, any>(targetNodeId!, NodeIndex[nodeType].stateDisplayKey) as unknown as [
                string,
                (value: string) => void
            ]
        }
    }
}

