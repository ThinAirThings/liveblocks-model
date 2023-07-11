import { createRoomContext } from "@liveblocks/react";
import { LiveblocksPresence, LiveblocksStorageModel } from "..";
export declare const useMutationCreateNode: (useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']) => (args_0: {
    type: keyof import("..").NodeTypeIndex;
    state: import("@liveblocks/core").LsonObject & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
