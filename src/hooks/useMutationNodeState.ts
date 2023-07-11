import { MutationHook, NodeTypeIndex } from ".."

export const useMutationNodeState = <
    T extends keyof NodeTypeIndex,
    K extends keyof NodeTypeIndex[T]['defaultProps']
,>(
    useMutation: MutationHook,
    nodeId: string,
    key: K
) => {
    return useMutation(({storage}, value: NodeTypeIndex[T]['defaultProps'][K]) => {
        storage.get("nodeMap")!.get(nodeId)!.get("state")!.set(key as any, value)
    }, [])
}