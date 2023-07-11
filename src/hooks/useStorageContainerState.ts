import { ContainerState } from "@thinairthings/zoom-utils";
import { StorageHook } from "..";

export const useStorageContainerState = (useStorage: StorageHook, nodeId: string) => 
    useStorage(root => root.nodeMap.get(nodeId)?.state.containerState) as ContainerState