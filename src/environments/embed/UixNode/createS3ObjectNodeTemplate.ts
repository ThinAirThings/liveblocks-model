import { S3ObjectNode, S3ObjectState } from "./S3ObjectNode.js";
import { UixNodeTemplate, createUixNodeTemplate } from "./createUixNodeTemplate.js";

export const createS3ObjectNodeTemplate = <
    CustomType extends string,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    childTemplates?: ChildTemplates
) => createUixNodeTemplate(customType, S3ObjectNode, { 
    state: {
        objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
        bucketName: <string>'',
        objectName: <string>''
    }
}, childTemplates??{}) as UixNodeTemplate<
    CustomType,
    S3ObjectState,
    ChildTemplates
>