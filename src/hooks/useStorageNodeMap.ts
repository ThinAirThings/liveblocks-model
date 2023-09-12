import { StorageHook } from "../index.node.js"

export const useStorageNodeMap = (useStorage: StorageHook) => {
    return useStorage(root => root.nodeMap)
}