import { IHttpRequest } from "../APIService/Shared/Utility/ComponentModels";
import { BaseAPIResponse } from "../APIService/Models/BaseAPIResponse";

export interface IMakeAPICallProvider {

    (httpRequest: IHttpRequest, oauthOverride: any): Promise<BaseAPIResponse<any>>;

}