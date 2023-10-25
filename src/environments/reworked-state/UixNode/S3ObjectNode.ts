import { JsonObject, LiveObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./createUixNodeTemplate.js";

export type S3ObjectInterfaceState = {
    objectState: 'uninitialized' | 'writing' | 'ready' | 'error',
    objectName: string
    data: string
    previousUploadResponse: string
}

export class S3ObjectNode<
    ParentUixNode extends UixNode | null= UixNode<any> | null,
    CustomType extends string=string,
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
> extends UixNode<ParentUixNode, CustomType, typeof S3ObjectNode, ChildTemplates>{
    static nodeType = 'S3ObjectNode' as const
    initialState: S3ObjectInterfaceState
    proxyUrl: string
    constructor(
        ...args: ConstructorParameters<typeof UixNode<ParentUixNode, CustomType,  any, ChildTemplates>>
    ){
        const [liveIndexRoom, liveNodeMap, parentNode, nodeId, nodeTemplate] = args;
        super(liveIndexRoom, liveNodeMap, parentNode, nodeId, {
            ...nodeTemplate,
            initialState: {
                bucketName: "Bucket Name",
                ...nodeTemplate.initialState? nodeTemplate.initialState : {},
                objectState: 'uninitialized',
                objectName: 'New Object'
            } as S3ObjectInterfaceState
        })
        this.proxyUrl = nodeTemplate.initialState?.bucketProxyUrl as string
        this.initialState = this.state.toImmutable() as S3ObjectInterfaceState
    }
    mutateStorage<Key extends keyof S3ObjectInterfaceState>(key: Key, value: S3ObjectInterfaceState[Key]): void {
        switch(key){
            case 'data': {
                (async() => {
                    try {
                        this.state.set('objectState', 'writing')
                        const response = await fetch(this.proxyUrl, {
                            method: 'POST',
                            body: value,
                        })
                        const responseText = await response.text()
                        this.state.set('previousUploadResponse', responseText)
                        this.state.set('objectState', 'ready')
                    } catch (error) {
                        this.state.set('objectState', 'error')   
                    }
                })()
                break
            }
            case 'objectName': {
                this.state.set('objectName', value)
                break
            }
        }
    }
    useStorage<Key extends keyof S3ObjectInterfaceState>(key: Key): S3ObjectInterfaceState[Key] {
        return null as any
        // TBD
        // return useSyncExternalStore((callback) => {
        //     const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get('state'), callback)
        //     return () => unsubscribe()
        // }, () => {
        //     const newValue = this.liveIndexNode.get('state').toImmutable()[key as string]
        //     return isEqual(this.lastStorageValues[key], newValue) 
        //         ? this.lastStorageValues[key] 
        //         : this.lastStorageValues[key] = newValue as State[Key]
        // } )
    }
}

