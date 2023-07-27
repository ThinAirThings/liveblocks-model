import { NodeDataTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    chrome: import("..").DefaultBoxSize & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
        };
    };
    textBox: import("..").DefaultBoxSize & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]) => {
    chrome: import("..").DefaultBoxSize & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
        };
    };
    textBox: import("..").DefaultBoxSize & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"][keyof {
    chrome: import("..").DefaultBoxSize & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            appDataId: string;
            lifecycleState: "alive" | "dead";
            cursor: string;
        };
    };
    textBox: import("..").DefaultBoxSize & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]];
