import { Lson } from "@liveblocks/client"
import { AirNodeShape, AirNodeType, LiveAirNode } from "../../../index.node.js"
import { StorageHook } from "../hook-types.js"
import { useNodeStateFactory } from "./useNodeStateFactory.js"


export const useNodePathStateFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    useStorage: StorageHook<LiveAirNodeUnion, Meta>,
    useNodeState: ReturnType<typeof useNodeStateFactory<
        LiveAirNodeUnion,
        Meta
    >>
) => <
    T extends AirNodeType<LiveAirNodeUnion>,
    S extends ((AirNodeShape<LiveAirNodeUnion> & {type: T})['state']),
    K extends keyof S
>(
    nodePath: Array<string>,
    nodeType: T,
    stateKey: K
) => {
    // Walk up the nodepath until we find a node that has the type we're looking for
    const targetNodeId = useStorage((root) => {
        return nodePath.find(nodeId => {
            return root.nodeMap.get(nodeId)?.type === nodeType
        })
    })
    if (!targetNodeId) return
    return useNodeState<any, any>(targetNodeId!, stateKey) as unknown as [
        S[K],
        (value: S[K]) => void
    ]
}