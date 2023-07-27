import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: any;
    readonly key: any;
    readonly state: any;
}>;
