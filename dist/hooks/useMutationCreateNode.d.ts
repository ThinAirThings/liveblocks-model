import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    key: "chrome" | "vsCode" | "secondaryWindow" | "textBox" | "rectangle";
    state: ({} | import("..").ApplicationProps | (import("..").ApplicationProps & {
        url: string;
    }) | {
        content: string;
    }) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
