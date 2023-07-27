import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "chrome" | "vsCode" | "applicationWindow" | "textBox" | "rectangle">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    chrome: {
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
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
}[K]["defaultProps"]) => (value: {
    chrome: {
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
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
        type: "process";
        key: "chrome";
        isCreatedBy: "any";
        defaultProps: {
            url: string;
        };
    };
    vsCode: {
        type: "process";
        key: "vsCode";
        isCreatedBy: "any";
        defaultProps: {};
    };
    applicationWindow: {
        type: "pixi" | "dom";
        defaultBoxSize: {
            width: number;
            height: number;
        };
    } & {
        type: "dom";
        key: "applicationWindow";
        isCreatedBy: "system";
        defaultProps: {
            cursor: string;
        };
    };
    textBox: {
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
}[K]["defaultProps"]]) => void;
