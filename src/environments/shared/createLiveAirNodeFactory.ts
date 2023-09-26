import { LiveObject } from "@liveblocks/client"
import { LiveAirNode, AirNodeShape } from "../../model/data-model.js";
import {v4 as uuidv4} from 'uuid'


export const createLiveAirNodeFactory = <
    LiveNodeUnion extends LiveAirNode<any, any, any>
>() => <T extends AirNodeShape<LiveNodeUnion>["type"],>(
    type: T, {
    state,
    meta
}:{
    state: (AirNodeShape<LiveNodeUnion>&{type: T})['state'],
    meta: (AirNodeShape<LiveNodeUnion>&{type: T})['meta']
}): LiveAirNode<
    T, 
    (AirNodeShape<LiveNodeUnion>&{type: T})['state'],
    (AirNodeShape<LiveNodeUnion>&{type: T})['meta']
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