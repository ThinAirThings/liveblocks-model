import { JsonObject } from "@liveblocks/client";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";


export type UixNodeTemplate<
    UixNodeType extends keyof typeof UixNodeTypeIndex= keyof typeof UixNodeTypeIndex,
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any, any>>,
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    state: State
    childTemplates: {
        [ChildType in keyof CTR]: UixNodeTemplate<
            CTR[ChildType]['uixNodeType'],
            CTR[ChildType]['customType'],
            CTR[ChildType]['state'],
            CTR[ChildType]['childTemplates']
        >
    }
}

export const createUixNodeTemplate = <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    State extends JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
>(
    uixNodeType: string,
    customType: CustomType,
    state: State,
    childTemplates?: CTR
)  => {
    return <UixNodeTemplate<
        UixNodeType,
        CustomType,
        State,
        CTR
    >>{
        uixNodeType,
        customType,
        state,
        childTemplates: childTemplates??{}
    }
}

export const createS3ObjectNodeTemplate = <
    CustomType extends string,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
>(
    customType: CustomType,
    childTemplates?: CTR
) => createUixNodeTemplate('S3ObjectNode', customType, {
    objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
    bucketName: <string>'',
    objectName: <string>''
}, childTemplates??{})