import { LsonObject, Lson, LiveObject, LiveList, LiveMap } from '@liveblocks/client';
import { Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type LiveAirNode<T extends string, S extends LsonObject, M extends Lson = {}> = LiveObject<{
    nodeId: string;
    parentNodeId: string | null;
    type: T;
    meta: M & {
        createdAt: string;
    };
    children: LiveList<string>;
    state: LiveObject<S>;
}>;
type AirNodeIndex<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: Pick<((AirNodeShape<U> & {
        type: Type;
    })), "meta" | "state">;
};
type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string;
        type: Type;
        meta: U extends LiveAirNode<Type, any, infer M> ? M : never;
        state: U extends LiveAirNode<Type, infer V> ? V : never;
    };
}[AirNodeType<U>];
type AirNodeType<U extends LiveAirNode<any, any, any>> = U extends LiveAirNode<infer T, any, any> ? T : never;
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

export { AirNodeIndex as A, LiveAirNode as L, UnionToIntersection as U, AirNodeShape as a, AirNodeState as b, AirNodeType as c, LiveAirNodeState as d, LiveblocksStorageModel as e, AirNodeMeta as f, LiveblocksPresence as g };
