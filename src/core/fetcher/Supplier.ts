/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
export type Supplier<T> = T | (() => T);

export const Supplier = {
    get: <T>(supplier: Supplier<T>): T => {
        if (typeof supplier === "function") {
            return (supplier as () => T)();
        } else {
            return supplier;
        }
    },
    map: <T, U, R = U>(supplier: Supplier<T>, f: (value: T) => R): Supplier<R> => {
        if (typeof supplier === "function") {
            return () => f(Supplier.get(supplier));
        } else {
            return f(supplier);
        }
    },
};
