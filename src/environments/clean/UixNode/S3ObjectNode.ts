import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";

type S3ObjectState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error',
    bucketName: string,
    objectName: string
}

export class S3ObjectNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex= keyof typeof UixNodeTypeIndex,
    State extends JsonObject= JsonObject,
    CustomType extends string=string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<
    ParentUixNode,
    UixNodeType,
    CustomType,
    State,
    CTR
>{
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, UixNodeType, CustomType, State, CTR>>
    ){
        super(...args)
    }

    // create(...args: ConstructorParameters<typeof UixNode<ParentUixNode, 'S3ObjectNode', CustomType, S3ObjectState, CTR>>): S3ObjectNode<
    //     ParentUixNode,
    //     CustomType,
    //     CTR
    // >{
    //     return new S3ObjectNode(...args)
    // } 
}

