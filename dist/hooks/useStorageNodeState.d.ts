import { NodeDataTypeIndex, StorageHook } from "../index.js";
export declare const useStorageNodeState: <K extends "rootThought" | "thought" | "basicStockChart">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]) => {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"][keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]];
