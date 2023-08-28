import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    key: "rootThought";
    state: {
        readonly rawPrompt: "";
    } & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
