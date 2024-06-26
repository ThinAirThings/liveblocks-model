import { Lson } from "@liveblocks/client";
import { AirNodeState, LiveAirNode, LiveAirNodeState } from "../../../index.node.js";
import { useStorageGetNodeFactory } from "../storage/useStorageGetNodeFactory.js";
import { useMutationUpdateNodeFactory } from "../mutations/useMutationUpdateNodeFactory.js";


// NOTE!!! This is seemingly as good as the typescript inference is going to get right now. You've tried
// To make this better a million different ways and I can't get it to work without 2 explcit type parameters
export const useNodeStateFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any, any>,
    Meta extends Lson
>(
    useStorageGetNode: ReturnType<typeof useStorageGetNodeFactory<
        LiveAirNodeUnion,
        Meta
    >>,
    useMutationUpdateNode: ReturnType<typeof useMutationUpdateNodeFactory<
        LiveAirNodeUnion,
        Meta
    >>
) => <T extends LiveAirNodeUnion, K extends keyof AirNodeState<T>>(
    nodeId: string,
    key: K,
) => {
    const nodeValue = useStorageGetNode(nodeId, (nodeState: AirNodeState<T>) => nodeState[key]) as AirNodeState<T>[K]
    const updateNode = useMutationUpdateNode()
    return [
        nodeValue,
        (newValue: AirNodeState<T>[K]) => updateNode(nodeId, (liveNodeState) => {
            liveNodeState.set(key, newValue)
        })
    ] as [
        AirNodeState<T>[K],
        (newValue: AirNodeState<T>[K]) => void
    ]
}