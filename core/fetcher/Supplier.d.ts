/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
export type Supplier<T> = T | (() => T);
export declare const Supplier: {
    get: <T>(supplier: Supplier<T>) => T;
};
