import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "process";
        key: "chrome";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]) => (value: {
    chrome: {
        type: "process";
        key: "chrome";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"][keyof {
    chrome: {
        type: "process";
        key: "chrome";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "pixi";
        key: "rectangle";
        defaultProps: {};
    };
}[K]["defaultProps"]]) => void;
