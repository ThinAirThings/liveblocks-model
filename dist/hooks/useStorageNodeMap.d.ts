import { StorageHook } from "..";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly type: "applicationWindow" | "pixi" | "dom";
    readonly key: "chrome" | "vsCode" | "textBox" | "rectangle";
    readonly state: {
        readonly [x: string]: any;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly [x: string]: any;
        readonly dataId: string;
        readonly lifeCycle: "alive" | "dead";
        readonly cursor: string;
        readonly url: string;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly [x: string]: any;
        readonly cursor: string;
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly [x: string]: any;
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
