import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "process" | "pixi" | "dom";
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
        cursor: string;
    }) | ({
        [key: string]: any;
    } & {
        content: string;
    });
}) => string;
