import { MutationHook } from "../index.js";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    key: "rootThought" | "thought" | "basicStockChart";
    state: ({
        readonly rawPrompt: "";
    } | {
        readonly timestamp: "";
        readonly rawThought: "";
        readonly mainIdea: "";
        readonly keyPoints: string[];
        readonly abstract: "";
        readonly trainOfThought: string[];
    } | {
        readonly data: {
            time: string;
            value: number;
        }[];
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
