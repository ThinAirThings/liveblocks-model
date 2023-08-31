import { StorageHook } from "../index.js";
export declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
    readonly nodeId: string;
    readonly key: "rootThought" | "thought" | "basicStockChart";
    readonly renderer: "dom";
    readonly state: {
        readonly rawPrompt: "";
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly timestamp: "";
        readonly rawThought: "";
        readonly mainIdea: "";
        readonly keyPoints: string[];
        readonly abstract: "";
        readonly trainOfThought: string[];
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    } | {
        readonly data: {
            time: string;
            value: number;
        }[];
        readonly containerState: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
            readonly scale: number;
        };
    };
}>;
