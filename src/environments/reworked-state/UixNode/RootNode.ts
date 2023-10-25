

import { Room } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";
import { LiveIndexStorageModel } from "../LiveObjects/LiveIndexNode.js";



export class RootNode<
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    null,
    'root',
    typeof RootNode,
    ChildTemplates
>{
    initialState: any;
    static nodeType = 'RootNode' as const
    constructor(
        liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        liveNodeMap: LiveIndexStorageModel['liveNodeMap'],
        rootNodeTemplate: UixNodeTemplate<'root', typeof RootNode, {}, ChildTemplates>
    ){
        super(
            liveIndexRoom,
            liveNodeMap,
            null,
            'root',
            rootNodeTemplate
        )
    }
    useStorage<Key extends never>(key: Key): {}[Key] {
        throw new Error("Method not implemented.");
    }
    mutateStorage<Key extends never>(key: Key, value: {}[Key]): void {
        throw new Error("Method not implemented.");
    }
}