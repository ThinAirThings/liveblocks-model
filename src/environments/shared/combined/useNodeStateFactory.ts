import { Lson } from "@liveblocks/client";
import { AirNodeState, LiveAirNode } from "../../../index.node.js";
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
) => <T extends LiveAirNodeUnion>(
    nodeId: string,
    key: keyof AirNodeState<T>,
) => {
    const nodeValue = useStorageGetNode(nodeId, (nodeState: AirNodeState<T>) => nodeState[key])
    const updateNode = useMutationUpdateNode()
    return [
        nodeValue,
        (newValue: AirNodeState<T>[typeof key]) => updateNode(nodeId, (liveNodeState) => {
            liveNodeState.set(key, newValue)
        })
    ]
}