import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "dom" | "pixi";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({} | import("..").WindowProps | (import("..").WindowProps & {
        url: string;
    }) | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
