import { JsonObject } from "@liveblocks/client"
import { SimpleStateNode } from "./SimpleStateNode.js"
import { UixNode, UixNodeConstructor } from "./UixNode.js"
import { S3ObjectNode } from "./S3ObjectNode.js"
import { GenericCustomNodeTemplate } from "./CustomNodeTemplate.js"



export const UixNodeTypeIndex: {
    [Key: string]: {
        State: JsonObject
        Constructor: UixNodeConstructor<any, any>
    }
} = {
    'SimpleStateNode': {
        State: <JsonObject> {},
        Constructor: SimpleStateNode
    },
    'S3ObjectNode': {
        State: {
            objectState: <'uninitialized' | 'writing' | 'ready' | 'error'> 'uninitialized',
            bucketName: <string> '',
            objectName: <string> ''
        },
        Constructor: S3ObjectNode
    }
}