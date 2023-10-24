import { JsonObject } from "@liveblocks/client";
import { HasTail } from "./UtilityTypes.js";


export type UixNodeTemplate<
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
> = {
    uixNodeType: string
    customType: CustomType
    state: State
    childTemplates: {
        [ChildType in keyof CTR]: UixNodeTemplate<
            CTR[ChildType]['customType'],
            CTR[ChildType]['state'],
            CTR[ChildType]['childTemplates']
        >
    }
}

export const createUixNodeTemplate = <
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