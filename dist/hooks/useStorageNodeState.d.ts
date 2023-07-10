import { createRoomContext } from "@liveblocks/react";
import { LiveblocksPresence, LiveblocksStorageModel, NodeTypeIndex } from "..";
export declare const useStorageNodeState: <T extends keyof NodeTypeIndex, K extends keyof NodeTypeIndex[T]["defaultProps"]>(useStorage: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage'], nodeId: string, key: K) => (import("@liveblocks/core").LiveObject<NodeTypeIndex[T]["defaultProps"] & {
    containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
}> extends infer T_1 ? T_1 extends import("@liveblocks/core").LiveObject<NodeTypeIndex[T]["defaultProps"] & {
    containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
}> ? T_1 extends import("@liveblocks/core").LiveObject<infer O extends import("@liveblocks/core").LsonObject> ? import("@liveblocks/core").ToImmutable<O> : T_1 extends import("@liveblocks/core").LiveMap<infer K_1 extends string, infer V extends import("@liveblocks/core").Lson> ? ReadonlyMap<K_1, import("@liveblocks/core").ToImmutable<V>> : T_1 extends import("@liveblocks/core").LsonObject ? T_1 extends infer T_2 extends import("@liveblocks/core").LsonObject ? { readonly [K_2 in keyof T_2]: import("@liveblocks/core").ToImmutable<Exclude<T_1[K_2], undefined>> | (undefined extends T_1[K_2] ? T_1[K_2] & undefined : never); } : never : T_1 extends import("@liveblocks/core").Json ? T_1 : never : never : never)[K];
