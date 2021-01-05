import { HttpClient, HttpRequest } from "@angular/common/http";
import { IMakeAPICallProvider } from "src/lib/OAuthService/IMakeAPICallProvider";
import { IURLBuilder } from "src/lib/APIService/Builder/IURLBuilder";
import { IAPIOptions, IHttpRequest } from "src/lib/APIService/Shared/Utility/ComponentModels";
import { RequestType } from "src/lib/APIService/Shared/Utility/Enums";
import { BaseAPIResponse } from "src/lib/APIService/Models/BaseAPIResponse";
import { APICallerViaProxy, IAPICaller } from "src/lib/APIService/Service/APIService";
import { IRequestGenerator, RequestFactory, IRequestFactory } from "src/lib/APIService/RequestFactory/RequestFactory";
import { StorageHelper } from "../WebStorage/Helpers/StorageHelper";
import { OAuthService, IOAuthService, IAccessCredentials } from "src/lib/OAuthService/Service/OAuthService";
import { IFetchToken } from "src/lib/APIService/IOAuthProvider";
import { IStorageHelper } from "../WebStorage/Helpers/IStorageHelper";

export class Orchestrator {

    private static _instance = null;

    private readonly _requestFactory: IRequestFactory = null;

    private _tokenFetcher: IFetchToken = null;

    private _apiService: IAPICaller = null;

    private constructor() {
        this._requestFactory = new RequestFactory();
    }

    public static GetInstance(): Orchestrator {
        if (this._instance == null)
            this._instance = new Orchestrator();
        return this._instance;
    }

    /**
     * This Initializes the `APIServiceInitialize` & `OAuthServiceInitialize`
     * `APIServiceInitialize` method set up `httpClient` to make API call and
     * `provider` to make API call secured 
     * @param httpClient The components of a request that can will be used to generate
     * and trigger the request It's injected via Angular.
     * @param provider This parameter provides an oAuth override.
     * Pass Null (to use the default oAuth configured on SDK init), pass custom for different ops.
     * @param accessCredentials This parameter is used to initialize `OAuthServiceInitialize`
     * If pass Null then throws exception `accessCredentials should not be Null`
     * @param apiProvider This parameter is passed to provide access to `OAuthService`
     * to make API call (and to break circular dependency between `APIService` & `OAuthService`)
     * @param useProxy This parameter is used to identify, either to make API call
     * via `Proxy` or normal `HTTP Request`
     */
    public Initialize(httpClient: HttpClient, customOAuth: IOAuthService,
        accessCredentials: IAccessCredentials, useProxy: boolean = true, storageHelper: IStorageHelper) {

        this._apiService = useProxy ? new APICallerViaProxy(httpClient) : null;

        if (this._apiService == null)
            throw new Error("Could not initialize _apiService: Found Null!")

        let apiCaller: IMakeAPICallProvider = (httpRequest, oAuthOverride?) => this._apiService.MakeAPICall(httpRequest, oAuthOverride);

        let defaultAuth: IOAuthService = customOAuth ? customOAuth : new OAuthService(apiCaller, accessCredentials, storageHelper);

        this._tokenFetcher = (avoidCache = false) => defaultAuth.getToken(avoidCache)
        // (avoidCache?: boolean)=> null //to disable oauth

        this._apiService = useProxy ? new APICallerViaProxy(httpClient, this._tokenFetcher) : null;

    }

    /**
     * 
     * @param builder This parameter is to set the base for the URL
     * @param apiOptions This parameter is to set the optional parameter for the URL
     * @param requestType This parameter is for the type of request that has to be 
     * triggered `GET, PUT, POST, DELETE`
     * @param useProxy This parameter decides whether to trigger API request with
     * `proxy` or without `proxy`
     * @param oAuthOverride This parameter provides an oAuth override.
     * Pass Null (to use the default oAuth configured on SDK init), pass custom for different ops.
     */
    public async processRequest<T>(builder: IURLBuilder, apiOptions: IAPIOptions, requestType: RequestType,
        useProxy: boolean = true, oAuthOverride: IOAuthService = undefined): Promise<BaseAPIResponse<T>> {
        let reqGen: IRequestGenerator = this._requestFactory.getOfType(requestType);

        let request: IHttpRequest = await reqGen.generate(builder, apiOptions);

        // nested if else if conditions to ensure if override is null then the null value is passed
        let oAuth: IFetchToken = oAuthOverride ? oAuthOverride.getToken : oAuthOverride == null ? null : undefined;

        return await this._apiService.MakeAPICall<T>(request, oAuth);
    }

    public async defaultProcessRequest<T>(request: IHttpRequest, useProxy: boolean = true,
        oAuthOverride: IOAuthService = undefined) {

        // nested if else if conditions to ensure if override is null then the null value is passed
        let oAuth: IFetchToken = oAuthOverride ? oAuthOverride.getToken : oAuthOverride == null ? null : undefined;

        return await this._apiService.MakeAPICall<T>(request, oAuth);
    }

    public async attachToken(requestUrl: string, avoidCache: boolean = false): Promise<string> {
        if (requestUrl && requestUrl.trim()) {
            let delimiter = requestUrl.includes("?") ? "&" : "?";
            return requestUrl + delimiter + "access_token=" + await this._tokenFetcher(avoidCache);
        }
        return null;
    }
}