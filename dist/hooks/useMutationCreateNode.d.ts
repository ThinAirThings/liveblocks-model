import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "pixi" | "process";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: {} | {
        url: string;
    } | {
        content: string;
    };
}) => string;
