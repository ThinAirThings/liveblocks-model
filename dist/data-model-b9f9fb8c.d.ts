import { LsonObject, Lson, LiveObject, LiveMap } from '@liveblocks/client';
import { Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';

type LiveAirNodeType<N extends LiveAirNode<any, any, any>> = N extends LiveAirNode<infer T, any, any> ? T : never;
type LiveAirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in LiveAirNodeType<U>]: {
        nodeId: string;
        type: Type;
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never;
        state: U extends LiveAirNode<Type, infer V, any> ? V : never;
    };
}[LiveAirNodeType<U>];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type LiveAirNodeState<U extends LiveAirNode<any, any, any>> = UnionToIntersection<LiveAirNodeShape<U>['state']>;
type NodeId = string;
type LiveAirNode<T extends string, V extends LsonObject, M extends Lson = {}> = LiveObject<{
    nodeId: string;
    type: T;
    meta: M;
    state: LiveObject<V>;
}>;
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

export { LiveAirNode as L, NodeId as N, UnionToIntersection as U, LiveblocksPresence as a, LiveblocksStorageModel as b, LiveAirNodeShape as c, LiveAirNodeType as d, LiveAirNodeState as e };
