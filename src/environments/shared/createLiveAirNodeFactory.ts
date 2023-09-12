import { LiveObject } from "@liveblocks/client"
import { LiveAirNode, LiveAirNodeShape } from "../../model/data-model.js";
import {v4 as uuidv4} from 'uuid'


export const createLiveAirNodeFactory = <
    LiveNodeUnion extends LiveAirNode<any, any, any>
>() => <
    T extends LiveAirNodeShape<LiveNodeUnion>["type"],
>({
    type,
    state,
    meta
}:{
    type: T,
    state: (LiveAirNodeShape<LiveNodeUnion>&{type: T})['state'],
    meta: (LiveAirNodeShape<LiveNodeUnion>&{type: T})['meta']
}): LiveAirNode<
    T, 
    (LiveAirNodeShape<LiveNodeUnion>&{type: T})['state'],
    (LiveAirNodeShape<LiveNodeUnion>&{type: T})['meta']
> => {
    return new LiveObject({
        nodeId: uuidv4(),
        type,
        meta: meta,
        state: new LiveObject({
            ...state,
        }),
    })
}