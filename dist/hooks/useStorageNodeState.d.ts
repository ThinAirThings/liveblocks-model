import { NodeDataTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <K extends "chrome" | "vsCode" | "textBox" | "rectangle">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {};
    };
}[K]["defaultProps"]) => {
    chrome: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {};
    };
}[K]["defaultProps"][keyof {
    chrome: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
            url: string;
        };
    };
    vsCode: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {
            content: string;
        };
    };
    rectangle: {
        type: "applicationWindow" | "pixi" | "dom";
        isCreatedBy: "any" | "user" | "system";
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
        isCreatedBy: "any";
        defaultProps: {};
    };
}[K]["defaultProps"]];
