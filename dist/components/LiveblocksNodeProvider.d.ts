import { ReactNode } from 'react';
import { LiveblocksPresence, LiveblocksStorageModel } from "../index.js";
export declare const useRoom: () => import("@liveblocks/core").Room<LiveblocksPresence, LiveblocksStorageModel, import("@liveblocks/core").BaseUserMeta, never>, useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
    addToHistory: boolean;
} | undefined) => void], useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
    addToHistory: boolean;
} | undefined) => void, useOthersMapped: <T>(itemSelector: (other: import("@liveblocks/core").User<LiveblocksPresence, import("@liveblocks/core").BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[], useOthers: {
    (): import("@liveblocks/core").Others<LiveblocksPresence, import("@liveblocks/core").BaseUserMeta>;
    <T>(selector: (others: import("@liveblocks/core").Others<LiveblocksPresence, import("@liveblocks/core").BaseUserMeta>) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined): T;
}, useStorage: <T>(selector: (root: {
    readonly nodeMap: ReadonlyMap<string, {
        readonly nodeId: string;
        readonly key: "rootThought" | "thought" | "basicStockChart";
        readonly renderer: "dom";
        readonly state: {
            readonly rawPrompt: "";
            readonly containerState: {
                readonly x: number;
                readonly y: number;
                readonly width: number;
                readonly height: number;
                readonly scale: number;
            };
        } | {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
            readonly containerState: {
                readonly x: number;
                readonly y: number;
                readonly width: number;
                readonly height: number;
                readonly scale: number;
            };
        } | {
            readonly data: {
                time: string;
                value: number;
            }[];
            readonly containerState: {
                readonly x: number;
                readonly y: number;
                readonly width: number;
                readonly height: number;
                readonly scale: number;
            };
        };
    }>;
}) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined) => T, RoomProvider: (props: {
    id: string;
    children: ReactNode;
    shouldInitiallyConnect?: boolean | undefined;
    unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
    initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
    initialStorage?: LiveblocksStorageModel | ((roomId: string) => LiveblocksStorageModel) | undefined;
}) => JSX.Element, useMutation: <F extends (context: import("@liveblocks/react").MutationContext<LiveblocksPresence, LiveblocksStorageModel, import("@liveblocks/core").BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never, useSelf: {
    (): import("@liveblocks/core").User<LiveblocksPresence, import("@liveblocks/core").BaseUserMeta>;
    <T>(selector: (me: import("@liveblocks/core").User<LiveblocksPresence, import("@liveblocks/core").BaseUserMeta>) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined): T;
}, RoomContext: import("react").Context<import("@liveblocks/core").Room<LiveblocksPresence, LiveblocksStorageModel, import("@liveblocks/core").BaseUserMeta, never> | null>;
export declare const LiveblocksRoomProvider: ({ userId, spaceId, serverName, children }: {
    userId: string;
    spaceId: string;
    serverName: string;
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
