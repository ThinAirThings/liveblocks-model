import { AirNodeIndex, AirNodeUnion } from "../../../index.browser.js"
import { StorageHook } from "../hook-types.js"

export const useNodeIdFromTreeClimbFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
) => <
    T extends U['type'],
>(
    nodeId: string,
    nodeType: T
) => {
    // Find node from treeclimb
    const targetNodeId = useStorage(({nodeMap}) => {
        const climbForTargetNode = (nodeId: string): string | null => {
            const node = nodeMap.get(nodeId)
            if (!node) return null
            if (node.type === nodeType) {
                return nodeId
            }
            if (node.parentNodeId === null) {
                return null
            }
            return climbForTargetNode(node.parentNodeId)
        }
        return climbForTargetNode(nodeId)
    })
    if (!targetNodeId) {
        throw new Error(`Node of type ${nodeType} not found in tree climb`)
    }
    return targetNodeId
}