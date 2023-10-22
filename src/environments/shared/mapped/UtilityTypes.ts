



export type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;
export type Tail<T extends any[]> = ((...t: T) => any) extends (h: any, ...r: infer R) => any ? R : never;
export type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true;
type Recurse<T extends any[], R>= 
    T extends [infer Head, ...infer Tail]
        ? Recurse<Tail, Head extends R ? Head : R>
        : R;
