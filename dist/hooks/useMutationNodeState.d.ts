import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "chrome";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "vsCode";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]) => (value: {
    chrome: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "chrome";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "vsCode";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"][keyof {
    chrome: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "chrome";
        defaultProps: import("..").ApplicationProps & {
            url: string;
        };
    };
    vsCode: import("..").DefaultBoxSize & {
        type: "application";
        renderer: "dom";
        key: "vsCode";
        defaultProps: import("..").ApplicationProps;
    };
    textBox: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: import("..").DefaultBoxSize & {
        type: "whiteboard";
        renderer: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]]) => void;
