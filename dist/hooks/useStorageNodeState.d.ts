import { NodeTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <T extends keyof NodeTypeIndex, K extends keyof NodeTypeIndex[T]["defaultProps"]>(useStorage: StorageHook, nodeId: string, key: K) => NodeTypeIndex[T]["defaultProps"][K];
