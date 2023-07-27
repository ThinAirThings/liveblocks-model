import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "pixi" | "dom" | "process";
    key: "chrome" | "vsCode" | "applicationWindow" | "textBox" | "rectangle";
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
