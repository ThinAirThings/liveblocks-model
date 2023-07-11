import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: keyof import("..").NodeTypeIndex;
    state: import("@liveblocks/core").LsonObject & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
