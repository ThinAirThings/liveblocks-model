import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";

export type NullableCustomNodeTemplateRecord = Record<string, CustomNodeTemplate<
    keyof typeof UixNodeTypeIndex,
    string,
    any
>> | null

export type CustomNodeTemplate< 
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    ChildRecords extends NullableCustomNodeTemplateRecord,
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    childCustomNodeTemplateRecord: ChildRecords extends NonNullable<NullableCustomNodeTemplateRecord> ? {
        [CustomType in keyof NonNullable<ChildRecords>]: CustomNodeTemplate<
            NonNullable<ChildRecords>[CustomType]['uixNodeType'],
            NonNullable<ChildRecords>[CustomType]['customType'],
            NonNullable<ChildRecords>[CustomType]['childCustomNodeTemplateRecord']
        >
    }: null
}


export const createCustomNodeTemplate = <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    ChildRecords extends NullableCustomNodeTemplateRecord = null,
>(
    uixNodeType: UixNodeType,
    customType: CustomType,
    childCustomNodeTemplateRecord?: ChildRecords
)  => {
    return <CustomNodeTemplate< 
        UixNodeType, 
        CustomType, 
        ChildRecords
    >>{
        uixNodeType,
        customType,
        childCustomNodeTemplateRecord: childCustomNodeTemplateRecord??null
    }
}




