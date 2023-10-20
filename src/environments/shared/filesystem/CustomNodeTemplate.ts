import { JsonObject } from "@liveblocks/client";
import { UixNodeTypeIndex } from "./UixNodeTypeIndex.js";


export type GenericCustomNodeTemplate<
    CustomNodeTemplateRecordOrNull extends GenericCustomNodeTemplateRecord | null = GenericCustomNodeTemplateRecord | null,
    UixNodeType extends keyof typeof UixNodeTypeIndex=keyof typeof UixNodeTypeIndex,
    CustomType extends string=string,
    Metadata extends JsonObject=JsonObject,
    State extends typeof UixNodeTypeIndex[UixNodeType]['State']=typeof UixNodeTypeIndex[UixNodeType]['State'],
    ImplementationIndex extends Record<string, any> = Record<string, any>,
> = {
    uixNodeType: UixNodeType
    customType: CustomType
    metadata: Metadata
    state: State
    stateDisplayKey: keyof State
    childCustomNodeTemplateRecord: CustomNodeTemplateRecordOrNull
    implementationIndex: ImplementationIndex
}


export type GenericCustomNodeTemplateRecord<
    CustomNodeTemplateRecord extends Record<string, GenericCustomNodeTemplate> = Record<string, GenericCustomNodeTemplate<any>>
> = {
    [Key in keyof CustomNodeTemplateRecord]: CustomNodeTemplateRecord[Key]
}

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
    CustomNodeTemplateRecordOrNull extends GenericCustomNodeTemplateRecord | null=null
>(
    uixNodeType: UixNodeType,
    customType: CustomType,
    props: NodeTemplateProps<UixNodeType, Metadata, State, ImplementationIndex>,
    childCustomNodeTemplateRecord?: CustomNodeTemplateRecordOrNull,
): GenericCustomNodeTemplate<
    CustomNodeTemplateRecordOrNull extends NonNullable<CustomNodeTemplateRecordOrNull> 
        ? CustomNodeTemplateRecordOrNull
        : null,
    UixNodeType, 
    CustomType, 
    Metadata, 
    State, 
    ImplementationIndex
> => {
    return {
        uixNodeType,
        customType,
        metadata: props.metadata,
        stateDisplayKey: props.stateDisplayKey,
        state: props.state,
        implementationIndex: props.implementationIndex,
        childCustomNodeTemplateRecord: childCustomNodeTemplateRecord??null as any // This is perfectly legal to get typescript to handle the optional undefined case.
                                            // This happens because you can't mix type parameters and runtime parameters.
    }
}

