import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";
import { useSyncExternalStore } from "react";
import isEqual from "lodash.isequal";


export class SimpleStateNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    State extends JsonObject= JsonObject,
    CustomType extends string=string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<ParentUixNode, CustomType, State, CTR> 
{
    static nodeType = 'SimpleStateNode' as const
    private lastStorageValues: State
    pickles: number = 5
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, State, CTR>>
    ){
        super(...args)
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