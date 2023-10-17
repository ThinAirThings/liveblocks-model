import { NodeTemplate } from "./NodeTemplate.js"


export type RuntimeNode<T extends NodeTemplate<any>> = {
    type: T extends NodeTemplate<infer T> ? T : never
    metadata: T['metadata']
    stateDisplayKey: T['stateDisplayKey']
    create: <Type extends (T['childNodes'] extends Record<string, any> ? keyof T['childNodes']:never)>(
        type: Type, 
        initialState?: T['childNodes'] extends Record<string, any>
            ? T['childNodes'][Type]['state']
            : never
    ) => RuntimeNode<T['childNodes'] extends Record<string, any>
        ? T['childNodes'][Type]
        : never
    >
    useRead: <K extends keyof T['state']&string>(key: K) => T['state'][K]
    read: <K extends keyof T['state']&string>(key: K) => T['state'][K]
    update: <K extends keyof T['state']&string>(key: K, value: T['state'][K]) => void
    delete: () => void
}