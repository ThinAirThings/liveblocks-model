import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly key: "rootThought";
    readonly renderer: "pixi";
    readonly state: {
        readonly rawPrompt: "";
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    };
}>;
