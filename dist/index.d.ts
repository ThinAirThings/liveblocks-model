import { LiveObject, LiveMap } from '@liveblocks/client';
import * as _liveblocks_react from '@liveblocks/react';
import { createRoomContext } from '@liveblocks/react';
import * as _thinairthings_zoom_utils from '@thinairthings/zoom-utils';
import { ContainerState, Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _liveblocks_core from '@liveblocks/core';

declare const useMutationNodeState: <K extends "rootThought" | "thought" | "basicStockChart">(useMutation: MutationHook, nodeId: string, propKey: keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]) => (value: {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"][keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]]) => void;

declare const useStorageNodeState: <K extends "rootThought" | "thought" | "basicStockChart">(useStorage: StorageHook, nodeId: string, propKey: keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]) => {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"][keyof {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
}[K]["defaultProps"]];

declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    key: "rootThought" | "thought" | "basicStockChart";
    state: ({
        readonly rawPrompt: "";
    } | {
        readonly timestamp: "";
        readonly rawThought: "";
        readonly mainIdea: "";
        readonly keyPoints: string[];
        readonly abstract: "";
        readonly trainOfThought: string[];
    } | {
        readonly data: {
            time: string;
            value: number;
        }[];
    }) & {
        containerState: _thinairthings_zoom_utils.ContainerState;
    };
}) => string;

declare const useMutationDeleteNode: (useMutation: MutationHook) => (nodeId: string) => void;

declare const useMutationContainerState: (useMutation: MutationHook) => (nodeId: string, containerState: Partial<ContainerState>) => void;

declare const useStorageContainerState: (useStorage: StorageHook, nodeId: string) => ContainerState;

declare const useStorageContainerStateMap: (useStorage: StorageHook, nodeIds?: string[]) => Map<string, ContainerState>;

declare const useStorageNodeMap: (useStorage: StorageHook) => ReadonlyMap<string, {
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

declare const useLostConnectionListener: (callback: (event: _liveblocks_core.LostConnectionEvent) => void) => void;
declare const useStatus: () => _liveblocks_core.Status;
declare const useErrorListener: (callback: (err: Error) => void) => void;
declare const useRoom: () => _liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel, _liveblocks_core.BaseUserMeta, never>;
declare const useMyPresence: () => [LiveblocksPresence, (patch: Partial<LiveblocksPresence>, options?: {
    addToHistory: boolean;
} | undefined) => void];
declare const useUpdateMyPresence: () => (patch: Partial<LiveblocksPresence>, options?: {
    addToHistory: boolean;
} | undefined) => void;
declare const useOthersMapped: <T>(itemSelector: (other: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, itemIsEqual?: ((prev: T, curr: T) => boolean) | undefined) => readonly (readonly [connectionId: number, data: T])[];
declare const useOthers: {
    (): _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
    <T>(selector: (others: _liveblocks_core.Others<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined): T;
};
declare const useStorage: <T>(selector: (root: {
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
}) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined) => T;
declare const RoomProvider: (props: {
    id: string;
    children: ReactNode;
    shouldInitiallyConnect?: boolean | undefined;
    unstable_batchedUpdates?: ((cb: () => void) => void) | undefined;
    initialPresence: LiveblocksPresence | ((roomId: string) => LiveblocksPresence);
    initialStorage?: LiveblocksStorageModel | ((roomId: string) => LiveblocksStorageModel) | undefined;
}) => JSX.Element;
declare const useMutation: <F extends (context: _liveblocks_react.MutationContext<LiveblocksPresence, LiveblocksStorageModel, _liveblocks_core.BaseUserMeta>, ...args: any[]) => any>(callback: F, deps: readonly unknown[]) => F extends (first: any, ...rest: infer A) => infer R ? (...args: A) => R : never;
declare const useSelf: {
    (): _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>;
    <T>(selector: (me: _liveblocks_core.User<LiveblocksPresence, _liveblocks_core.BaseUserMeta>) => T, isEqual?: ((prev: T, curr: T) => boolean) | undefined): T;
};
declare const RoomContext: react.Context<_liveblocks_core.Room<LiveblocksPresence, LiveblocksStorageModel, _liveblocks_core.BaseUserMeta, never> | null>;
declare const LiveblocksNodeRoomProvider: ({ userId, spaceId, serverName, Children }: {
    userId: string;
    spaceId: string;
    serverName: string;
    Children: () => ReactNode;
}) => react_jsx_runtime.JSX.Element;

type DefaultBoxSize = {
    defaultBoxSize: {
        width: number;
        height: number;
    };
};
type ApplicationProps = {
    appDataId: string;
};
type FilterNodeKeysByProperty<P> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];
declare const NodeDataTypeIndex: {
    readonly rootThought: {
        readonly renderer: "dom";
        readonly key: "rootThought";
        readonly defaultProps: {
            readonly rawPrompt: "";
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly thought: {
        readonly renderer: "dom";
        readonly key: "thought";
        readonly defaultProps: {
            readonly timestamp: "";
            readonly rawThought: "";
            readonly mainIdea: "";
            readonly keyPoints: string[];
            readonly abstract: "";
            readonly trainOfThought: string[];
        };
        readonly defaultBoxSize: {
            readonly width: 400;
            readonly height: 400;
        };
    };
    readonly basicStockChart: {
        readonly renderer: "dom";
        readonly key: "basicStockChart";
        readonly defaultProps: {
            readonly data: {
                time: string;
                value: number;
            }[];
        };
        readonly defaultBoxSize: {
            readonly width: 600;
            readonly height: 400;
        };
    };
};
type NodeId = string;
type AirNode<K extends keyof typeof NodeDataTypeIndex> = LiveObject<{
    nodeId: string;
    key: typeof NodeDataTypeIndex[K]['key'];
    renderer: typeof NodeDataTypeIndex[K]['renderer'];
    state: LiveObject<(typeof NodeDataTypeIndex[K]['defaultProps'] extends {
        [key: string]: any;
    } ? typeof NodeDataTypeIndex[K]['defaultProps'] : never) & {
        containerState: LiveObject<ContainerState>;
    }>;
}>;
type ImmutableAirNode<K extends keyof typeof NodeDataTypeIndex> = ReturnType<AirNode<K>["toImmutable"]>;
declare function createAirNode<K extends keyof typeof NodeDataTypeIndex>({ key, state }: {
    key: K;
    state: (typeof NodeDataTypeIndex[K]['defaultProps'] extends {
        [key: string]: any;
    } ? typeof NodeDataTypeIndex[K]['defaultProps'] : never) & (typeof NodeDataTypeIndex[K]['renderer'] extends 'pixi' | 'dom' ? {
        containerState: ContainerState;
    } : {});
}): AirNode<K>;
type LiveblocksStorageModel = {
    nodeMap: LiveMap<string, AirNode<keyof typeof NodeDataTypeIndex>>;
};
type LiveblocksPresence = {
    displayName: string;
    absoluteCursorState: Point | null;
    viewportState: ViewportState;
    mouseSelectionState: {
        selectionActive: boolean;
        absoluteSelectionBounds: ScreenState | null;
    };
    selectedNodeIds: string[];
    focusedNodeId: string | null;
};
type StorageHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage'];
type MutationHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'];

export { AirNode, ApplicationProps, DefaultBoxSize, FilterNodeKeysByProperty, ImmutableAirNode, LiveblocksNodeRoomProvider, LiveblocksPresence, LiveblocksStorageModel, MutationHook, NodeDataTypeIndex, NodeId, RoomContext, RoomProvider, StorageHook, createAirNode, useErrorListener, useLostConnectionListener, useMutation, useMutationContainerState, useMutationCreateNode, useMutationDeleteNode, useMutationNodeState, useMyPresence, useOthers, useOthersMapped, useRoom, useSelf, useStatus, useStorage, useStorageContainerState, useStorageContainerStateMap, useStorageNodeMap, useStorageNodeState, useUpdateMyPresence };
