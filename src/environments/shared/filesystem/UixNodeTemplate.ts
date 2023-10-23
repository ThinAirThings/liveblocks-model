import { JsonObject } from "@liveblocks/client";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";
import { HasHead } from "./UtilityTypes.js";


export type UixNodeTemplate<
    UixNodeType extends keyof typeof UixNodeTypeIndex=keyof typeof UixNodeTypeIndex,
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTS extends UixNodeTemplate[] | []=UixNodeTemplate<any, any, any, any>[] | [],
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    state: State
    childTemplates: HasHead<CTS> extends true
        ? UixNodeTemplate<
            CTS[number]['uixNodeType'], 
            CTS[number]['customType'],
            CTS[number]['state'], 
            CTS[number]['childTemplates']
        >[]
        :[] 
}

export const createUixNodeTemplate = <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    State extends JsonObject,
    CTS extends UixNodeTemplate[] | [],
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
        CTS
    >>{
        uixNodeType,
        customType,
        childTemplates: childTemplates??[]
    }
}




