import { LsonObject, Lson, LiveObject, LiveMap } from '@liveblocks/client';
import { Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type LiveAirNode<T extends string, PT extends string, S extends LsonObject, M extends Lson = {}> = LiveObject<{
    nodeId: string;
    type: T;
    parentType: PT;
    meta: M & {
        createdAt: string;
    };
    links: LiveObject<{
        'parent': [string];
        [type: string]: Array<string>;
    }>;
    state: LiveObject<S>;
}>;
type AirNodeIndex<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: Pick<((AirNodeShape<U> & {
        type: Type;
    })), "meta" | "state" | "parentType">;
};
type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string;
        type: Type;
        parentType: U extends LiveAirNode<any, infer PT, any> ? PT : never;
        meta: U extends LiveAirNode<Type, any, any, infer M> ? M : never;
        state: U extends LiveAirNode<Type, any, infer V> ? V : never;
    };
}[AirNodeType<U>];
type AirNodeType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<infer T, any, any> ? T : never;
type AirNodeParentType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<any, infer PT, any> ? PT : never;
type AirNodeState<U extends LiveAirNode<any, any, any>> = AirNodeShape<U>['state'];
type LiveAirNodeState<U extends LiveAirNode<any, any, any>> = LiveObject<AirNodeState<U>>;
type AirNodeMeta<U extends LiveAirNode<any, any, any>> = AirNodeShape<U>['meta'];
type LiveblocksStorageModel<LiveAirNodeUnion extends LiveAirNode<any, any, any>, Meta extends Lson = {}> = {
    meta: Meta;
    nodeMap: LiveMap<string, LiveAirNodeUnion>;
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

export { AirNodeIndex as A, LiveAirNode as L, UnionToIntersection as U, AirNodeType as a, AirNodeShape as b, AirNodeState as c, LiveAirNodeState as d, LiveblocksStorageModel as e, AirNodeParentType as f, AirNodeMeta as g, LiveblocksPresence as h };
