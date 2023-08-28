import { MutationHook, NodeDataTypeIndex } from "..";
export declare const useMutationNodeState: <K extends "rootThought">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    readonly rootThought: {
        readonly renderer: "pixi";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]) => (value: {
    readonly rootThought: {
        readonly renderer: "pixi";
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
        readonly renderer: "pixi";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]]) => void;
