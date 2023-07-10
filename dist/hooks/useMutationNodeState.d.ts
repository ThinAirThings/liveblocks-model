import { LiveblocksPresence, LiveblocksStorageModel, NodeTypeIndex } from "..";
import { createRoomContext } from "@liveblocks/react";
export declare const useMutationNodeState: <T extends keyof NodeTypeIndex, K extends keyof NodeTypeIndex[T]["defaultProps"]>(useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'], nodeId: string, key: K) => (value: NodeTypeIndex[T]["defaultProps"][K]) => void;
