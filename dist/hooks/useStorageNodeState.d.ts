import { NodeTypeIndex } from "..";
export declare const useStorageNodeState: <H extends <T>(selector: (root: {
    readonly nodeMap: ReadonlyMap<string, {
        readonly nodeId: string;
        readonly type: keyof NodeTypeIndex;
        readonly state: {
            readonly containerState: {
                readonly x: number;
                readonly y: number;
                readonly width: number;
                readonly height: number;
                readonly scale: number;
            };
        };
        readonly children: ReadonlyMap<string, {
            readonly nodeId: string;
            readonly type: keyof NodeTypeIndex;
            readonly state: any;
            readonly children: ReadonlyMap<string, any>;
        }>;
    }>;
}) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined) => T, T_1 extends keyof NodeTypeIndex, K extends keyof NodeTypeIndex[T_1]["defaultProps"]>(useStorage: H, nodeId: string, key: K) => (import("@liveblocks/core").LiveObject<NodeTypeIndex[T_1]["defaultProps"] & {
    containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
}> extends infer T_2 ? T_2 extends import("@liveblocks/core").LiveObject<NodeTypeIndex[T_1]["defaultProps"] & {
    containerState: import("@liveblocks/core").LiveObject<import("@thinairthings/zoom-utils").ContainerState>;
}> ? T_2 extends import("@liveblocks/core").LiveObject<infer O extends import("@liveblocks/core").LsonObject> ? import("@liveblocks/core").ToImmutable<O> : T_2 extends import("@liveblocks/core").LiveMap<infer K_1 extends string, infer V extends import("@liveblocks/core").Lson> ? ReadonlyMap<K_1, import("@liveblocks/core").ToImmutable<V>> : T_2 extends import("@liveblocks/core").LsonObject ? { readonly [K_2 in keyof T_2]: import("@liveblocks/core").ToImmutable<Exclude<T_2[K_2], undefined>> | (undefined extends T_2[K_2] ? T_2[K_2] & undefined : never); } : T_2 extends import("@liveblocks/core").Json ? T_2 : never : never : never)[K];
