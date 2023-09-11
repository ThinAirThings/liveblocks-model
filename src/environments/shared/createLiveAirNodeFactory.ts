import { LiveObject } from "@liveblocks/client"
import { LiveAirNode, LiveAirNodeShapeUnion } from "../../index.js"
import {v4 as uuidv4} from 'uuid'


export const createLiveAirNodeFactory = <
    LiveNodeUnion extends LiveAirNode<any, any>
>() => <
    T extends LiveAirNodeShapeUnion<LiveNodeUnion>["type"],
>({
    type,
    state,
}:{
    type: T,
    state: (LiveAirNodeShapeUnion<LiveNodeUnion>&{type: T})['state'],
}): LiveAirNode<T, (LiveAirNodeShapeUnion<LiveNodeUnion>&{type: T})['state']> => {
    return new LiveObject({
        nodeId: uuidv4(),
        type,
        state: new LiveObject({
            ...state,
        }),
    })
}