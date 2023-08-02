import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: "dom" | "pixi";
    readonly key: "chrome" | "vsCode" | "textBox" | "rectangle";
    readonly state: {
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly appDataId: string;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly appDataId: string;
        readonly url: string;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly content: string;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    };
}>;
