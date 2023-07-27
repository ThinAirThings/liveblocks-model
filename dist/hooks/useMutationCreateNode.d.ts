import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "pixi" | "dom" | "process";
    key: "chrome" | "vsCode" | "applicationWindow" | "textBox" | "rectangle";
    state: {} | {
        url: string;
    } | {
        cursor: string;
    } | {
        content: string;
    };
}) => string;
