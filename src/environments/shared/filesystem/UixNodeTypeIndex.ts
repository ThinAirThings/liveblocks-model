import { JsonObject, Room } from "@liveblocks/client"
// import { SimpleStateNode } from "./SimpleStateNode.js"
// import { S3ObjectNode } from "./S3ObjectNode.js"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"
import { LiveIndexStorageModel } from "./LiveIndexNode.js"



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


