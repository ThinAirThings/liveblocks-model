import { NodeDataTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <K extends "chrome" | "vsCode" | "applicationWindow" | "textBox" | "rectangle">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {};
    };
    textBox: {
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
        type: "pixi" | "dom" | "process";
        isCreatedBy: "any" | "user" | "system";
        key: string;
        defaultProps: {
            [key: string]: any;
        };
    } & {
        type: "pixi" | "dom";
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
