import { ContainerState } from "@thinairthings/zoom-utils";
import { StorageHook } from "../index.js";

export const useStorageContainerState = (useStorage: StorageHook, nodeId: string) => 
    useStorage(root => root.nodeMap.get(nodeId)?.state.containerState) as ContainerState