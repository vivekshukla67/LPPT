import { ResponseType, APIVersion, ConnectionType } from "../Shared/Utility/Enums";

export interface IURLBuilder {

    finalizedURL: string[];

    setConnectionType(connectionType: ConnectionType): void;

    setBase(): void;

    setAPIVersion(apiVersion: APIVersion): void;

    generateResource(): void;

    generateResourceIdentifier(resourceIdentifier: string | number | undefined): void;

    generateSubResource(): void;

    generateSubResourceIdentifier(subResourceIdentifier: string | number | undefined): void;

    generateResponseType(responseType: ResponseType): void;

    setParameters(parameters: Map<string, string | number>): void;

    getRequestURL(): string;

}

export class URLCreator {

    private readonly urlBuilder: IURLBuilder = null;

    constructor(urlBuilder: IURLBuilder) {
        this.urlBuilder = urlBuilder;
    }

    public CreatURL(connectionType?: ConnectionType,
        apiVersion?: APIVersion, resourceIdentifier?: string | number, subResourceIdentifier?: string | number,
        parameters?: Map<string, string>) {
        this.urlBuilder.setConnectionType(connectionType);
        this.urlBuilder.setBase();
        this.urlBuilder.setAPIVersion(apiVersion);
        this.urlBuilder.generateResource();
        this.urlBuilder.generateResourceIdentifier(resourceIdentifier);
        this.urlBuilder.generateSubResource();
        this.urlBuilder.generateSubResourceIdentifier(subResourceIdentifier);
        this.urlBuilder.generateResponseType(ResponseType.None);
        this.urlBuilder.setParameters(parameters);
    }

    public GetURL(): string {
        return this.urlBuilder.getRequestURL();
    }
}