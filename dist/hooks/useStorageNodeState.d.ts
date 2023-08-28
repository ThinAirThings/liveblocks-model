import { NodeDataTypeIndex, StorageHook } from "..";
export declare const useStorageNodeState: <K extends "rootThought">(useStorage: StorageHook, nodeId: string, propKey: keyof {
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
}[K]["defaultProps"]];
