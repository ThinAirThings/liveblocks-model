import { LsonObject, Lson, LiveObject, LiveMap } from '@liveblocks/client';
import { Point, ViewportState, ScreenState } from '@thinairthings/zoom-utils';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type LiveAirNode<T extends string, V extends LsonObject, M extends Lson = {}> = LiveObject<{
    nodeId: string;
    type: T;
    meta: M;
    state: LiveObject<V>;
}>;
type AirNodeShape<U extends LiveAirNode<any, any, any>> = {
    [Type in AirNodeType<U>]: {
        nodeId: string;
        type: Type;
        meta: (ReturnType<U['toImmutable']> & {
            type: Type;
        })['meta'];
        state: (ReturnType<U['toImmutable']> & {
            type: Type;
        })['state'];
    };
}[AirNodeType<U>];
type AirNodeType<U extends LiveAirNode<any, any, any>> = ReturnType<U['toImmutable']>['type'];
type AirNodeState<U extends LiveAirNode<any, any, any>> = ReturnType<U['toImmutable']>['state'];
type LiveAirNodeState<U extends LiveAirNode<any, any, any>> = LiveObject<ReturnType<U['toImmutable']>['state']>;
type AirNodeMeta<U extends LiveAirNode<any, any, any>> = ReturnType<U['toImmutable']>['meta'];
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

export { AirNodeType as A, LiveAirNode as L, UnionToIntersection as U, LiveblocksStorageModel as a, AirNodeState as b, LiveAirNodeState as c, AirNodeShape as d, AirNodeMeta as e, LiveblocksPresence as f };
