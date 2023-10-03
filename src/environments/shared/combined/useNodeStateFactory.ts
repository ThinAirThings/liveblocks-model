import { Lson } from "@liveblocks/client";
import { AirNodeState, LiveAirNode, LiveAirNodeState } from "../../../index.node.js";
import { useStorageGetNodeFactory } from "../storage/useStorageGetNodeFactory.js";
import { useMutationUpdateNodeFactory } from "../mutations/useMutationUpdateNodeFactory.js";



export const useNodeStateFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
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
) => <T extends AirNodeState<LiveAirNodeUnion>>(
    nodeId: string,
    key: keyof T,
) => {
    const nodeValue = useStorageGetNode(nodeId, (nodeState: T) => nodeState[key]) as T[typeof key]
    const updateNode = useMutationUpdateNode()
    return [
        nodeValue,
        (newValue: T[typeof key]) => updateNode(nodeId, (liveNodeState) => {
            liveNodeState.set(key, newValue)
        })
    ] as [
        T[typeof key],
        (newValue: T[typeof key]) => void
    ]
}