import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "dom" | "pixi";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({} | {
        appDataId: string;
        lifecycleState: "alive" | "dead";
        cursor: string;
        url: string;
    } | {
        appDataId: string;
        lifecycleState: "alive" | "dead";
        cursor: string;
    } | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
