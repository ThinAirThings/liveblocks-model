import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: keyof import("..").NodeTypeIndex;
    readonly state: {
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    };
    readonly children: ReadonlyMap<string, {
        readonly nodeId: string;
        readonly type: keyof import("..").NodeTypeIndex;
        readonly state: any;
        readonly children: ReadonlyMap<string, any>;
    }>;
}>;
