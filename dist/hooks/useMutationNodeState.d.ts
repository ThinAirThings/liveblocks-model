import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
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
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
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
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "textBox";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
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
