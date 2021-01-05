import { RequestType, ConnectionType, APIVersion } from "./Enums";

export interface IAPIOptions {

    ConnectionType?: ConnectionType;

    APIVersion?: APIVersion;

    ResourceID?: string | number;

    SubResourceID?: string | number;
    
    Parameters?: Map<string, any>;
    
    Headers?: Map<string, string>;
    
    Body?: string | { [index: string]: string } | FormData;

}

export interface IHttpRequest {

    RequestedURL: string;

    RequestedMethod: RequestType;

    RequestedBody?: string | { [index: string]: string } | FormData | Blob;

    RequestedHeaders?: Map<string, string>;

    RequestedContentType?: string;

}