export interface ServiceResponse<T>{
    content?: T;
    resourceLocation?: string;
    errorMessage?: string;
    errorImage?: string;
    isError: boolean;
    statusCode?: number;
    userProfile?: string;
}