export const Supplier = {
    get: (supplier) => {
        if (typeof supplier === "function") {
            return supplier();
        } else {
            return supplier;
        }
    },
};
