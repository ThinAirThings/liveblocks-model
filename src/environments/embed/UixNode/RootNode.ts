

import { Room } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";
import { LiveIndexStorageModel } from "../LiveObjects/LiveIndexNode.js";



export class RootNode<
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    null,
    'root',
    {},
    CTR
>{
    static nodeType = 'RootNode' as const
    constructor(
        liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        rootNodeTemplate: UixNodeTemplate<'root', {}, CTR>
    ){
        super(
            liveIndexRoom,
            liveNodeMap,
            null,
            'root',
            rootNodeTemplate
        )
    }
}