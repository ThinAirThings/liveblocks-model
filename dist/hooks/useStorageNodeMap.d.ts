import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: "applicationWindow" | "pixi" | "dom";
    readonly key: "chrome" | "vsCode" | "textBox" | "rectangle";
    readonly state: {
        readonly [x: string]: any;
    } | {
        readonly [x: string]: any;
        readonly cursor: string;
        readonly url: string;
    } | {
        readonly [x: string]: any;
        readonly cursor: string;
    } | {
        readonly [x: string]: any;
        readonly content: string;
    };
}>;
