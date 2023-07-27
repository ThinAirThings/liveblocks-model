import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: "process" | "pixi" | "dom";
    readonly key: "chrome" | "vsCode" | "applicationWindow" | "textBox" | "rectangle";
    readonly state: {
        readonly [x: string]: any;
    } | {
        readonly [x: string]: any;
        readonly url: string;
    } | {
        readonly [x: string]: any;
        readonly applicationType: "chrome" | "vsCode";
        readonly cursor: string;
    } | {
        readonly [x: string]: any;
        readonly content: string;
    };
}>;
