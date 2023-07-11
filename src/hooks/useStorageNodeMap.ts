import { StorageHook } from ".."

export const useStorageNodeMap = (useStorage: StorageHook) => {
    return useStorage(root => root.nodeMap)
}