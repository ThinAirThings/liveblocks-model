import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "dom" | "pixi";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({} | {
        dataId: string;
        lifeCycle: "alive" | "dead";
        cursor: string;
        url: string;
    } | {
        cursor: string;
    } | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
