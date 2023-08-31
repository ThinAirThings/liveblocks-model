import { StorageHook } from "../index.js"

export const useStorageNodeMap = (useStorage: StorageHook) => {
    return useStorage(root => root.nodeMap)
}