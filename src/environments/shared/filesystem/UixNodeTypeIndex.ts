import { JsonObject, Room } from "@liveblocks/client"
// import { SimpleStateNode } from "./SimpleStateNode.js"
// import { S3ObjectNode } from "./S3ObjectNode.js"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"
import { LiveIndexStorageModel } from "./LiveIndexNode.js"
import { useSyncExternalStore } from "react"



export class SimpleStateNode<
    ParentUixNode extends UixNode | null,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
> extends UixNode<
    ParentUixNode,
    State,
    CTS
> {
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, State, CTS>>
    ){
        super(...args)
    }

    useStorage<Key extends keyof State>(key: Key) {
        return null as any
    }
}


type S3ObjectState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error',
    bucketName: string,
    objectName: string
}
export class S3ObjectNode<
    ParentUixNode extends UixNode | null,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
> extends UixNode<
    ParentUixNode,
    State,
    CTS
> {
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, State, CTS>>
    ){
        super(...args)
    }
    useStorage<Key extends keyof State>(key: Key) {
        return null as any
    }
    delete(): void {
        super.delete()
        // Do Other stuff like cleanup S3
    }
}


export const UixNodeTypeIndex = {
    'SimpleStateNode': {
        State: <JsonObject> {},
        Constructor: SimpleStateNode
    },
    'S3ObjectNode': {
        State: {
            objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
            bucketName: <string> '',
            objectName: <string> ''
        },
        Constructor: S3ObjectNode
    }
} as const


