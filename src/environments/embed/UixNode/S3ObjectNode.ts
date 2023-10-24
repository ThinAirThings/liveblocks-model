import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";

export type S3ObjectState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error',
    bucketName: string,
    objectName: string
}

export class S3ObjectNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    State extends JsonObject= JsonObject,
    CustomType extends string=string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    CustomType,
    State,
    CTR
>{
    static nodeType = 'S3ObjectNode' as const
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType, State, CTR>>
    ){
        super(...args)
    }
}

