

import { JsonObject } from "@liveblocks/client";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";
import { HasHead, IsEmptyRecord } from "./UtilityTypes.js";


export type UixNodeTemplate<
    UixNodeType extends keyof typeof UixNodeTypeIndex=keyof typeof UixNodeTypeIndex,
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any, any>> 
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
    CTS extends UixNodeTemplate[],
>(
    uixNodeType: UixNodeType,
    customType: CustomType,
    state: State,
    childTemplates?: CTS
)  => {
    return <UixNodeTemplate<
        UixNodeType, 
        CustomType,
        State,
        {
            [ChildType in CTS[number]['customType']]: UixNodeTemplate<
                (CTS[number] & {customType: ChildType})['uixNodeType'], 
                (CTS[number] & {customType: ChildType})['customType'],
                (CTS[number] & {customType: ChildType})['state'], 
                (CTS[number] & {customType: ChildType})['childTemplates']
            >
        }
    >>{
        uixNodeType,
        customType,
        childTemplates: childTemplates??{}
    }
}