interface FormDataRequest<Body> {
    body: Body;
    headers: Record<string, string>;
    duplex?: "half";
}
export declare function newFormData(): Promise<FormDataWrapper>;
export declare class FormDataWrapper {
    private fd;
    setup(): Promise<void>;
    append(key: string, value: unknown): void;
    private getFileName;
    private convertToBlob;
    appendFile(key: string, value: unknown, fileName?: string): Promise<void>;
    getRequest(): FormDataRequest<FormData>;
}
export {};
