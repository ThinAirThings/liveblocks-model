import { MutationHook, createAirNode } from "../index.js"

export const useMutationCreateNode = (useMutation: MutationHook) => {
    return useMutation(({storage}, {key, state}: Parameters<typeof createAirNode>[0]) => {
        const node = createAirNode({key, state})
        const nodeId = node.get("nodeId")
        storage.get("nodeMap").set(nodeId, node)
        return nodeId
    }, [])
}