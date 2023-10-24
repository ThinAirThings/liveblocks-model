import { JsonObject } from "@liveblocks/client"
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js"
import { HasTail } from "../filesystem/UtilityTypes.js"

export type UixNodeTemplate<
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTS extends UixNodeTemplate[] | []=UixNodeTemplate<any, any, any>[] | [],
> = {
    uixNodeType: keyof typeof UixNodeTypeIndex
    customType: CustomType
    state: State
    childTemplates: HasTail<CTS> extends true ? {    
        [Type in CTS[number]['customType']]: (CTS[number] & {customType: Type}) extends UixNodeTemplate<
            infer CustomType, infer State, infer ChildTemplates extends UixNodeTemplate[] | []
        > ? UixNodeTemplate<CustomType, State, ChildTemplates> : never
    }[CTS[number]['customType']][] : []
}

export const createUixNodeTemplate = <
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
>(
    uixNodeType: keyof typeof UixNodeTypeIndex,
    customType: CustomType,
    state: State,
    childTemplates?: CTS
)  => {
    return <UixNodeTemplate<
        CustomType,
        State,
        CTS
    >>{
        uixNodeType,
        customType,
        state,
        childTemplates: childTemplates??[]
    }
}

export const createS3ObjectNodeTemplate = <
    CustomType extends string,
    CTS extends UixNodeTemplate[] | [],
>(
    customType: CustomType,
    childTemplates?: CTS
) => createUixNodeTemplate('S3ObjectNode', customType, {
    objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
    bucketName: <string>'',
    objectName: <string>''
}, childTemplates??[])