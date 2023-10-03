import { ReactNode, createContext, useContext } from "react"
import { useImmer } from "use-immer"
import { AirNodeShape, AirNodeState, AirNodeType, LiveAirNode } from "../../../index.node.js"
import { Lson } from "@liveblocks/client"
import { useNodeStateFactory } from "../combined/useNodeStateFactory.js"



export const NodeContextFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useNodeState: ReturnType<typeof useNodeStateFactory<
        LiveAirNodeUnion,
        Meta
    >>
) => {
    const NodeContext = createContext<ReturnType<typeof useImmer<{
        [K in AirNodeType<LiveAirNodeUnion>]: string | null
    }>>>([{}, () => {}] as any)
    return {
        NodeContext,
        NodeContextProvider: ({
            children
        }: {
            children: ReactNode
        }) => {
            const nodeContext = useImmer({...useContext(NodeContext)[0]})
            return (
                <NodeContext.Provider value={nodeContext}>
                    {children}
                </NodeContext.Provider>
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
            const nodeId = useContext(NodeContext)[0][nodeType]
            return useNodeState<any, any>(nodeId!, stateKey) as unknown as [
                AirNodeState<LiveAirNodeUnion>[K],
                (value: AirNodeState<LiveAirNodeUnion>[K]) => void
            ]
        }
    }
}

// export const NodeContext = createContext<ReturnType<typeof useImmer<{
//     [K in AirNodeType<BlueprintNodeUnion>]: string
// }>>>([{}, () => {}] as any)

// export const useNodeStateContext = <
//     T extends AirNodeType<BlueprintNodeUnion>,
//     S extends ((AirNodeShape<BlueprintNodeUnion> & {type: T})['state']),
//     K extends keyof S
// >(
//     nodeType: T,
//     stateKey: K
// ) => {
//     const nodeId = useContext(NodeContext)[0][nodeType]
//     return useNodeState<any, any>(nodeId, stateKey) as unknown as [
//         AirNodeState<LiveAirNode<T, S>>[K],
//         (value: AirNodeState<LiveAirNode<T, S>>[K]) => void
//     ]
// }

// export const NodeContextProvider: FC<{
//     children: ReactNode
// }> = ({
//     children
// }) => {
//     const nodeContext = useImmer({...useContext(NodeContext)[0]})
//     return (
//         <NodeContext.Provider value={nodeContext}>
//             {children}
//         </NodeContext.Provider>
//     )
// }