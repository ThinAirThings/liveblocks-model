import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "applicationWindow" | "pixi" | "dom";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: {
        [key: string]: any;
    } | ({
        [key: string]: any;
    } & {
        cursor: string;
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
