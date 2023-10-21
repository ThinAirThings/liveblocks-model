import { JsonObject } from "@liveblocks/client";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";


export type CustomNodeTemplate< 
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
    NullableCustomNodeTemplateRecord extends Record<string, CustomNodeTemplate<
        keyof typeof UixNodeTypeIndex,
        string,
        JsonObject,
        typeof UixNodeTypeIndex[keyof typeof UixNodeTypeIndex]['State'],
        Record<string, any>,
        Record<string, any> | null
    >> | null,
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    metadata: Metadata
    state: State
    stateDisplayKey: keyof State
    implementationIndex: ImplementationIndex
} & {
    childCustomNodeTemplateRecord: NullableCustomNodeTemplateRecord extends Record<string, any>
        ? NullableCustomNodeTemplateRecord 
        : null
}

export type TemplateRecord
type NodeTemplateProps <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
> = {
    metadata: Metadata
    state: State
    stateDisplayKey: keyof State
    implementationIndex: ImplementationIndex
}

export const createCustomNodeTemplate = <
    UixNodeType extends keyof typeof UixNodeTypeIndex,
    CustomType extends string,
    Metadata extends JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any>,
    NullableCustomNodeTemplateRecord extends Record<string, any> | null=null,
>(
    uixNodeType: UixNodeType,
    customType: CustomType,
    props: NodeTemplateProps<UixNodeType, Metadata, State, ImplementationIndex>,
    childCustomNodeTemplateRecord?: NullableCustomNodeTemplateRecord,
)  => {
    return <CustomNodeTemplate< 
        UixNodeType, 
        CustomType, 
        Metadata, 
        State, 
        ImplementationIndex,
        NullableCustomNodeTemplateRecord extends Record<string, any> 
            ? NonNullable<NullableCustomNodeTemplateRecord>
            : null
    >>{
        uixNodeType,
        customType,
        metadata: props.metadata,
        stateDisplayKey: props.stateDisplayKey,
        state: props.state,
        implementationIndex: props.implementationIndex,
        childCustomNodeTemplateRecord: childCustomNodeTemplateRecord??null
    }
}




