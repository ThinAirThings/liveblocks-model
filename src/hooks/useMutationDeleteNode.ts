import { MutationHook } from "../index.js"

export const useMutationDeleteNode = (
    useMutation: MutationHook
) => {
    return useMutation(({storage}, nodeId: string) => {
        storage.get("nodeMap").delete(nodeId)
    }, [])
}