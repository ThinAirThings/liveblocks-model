import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "dom" | "pixi";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({} | (import("..").WindowProps & {
        url: string;
    }) | (import("..").WindowProps & {
        cursor: string;
    }) | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
