import { UixNodeTypeIndex } from "../filesystem/UixNodeTypeIndex.js";


// What are you trying to do?
// My goal is to represent the child templates as an array which can be mapped through and transformed
// Into a mapped type array with the new values.

export type UixNodeTemplate<
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    U extends UixNodeTemplate<any, any, any>[] | [],
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    childTemplates: U extends UixNodeTemplate<any, any, any>[] 
        ? UixNodeTemplate<any, any, any>[]
        : [] 
    // Not sure if you need to recurse here 
    // {
    //     [Type in U[number]['customType']]: UixNodeTemplate<
    //         (U[number] & {customType: Type})['uixNodeType'],
    //         (U[number] & {customType: Type})['customType'],
    //         (U[number] & {customType: Type})['childTemplates']
    //     >
    // }[U[number]['customType']][]
}

export const createUixNodeTemplate = <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    U extends UixNodeTemplate<any, any, any>[],
>(
    uixNodeType: UixNodeType,
    customType: CustomType,
    childTemplates?: U
)  => {
    return <UixNodeTemplate<
        UixNodeType, 
        CustomType, 
        U
    >>{
        uixNodeType,
        customType,
        childTemplates: childTemplates??[]
    }
}




