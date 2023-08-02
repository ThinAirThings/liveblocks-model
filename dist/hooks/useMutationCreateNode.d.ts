import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "application" | "whiteboard";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({} | import("..").ApplicationProps | (import("..").ApplicationProps & {
        url: string;
    }) | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
