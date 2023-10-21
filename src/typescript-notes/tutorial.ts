

// Get Tuple from Params
type Params<F extends (...args: any[]) => any> = 
    F extends (...args: infer A) => any 
    ? A 
    : never;

const fn00 = (name: string, age: number, weight: number) => true

// Get First Param
type Head<T extends any[]> =
    T extends [any, ...any[]]
    ? T[0]
    : never

// Get Last Params
type Tail<T extends any[]> =
    ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
    ? TT
    : []

// Check if Tail exists
type HasTail<T extends any[]> =
    T extends ([] | [any])
    ? false
    : true

// Tests
type params = [1, 2, string]
type test14 = HasTail<params> // true
type test15 = HasTail<Tail<params>>
type test16 = HasTail<Tail<Tail<params>>> // false

// Infer Examples
type ObjectInfer<O> = 
    O extends { a: infer A } 
    ? A  
    : never;
const object = {a: 'hello'}
type test17 = ObjectInfer<typeof object> // string
type test18 = ObjectInfer<string> // 'hello'

type FunctionInfer<F> = 
    F extends (...args: infer A) => infer R 
    ? [A, R] 
    : never;
const fn01 = (a: number, b: any) => true
type test19 = FunctionInfer<typeof fn01> // [[number, any], boolean]

type PromiseInfer<I> = 
    I extends Promise<infer G>
    ? G
    : never;
const promise = new Promise<string>(() => {})
type test20 = PromiseInfer<typeof promise> // string

type ArrayInfer<T> = 
    T extends (infer U)[]
    ? U
    : never;
const array = [0, 'data', 1, 'data']
type test21 = ArrayInfer<typeof array> // string | number

type TupleInfer<T> = 
    T extends [infer A, ...(infer B)[]]
    ? [A, B]
    : never;
type test22 = TupleInfer<[string, number, boolean]>


// Recursive Currying
type CurryV0<P extends any[], R> =
    // A "classic curry" takes only a single argument at a time
    (arg: Head<P>) => HasTail<P> extends true
        // If we did not reach the end of the parameters, recurse
        ? CurryV0<Tail<P>, R>
        // Otherwise, infer the return type of the curried function
        : R