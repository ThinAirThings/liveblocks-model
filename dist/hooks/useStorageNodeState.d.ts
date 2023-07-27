import { NodeDataTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
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
        type: "applicationWindow" | "pixi" | "dom";
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
}[K]["defaultProps"]) => {
    chrome: {
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
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
        type: "applicationWindow" | "pixi" | "dom";
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
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "chrome";
        defaultProps: {
            dataId: string;
            lifeCycle: "alive" | "dead";
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "applicationWindow";
        key: "vsCode";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
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
        type: "applicationWindow" | "pixi" | "dom";
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
}[K]["defaultProps"]];
