import { JsonObject } from "@liveblocks/client"
import { SimpleStateNode } from "./SimpleStateNode.js"
import { UixNode} from "./UixNode.js"
import { S3ObjectNode } from "./S3ObjectNode.js"
import { CustomNodeTemplate } from "./CustomNodeTemplate.js"



export const UixNodeTypeIndex ={
    'SimpleStateNode': {
        State: <JsonObject> {},
    },
    'S3ObjectNode': {
        State: {
            objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
            bucketName: <string> '',
            objectName: <string> ''
        },
    }
} as const