import { createRoomContext } from "@liveblocks/react";
import { LiveblocksPresence, LiveblocksStorageModel } from "..";
export declare const useMutationDeleteNode: (useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']) => (nodeId: string) => void;
