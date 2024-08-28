export type Supplier<T> = T | (() => T);

export const Supplier = {
    get: <T>(supplier: Supplier<T>): T => {
        if (typeof supplier === "function") {
            return (supplier as () => T)();
        } else {
            return supplier;
        }
    },
};
