import { JsonObject, LiveObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";

export type S3ObjectState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error',
    bucketName: string,
    objectName: string
}

export class S3ObjectNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    State extends JsonObject= S3ObjectState,
    CustomType extends string=string,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<ParentUixNode, CustomType, State, ChildTemplates>{
    static nodeType = 'S3ObjectNode' as const
    declare get state: LiveObject<S3ObjectState>
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType,  State, ChildTemplates>>
    ){
        super(...args)
    }
    mutateStorage<Key extends keyof State>(key: Key, value: State[Key]): void {
       this.state.get('')
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

