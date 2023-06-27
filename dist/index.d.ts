import { LiveMap, LiveObject, LsonObject } from "@liveblocks/client";
import { ContainerState } from "@thinairthings/zoom-utils";
export type NodeTypeIndex = {
    browser: {
        type: 'browser';
        typeDisplayName: string;
        typeDisplayIcon: string;
        defaultProps: {
            url: string;
        };
    };
    rectangle: {
        type: 'rectangle';
        typeDisplayName: string;
        typeDisplayIcon: string;
        defaultProps: {};
    };
};
export type NodeId = string;
export type AirNode<T extends {
    [key: string]: any;
} = {}> = LiveObject<{
    nodeId: string;
    type: keyof NodeTypeIndex;
    state: LiveObject<T & {
        containerState: LiveObject<ContainerState>;
    }>;
    children: LiveMap<string, AirNode<any>>;
}>;
export type ImmutableAirNode<T extends {
    [key: string]: any;
} = {}> = ReturnType<AirNode<T>["toImmutable"]>;
export declare const createAirNode: <T extends LsonObject = {}>({ type, state }: {
    type: keyof NodeTypeIndex;
    state: T & {
        containerState: ContainerState;
    };
}) => AirNode<T>;
export type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<{}>>;
};
