import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: import("..").DefaultBoxSize & {
        type: "dom";
        key: "chrome";
        defaultProps: import("..").WindowProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: import("..").WindowProps;
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
}[K]["defaultProps"]) => (value: {
    chrome: import("..").DefaultBoxSize & {
        type: "dom";
        key: "chrome";
        defaultProps: import("..").WindowProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: import("..").WindowProps;
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
        defaultProps: import("..").WindowProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "dom";
        key: "vsCode";
        defaultProps: import("..").WindowProps;
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
}[K]["defaultProps"]]) => void;
