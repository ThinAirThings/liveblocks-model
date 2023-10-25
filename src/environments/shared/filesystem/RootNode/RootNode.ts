

import { Room } from "@liveblocks/client";
import { UixNode } from "../UixNode/UixNode.js";
import { UixNodeTemplate } from "../UixNode/createUixNodeTemplate.js";
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
    stateDisplayKey: string | number | symbol = "root";
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
    useDisplayName(): string {
       throw new Error("Method not implemented.");
    }
    useStorage<Key extends never>(key: Key): {}[Key] {
        throw new Error("Method not implemented.");
    }
    mutateStorage<Key extends never>(key: Key, value: {}[Key]): void {
        throw new Error("Method not implemented.");
    }
}