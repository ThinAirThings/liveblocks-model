import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "pixi" | "process";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: {
        [key: string]: any;
    } | ({
        [key: string]: any;
    } & {
        url: string;
    }) | ({
        [key: string]: any;
    } & {
        content: string;
    });
}) => string;
