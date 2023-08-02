import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: import("..").DefaultBoxSize & {
        key: "chrome";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        key: "vsCode";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        key: "textBox";
        type: "whiteboard";
        renderer: "dom";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        key: "rectangle";
        type: "whiteboard";
        renderer: "pixi";
        defaultProps: {};
    };
}[K]["defaultProps"]) => (value: {
    chrome: import("..").DefaultBoxSize & {
        key: "chrome";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        key: "vsCode";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        key: "textBox";
        type: "whiteboard";
        renderer: "dom";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        key: "rectangle";
        type: "whiteboard";
        renderer: "pixi";
        defaultProps: {};
    };
}[K]["defaultProps"][keyof {
    chrome: import("..").DefaultBoxSize & {
        key: "chrome";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        key: "vsCode";
        type: "application";
        renderer: "dom";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        key: "textBox";
        type: "whiteboard";
        renderer: "dom";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        key: "rectangle";
        type: "whiteboard";
        renderer: "pixi";
        defaultProps: {};
    };
}[K]["defaultProps"]]) => void;
