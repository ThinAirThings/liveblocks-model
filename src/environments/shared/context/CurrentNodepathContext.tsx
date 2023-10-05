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
    const CurrentNodepathContext = createContext<[
        Array<string>, 
        (nodeId: string, index?: number) => void,
        number
    ]>([
        [],
        () => console.log("No initial context set!. This is the default context function running"),
        -1
    ])
    const useCurrentNodepath = () => useContext(CurrentNodepathContext)
    return {
        CurrentNodepathContext,
        useCurrentNodepath,
        RelativeNodepathProvider: ({
            children
        }: {
            children: ReactNode
        }) => {
            let [currentNodepath, _, nodeDepth] = useCurrentNodepath()
            nodeDepth++
            const [nodepath, updateNodepath] = useImmer<Array<string>>(currentNodepath);
            const updateBaseId = (nodeId: string) => {
                updateNodepath(draft => {
                    draft[nodeDepth] = nodeId
                })
            }
            useEffect(() => {
                updateNodepath(draft => {
                    currentNodepath.forEach((nodeId, index) => {
                        draft[index] = nodeId
                    })
                })
            }, [currentNodepath])

            return (
                <CurrentNodepathContext.Provider value={[nodepath, updateBaseId, nodeDepth]}>
                    {children}
                </CurrentNodepathContext.Provider>
            )
        },
        AbsoluteNodepathProvider: ({
            absoluteNodePath,
            children
        }:{
            absoluteNodePath: Array<string>,
            children: ReactNode
        }) => {
            let [_, updateBaseId] = useCurrentNodepath()
            return (
                <CurrentNodepathContext.Provider value={[absoluteNodePath, updateBaseId, absoluteNodePath.length]}>
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
            const [nodepath] = useCurrentNodepath()
            // Walk up the nodepath until we find a node that has the type we're looking for
            const targetNodeId = useStorage((root) => {
                return nodepath.find(nodeId => {
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
            const [nodepath] = useCurrentNodepath()
            // Walk up the nodepath until we find a node that has the type we're looking for
            const targetNodeId = useStorage((root) => {
                return nodepath.find(nodeId => {
                    root.nodeMap.get(nodeId)?.type === nodeType
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

