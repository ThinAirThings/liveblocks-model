import { ContainerState } from "@thinairthings/zoom-utils"
import _isEqual from "lodash.isequal"
import { StorageHook } from "../index.js"

export const useStorageContainerStateMap = (useStorage: StorageHook, nodeIds?: string[]): Map<string, ContainerState> => {
    return useStorage(root => {
        return new Map([...root.nodeMap].filter(([nodeId]) => nodeIds ? nodeIds.includes(nodeId) : true)
            .map(([nodeId, node]) => {
                return [nodeId, node.state.containerState]
            })
        )
    }
    , (a,b)=>_isEqual(a,b)
    )
}