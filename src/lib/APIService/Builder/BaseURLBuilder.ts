import { IURLBuilder } from "./IURLBuilder";
import { ConnectionType, APIVersion, ResponseType } from "../Shared/Utility/Enums";
import * as Constants from "../.././../app/Helpers/Constants"

export abstract class BaseURLBuilder implements IURLBuilder {

    finalizedURL: string[] = [];

    setConnectionType(connectionType: ConnectionType): void {
        this.finalizedURL.push(`${ConnectionType[connectionType]}:/`);
    }

    setBase(): void {

        if (Constants.IsDev)
            this.finalizedURL.push(`${Constants.devBaseURL}`);
        else
            this.finalizedURL.push(`${Constants.baseURL}`);
    }


    setAPIVersion(apiVersion: APIVersion): void {
        if (apiVersion === APIVersion.LatestStable)
            return;

        this.finalizedURL.push(`${APIVersion[apiVersion].split('_').join('.')}`);
    }

    abstract generateResource(): void;

    generateResourceIdentifier(identifier: string | number): void {
        if (!identifier)
            return;

        this.finalizedURL.push(`${identifier}`);
    }

    abstract generateSubResource(): void;

    generateSubResourceIdentifier(identifier: string | number): void {
        if (!identifier)
            return;

        this.finalizedURL.push(`${identifier}`);
    }

    generateResponseType(responseType: ResponseType): void {
        if (responseType === ResponseType.None)
            return;

        this.finalizedURL.push(`${ResponseType[responseType]}?`);
    }

    setParameters(parameters: Map<string, string | number>): void {
        if (!parameters || parameters.size === 0)
            return;

        this.finalizedURL.push('?');

        var parameterString: string = ''

        let parameterKeys = Array.from(parameters.keys());

        let firstKey = Array.from(parameters.keys())[0];
        let firstValue = parameters.get(firstKey);

        parameterString += firstValue == null ? `${firstKey}` : `${firstKey}=${firstValue}`;

        if (parameterKeys.length > 1) {
            for (let i = 1; i < parameters.size; i++) {
                let iKey = parameterKeys[i];
                if (parameters.get(iKey) != null) {
                    let iValue = parameters.get(iKey);
                    parameterString += iValue == null ? `&${iKey}` : `&${iKey}=${iValue}`;
                }
            }
        }
        var regex = /=$/;
        this.finalizedURL.push(parameterString.replace(regex,""));
    }

    getRequestURL(): string {
        return this.finalizedURL.join('/').replace('/?/', '?');
    }
}