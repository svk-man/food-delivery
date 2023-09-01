export interface IAxiosError {
    code: string;
    duplicateValue: string;
    field: string;
    message: string;
}
export interface IAxiosResponse {
    code: string;
    config: object;
    message: string;
    name: string;
    request: object;
    response: {
        config: object;
        data: {
            errors: IAxiosError[];
            message: string;
            statusCode: number;
        };
        headers: object;
        request: object;
        status: number;
        statusText: string;
    };
}
