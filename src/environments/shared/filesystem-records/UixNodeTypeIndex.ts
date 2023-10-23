import { JsonObject } from "@liveblocks/client"
// import { SimpleStateNode } from "./SimpleStateNode.js"
// import { S3ObjectNode } from "./S3ObjectNode.js"
import { UixNode } from "./UixNode.js"
import { UixNodeTemplate } from "./UixNodeTemplate.js"



export class SimpleStateNode<
    ParentUixNode extends UixNode | null,
    CustomType extends string,
    State extends JsonObject,
    CTR extends Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    'SimpleStateNode',
    State,
    CTR
> {
    constructor(
        parentNode: ParentUixNode,
        nodeTemplate: UixNodeTemplate<'SimpleStateNode', CustomType, State, CTR>,
    ){
        super(parentNode, nodeTemplate)
    }
}

export class S3ObjectNode<
    ParentUixNode extends UixNode | null,
    CustomType extends string,
    State extends JsonObject,
    CTR extends Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    'S3ObjectNode',
    State,
    CTR
> {
    constructor(
        parentNode: ParentUixNode,
        nodeTemplate: UixNodeTemplate<'S3ObjectNode', CustomType, State, CTR>,
    ){
        super(parentNode, nodeTemplate)
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


