import { RequestType, APIVersion, ConnectionType } from "../Shared/Utility/Enums";
import { IAPIOptions, IHttpRequest } from "../Shared/Utility/ComponentModels";
import { IURLBuilder, URLCreator } from "../Builder/IURLBuilder";

export interface IRequestFactory {
    getOfType(requestType: RequestType): IRequestGenerator;
}

export class RequestFactory implements IRequestFactory {

    getOfType(requestType: RequestType): IRequestGenerator {

        switch (requestType) {

            case RequestType.GET:
                return new GetRequestGenerator();
            case RequestType.POST:
                return new PostRequestGenerator();
            case RequestType.PUT:
                return new PutRequestGenerator();
            case RequestType.DELETE:
                return new DeleteRequestGenerator();
            default:
                throw new Error(requestType + " requestType you are looking for not yet implemented")
        }

    }
}

export interface IRequestGenerator {
    generate(URLBuilder: IURLBuilder, APIOptions: IAPIOptions): Promise<IHttpRequest>;
}

class GetRequestGenerator implements IRequestGenerator {

    async generate(URLBuilder: IURLBuilder, options: IAPIOptions): Promise<IHttpRequest> {

        var director = new URLCreator(URLBuilder);

        var connectionType = options != undefined && options.ConnectionType != undefined ? options.ConnectionType : ConnectionType.https;
        var apiVersion: APIVersion = options != undefined && options.APIVersion != undefined ? options.APIVersion : APIVersion.LatestStable;
        var resourceID: string | number = options && options.ResourceID ? options.ResourceID : undefined;
        var subResourceID: string | number = options && options.SubResourceID ? options.SubResourceID : undefined;
        var parameters: Map<string, any> = options && options.Parameters ? options.Parameters : undefined;
        var headers: Map<string, string> = options && options.Headers ? options.Headers : undefined;

        // Generate the URL using the parameters and IDs
        director.CreatURL(connectionType, apiVersion, resourceID, subResourceID, parameters);

        // fetch the final created URL.
        var finalURL = director.GetURL();

        // Return the HTTP object. All parameters are embedded in the URL itself.
        return {
            RequestedURL: finalURL,
            RequestedMethod: RequestType.GET,
            RequestedHeaders: headers
        }
    }
}

class PostRequestGenerator implements IRequestGenerator {

    async generate(URLBuilder: IURLBuilder, options: IAPIOptions): Promise<IHttpRequest> {

        var director = new URLCreator(URLBuilder);

        var connectionType = options != undefined && options.ConnectionType != undefined ? options.ConnectionType : ConnectionType.https;
        var apiVersion: APIVersion = options != undefined && options.APIVersion != undefined ? options.APIVersion : APIVersion.LatestStable;
        var resourceID: string | number = options && options.ResourceID ? options.ResourceID : undefined;
        var subResourceID: string | number = options && options.SubResourceID ? options.SubResourceID : undefined;
        var parameters: Map<string, any> = options && options.Parameters ? options.Parameters : undefined;
        var headers: Map<string, string> = options && options.Headers ? options.Headers : undefined;
        var contentType: string = headers != undefined && headers.has('Content-Type') ? contentType = headers.get('Content-Type') : undefined;
        var body: string | { [index: string]: string } | FormData = options != undefined && options.Body != undefined ? options.Body : undefined;

        // Generate the URL using the parameters and IDs
        director.CreatURL(connectionType, apiVersion, resourceID, subResourceID, parameters);

        // fetch the final created URL.
        var finalURL = director.GetURL();

        // Return the HTTP object. All parameters are embedded in the URL itself.
        return {
            RequestedURL: finalURL,
            RequestedMethod: RequestType.POST,
            RequestedHeaders: headers,
            RequestedBody: body
        }
    }
}

class PutRequestGenerator implements IRequestGenerator {

    async generate(URLBuilder: IURLBuilder, options: IAPIOptions): Promise<IHttpRequest> {

        var director = new URLCreator(URLBuilder);

        var connectionType = options != undefined && options.ConnectionType != undefined ? options.ConnectionType : ConnectionType.https;
        var apiVersion: APIVersion = options != undefined && options.APIVersion != undefined ? options.APIVersion : APIVersion.LatestStable;
        var resourceID: string | number = options && options.ResourceID ? options.ResourceID : undefined;
        var subResourceID: string | number = options && options.SubResourceID ? options.SubResourceID : undefined;
        var parameters: Map<string, any> = options && options.Parameters ? options.Parameters : undefined;
        var headers: Map<string, string> = options && options.Headers ? options.Headers : undefined;
        var contentType: string = headers != undefined && headers.has('Content-Type') ? contentType = headers.get('Content-Type') : undefined;
        var body: string | { [index: string]: string } | FormData = options != undefined && options.Body != undefined ? options.Body : undefined;

        // Generate the URL using the parameters and IDs
        director.CreatURL(connectionType, apiVersion, resourceID, subResourceID, parameters);

        // fetch the final created URL.
        var finalURL = director.GetURL();

        // Return the HTTP object. All parameters are embedded in the URL itself.
        return {
            RequestedURL: finalURL,
            RequestedMethod: RequestType.PUT,
            RequestedHeaders: headers,
            RequestedBody: body
        }
    }
}

class DeleteRequestGenerator implements IRequestGenerator {

    async generate(URLBuilder: IURLBuilder, options: IAPIOptions): Promise<IHttpRequest> {

        var director = new URLCreator(URLBuilder);

        var connectionType = options != undefined && options.ConnectionType != undefined ? options.ConnectionType : ConnectionType.https;
        var apiVersion: APIVersion = options != undefined && options.APIVersion != undefined ? options.APIVersion : APIVersion.LatestStable;
        var resourceID: string | number = options && options.ResourceID ? options.ResourceID : undefined;
        var subResourceID: string | number = options && options.SubResourceID ? options.SubResourceID : undefined;
        var parameters: Map<string, any> = options && options.Parameters ? options.Parameters : undefined;
        var headers: Map<string, string> = options && options.Headers ? options.Headers : undefined;
        var contentType: string = headers != undefined && headers.has('Content-Type') ? contentType = headers.get('Content-Type') : undefined;
        var body: string | { [index: string]: string } | FormData = options != undefined && options.Body != undefined ? options.Body : undefined;

        // Generate the URL using the parameters and IDs
        director.CreatURL(connectionType, apiVersion, resourceID, subResourceID, parameters);

        // fetch the final created URL.
        var finalURL = director.GetURL();

        // Return the HTTP object. All parameters are embedded in the URL itself.
        return {
            RequestedURL: finalURL,
            RequestedMethod: RequestType.DELETE,
            RequestedHeaders: headers,
            RequestedBody: body
        }
    }
}