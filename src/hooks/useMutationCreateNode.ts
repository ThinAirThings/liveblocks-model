import { MutationHook, createAirNode } from ".."

export const useMutationCreateNode = (useMutation: MutationHook) => {
    return useMutation(({storage}, {type, key, state}: Parameters<typeof createAirNode>[0]) => {
        const node = createAirNode({type, key, state})
        const nodeId = node.get("nodeId")
        storage.get("nodeMap").set(nodeId, node)
        return nodeId
    }, [])
}