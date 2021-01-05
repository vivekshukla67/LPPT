import { IHttpRequest } from "../Shared/Utility/ComponentModels";
import { BaseAPIResponse } from "../Models/BaseAPIResponse";
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as commonHttp from '@angular/common/http';
import { IFetchToken } from "src/lib/APIService/IOAuthProvider";
import { RequestType } from "../Shared/Utility/Enums";

import * as CryptoJS from 'crypto-js';

export interface IAPICaller {

    /**
     * This fires up the API call. Attaches the oAuth token as well. In case the 
     * token received is null, the Authorization header is ignored.
     * @param httpRequest The components of a request that can will be used to generate 
     * and trigger the request
     * @param oauthOverride This is an optional parameter that provides an oAuth override. 
     * Pass Null (to use the default oAuth configured on SDK init), pass custom for different ops.
     */
    MakeAPICall<TModel>(httpRequest: IHttpRequest, oauthOverride?: IFetchToken): Promise<BaseAPIResponse<TModel>>;
}

export class APICallerViaProxy implements IAPICaller {

    private readonly httpClientObject: HttpClient;

    private readonly fetchToken: IFetchToken;

    constructor(httpClient: HttpClient, oAuth?: IFetchToken) {
        this.httpClientObject = httpClient;
        // !oAuth handles undefined and null
        this.fetchToken = !oAuth ? null : oAuth;
    }

    async MakeAPICall<TModel>(httpRequest: IHttpRequest, oauthOverride?: IFetchToken,
        isCursed: boolean = false): Promise<BaseAPIResponse<TModel>> {

        let getToken: IFetchToken = this.fetchToken;

        if (oauthOverride)
            getToken = oauthOverride;

        // if (!httpRequest.RequestedURL.includes("oauth/token"))
        let token: String = getToken ? await getToken(isCursed) : null;
        var requestHeaders: { [index: string]: string } = {}

        // only continue if there are any headers to send.
        if (httpRequest.RequestedHeaders != undefined)
            httpRequest.RequestedHeaders.forEach((value, key) => {
                requestHeaders[key] = value
            });

        if (token != null) {
            // TODO: add Authorization header to the request
            requestHeaders['Authorization'] = "bearer " + token;
        }

        try {
            let apiResponse: BaseAPIResponse<TModel> = await this._makeProxyPostRequest(httpRequest, requestHeaders,
                httpRequest.RequestedBody);
            return apiResponse;
        }
        catch (Error) {

            if (Error.status == 401) {
                // To avoid recursion loop through. So that it performs action only once
                if (isCursed) {
                    throw Error;
                }
                await this.MakeAPICall(httpRequest, oauthOverride, true);
            }
            throw Error;
        }
    }

    private async _makeProxyPostRequest<T>(httpRequest: IHttpRequest, requestHeaders: { [index: string]: string }, body: FormData | Blob | string | { [index: string]: string }): Promise<BaseAPIResponse<T>> {

        let requestPayload = httpRequest.RequestedBody == null || httpRequest.RequestedBody == undefined ?
            null : httpRequest.RequestedBody

        let requestBody = {
            methodType: RequestType[httpRequest.RequestedMethod],
            url: encodeURI(httpRequest.RequestedURL),
            header: requestHeaders,
            contentType: httpRequest.RequestedContentType,
            payload: requestPayload,
            enableEncryption: true
        }
        console.log(requestBody);
        var cipherPayLoad = CryptoJS.AES.encrypt(JSON.stringify(requestBody).trim   (), "3skGhse9q7GbXiRaoT34XA==").toString();

        // "http://localhost/ANCHOR-Proxy-APIs/anchor_proxy_api_v2_1/service.php"
        // "https://anchor.mapmyindia.com/anchor_proxy_api_v2_1/service.php"
        //https://anchor.mapmyindia.com

        var response = await this.httpClientObject.post("https://anchor.mapmyindia.com/anchor_proxy_api_v2_1/service.php", cipherPayLoad, {
        // var response = await this.httpClientObject.post("http://localhost:80/anchor_proxy_api_v2_1/service.php", cipherPayLoad, {
            observe: 'response',
            reportProgress: false,
            responseType: 'text',
            withCredentials: false
        }).toPromise();
        try {
            if(response.body != null){
            var decryptedResponseBody = CryptoJS.AES.decrypt(response.body, "3skGhse9q7GbXiRaoT34XA==").toString(CryptoJS.enc.Utf8).trim();
            }
            else
            var decryptedResponseBody = null;
        }
        catch (Error) {
            console.log(Error) 
        }

        let returnable: BaseAPIResponse<T> = {
            ResponseCode: response.status,
            ResponseMessage: response.headers.get('message') ? response.headers.get('message') : '',
            ResponseData: decryptedResponseBody ? JSON.parse(decryptedResponseBody) : '',
            ResourceLocation: response.headers.get('sharedURL') ? response.headers.get('sharedURL') : '',
            UserProfile: response.headers.get('userProfile') ? response.headers.get('userProfile') : ''
        }
        return returnable;
    }

}