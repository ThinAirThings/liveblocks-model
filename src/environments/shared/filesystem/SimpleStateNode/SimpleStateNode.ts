import { JsonObject, LiveObject } from "@liveblocks/client";
import { UixNode } from "../UixNode/UixNode.js";
import { UixNodeConstructor, UixNodeTemplate } from "../UixNode/createUixNodeTemplate.js";
import { useSyncExternalStore } from "react";
import isEqual from "lodash.isequal";



export class SimpleStateNode<
    State extends JsonObject= JsonObject,
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    CustomType extends string=string,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<ParentUixNode, CustomType, typeof SimpleStateNode, ChildTemplates> 
{
    static nodeType = 'SimpleStateNode' as const
    initialState: State
    lastStorageValues: State
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, any, ChildTemplates>>
    ){
        const [liveIndexRoom, liveNodeMap, parentNode, nodeId, nodeTemplate] = args;
        super(liveIndexRoom, liveNodeMap, parentNode, nodeId, {
            ...nodeTemplate,
        })
        this.initialState = this.state.toImmutable() as State
        this.lastStorageValues = this.state.toImmutable() as State
    }
    mutateStorage<Key extends keyof State>(key: Key, value: State[Key]): void {
        this.liveIndexNode.get('state').set(key as string, value)
    }
    useStorage<Key extends keyof State>(key: Key): State[Key] {
        return useSyncExternalStore((callback) => {
            const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get('state'), callback)
            return () => unsubscribe()
        }, () => {
            const newValue = this.liveIndexNode.get('state').toImmutable()[key as string]
            return isEqual(this.lastStorageValues[key], newValue) 
                ? this.lastStorageValues[key] 
                : this.lastStorageValues[key] = newValue as State[Key]
        } )
    }
}