import { ImmutableAirNode, LiveblocksPresence, LiveblocksStorageModel } from "..";
import { createRoomContext } from "@liveblocks/react";
export declare const useMutationNodeState: <T extends Record<string, any>, Key extends keyof ImmutableAirNode<T>["state"]>(useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'], nodeId: string, key: Key) => (value: ({
    nodeId: string;
    type: keyof import("..").NodeTypeIndex;
    state: import("@liveblocks/core").LiveObject<T & {
        containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
    }>;
    children: import("@liveblocks/core").LiveMap<string, import("..").AirNode<any>>;
} extends infer T_1 ? T_1 extends {
    nodeId: string;
    type: keyof import("..").NodeTypeIndex;
    state: import("@liveblocks/core").LiveObject<T & {
        containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
    }>;
    children: import("@liveblocks/core").LiveMap<string, import("..").AirNode<any>>;
} ? T_1 extends import("@liveblocks/core").LsonObject ? T_1 extends infer T_2 extends import("@liveblocks/core").LsonObject ? { readonly [K in keyof T_2]: import("@liveblocks/core").ToImmutable<Exclude<T_1[K], undefined>> | (undefined extends T_1[K] ? T_1[K] & undefined : never); } : never : T_1 extends import("@liveblocks/core").Json ? T_1 : never : never : never)["state"][Key]) => void;
