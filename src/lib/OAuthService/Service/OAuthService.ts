import { RequestType, HttpStatusCode } from "src/lib/APIService/Shared/Utility/Enums";
import { IHttpRequest } from "src/lib/APIService/Shared/Utility/ComponentModels";
import { IMakeAPICallProvider } from "src/lib/OAuthService/IMakeAPICallProvider";
import { BaseAPIResponse } from "src/lib/APIService/Models/BaseAPIResponse";
import { StorageStrategyEnum } from "../Helpers/Enums";
import { md5 } from "src/lib/Helpers/MD5";
import { IApplicationStorage } from "src/lib/OAuthService/Models/OAuthModels";

export interface IAccessCredentials {

    ClientID: string;

    ClientSecret: string;

    AuthBasic: string;

    UserName?: string;

    Password?: string;

    OAuthCode?: string;

    RedirectUrl?: string;
}

export interface ISessionStorage {
    token_type: string;

    refresh_token: string;

    expires_in: number;

    scope: string;

    project_code: string;
}

export interface IToken {
    access_token: string;
    expires_after: number
}

export interface IOAuthService {

    getToken(avoidCache?: boolean): Promise<string>;

}

interface OAuthArguments {
    client_id: string;
    client_secret: string;
    auth_basic: string;
    username?: string;
    password?: string;
    refresh_token?: string;
    code?: string;
    redirect_uri?: string;
}

export class OAuthService implements IOAuthService {

    private readonly _apiCaller: IMakeAPICallProvider;

    private readonly _accessCreds: IAccessCredentials;

    private readonly _appStorage: IApplicationStorage;

    constructor(apiCaller: IMakeAPICallProvider, accessCredentials: IAccessCredentials, appStorage: IApplicationStorage) {
        this._apiCaller = apiCaller;
        this._accessCreds = accessCredentials;
        this._appStorage = appStorage;
    }

    private sessionStorage: ISessionStorage;
    private get SessionStorage(): ISessionStorage {

        if (this.sessionStorage === null || this.sessionStorage === undefined)
            this.sessionStorage = this._appStorage ? this._appStorage.Read("sSt", null, StorageStrategyEnum.LocalStorage) : '';

        return this.sessionStorage;
    }
    private set SessionStorage(value: ISessionStorage) {
        this.sessionStorage = value;
        
        if (value === undefined || value === null) {
            this._appStorage.Remove("sSt", StorageStrategyEnum.LocalStorage);
            return;
        }
        
        this._appStorage.Write("sSt", this.sessionStorage, StorageStrategyEnum.LocalStorage);
    }

    private token: IToken;
    public get Token(): IToken {
        return this.token;
    }
    public set Token(value: IToken) {
        this.token = value;
    }

    /**
     * if access_token & validity -> return token
     * if !access_token & validity & RT -> getTokenFromRT
     * if !access_token & !validity & RT -> throw Error (No Authorization found)
     * if !access_token & !RT -> throw Error (No Authorization found)
     */
    public async getToken(avoidCache?: boolean): Promise<string> {

        if (!avoidCache && this.Token && this.Token.access_token && this.Token.expires_after > Math.floor(Date.now() / 1000))
            return this.Token.access_token;

        if (this.SessionStorage && this.SessionStorage.refresh_token) {
            return await this.GetFreshToken(
                {
                    client_id: this._accessCreds.ClientID,
                    client_secret: this._accessCreds.ClientSecret,
                    refresh_token: this.SessionStorage.refresh_token,
                    auth_basic: ""
                });
        }

        if (this._accessCreds.OAuthCode && this._accessCreds.RedirectUrl)
            return await this.GetFreshToken(
                {
                    client_id: this._accessCreds.ClientID,
                    client_secret: this._accessCreds.ClientSecret,
                    auth_basic: this._accessCreds.AuthBasic,
                    code: this._accessCreds.OAuthCode,
                    redirect_uri: this._accessCreds.RedirectUrl
                });

        return null;
    }

    public ClearTokenStore() {
        // TODO: code here!
        this.Token = null;
    }

    // public async getTokenViaCode(code: string, redirectURL: string): Promise<string> {

    //     return await this.GetFreshToken(
    //         {
    //             client_id: this._accessCreds.ClientID,
    //             client_secret: this._accessCreds.ClientSecret,
    //             auth_basic: this._accessCreds.AuthBasic,
    //             code: code,
    //             redirect_uri: redirectURL
    //         });
    // }


    private async GetFreshToken(args: OAuthArguments) {

        if (!args.client_id || !args.client_secret)
            throw new Error("The clientId or clientSecret cannot be null or empty");

        args["grant_type"] = "client_credentials";

        let oAuthUrl = "https://outpost.mapmyindia.com/api/security/oauth/token";

        let requestHeaders: Map<string, string> = new Map([
            ['Content-Type', 'application/x-www-form-urlencoded']
        ])

        if (args.code) {
            args["grant_type"] = "authorization_code";
            oAuthUrl = "https://outpost.mapmyindia.com/api/security/v4.0.0/oauth/token";
            requestHeaders.set("Authorization", args.auth_basic);
        }

        else if (args.refresh_token)
            args["grant_type"] = "refresh_token";

        else if (args.username && args.password) {
            args["grant_type"] = "password";
            args["password"] = md5(args["password"])
        }

        let formBody = [];
        for (var key in args) {
            if (!args[key])
                continue;

            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(args[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        let requestPayload = formBody.join('&');

        let request: IHttpRequest = {
            RequestedURL: oAuthUrl,
            RequestedMethod: RequestType.POST,
            RequestedHeaders: new Map([
                ['Content-Type', 'application/x-www-form-urlencoded'],
            ]),
            RequestedBody: requestPayload
        }

        // we pass in the lambda to that provides null token so that API service doesn't go crazy! 
        // let avoidToken: IFetchToken = (avoidCache?: boolean)=> null // to disable oauth
        let apiResponse = await this._apiCaller(request, (avoidCache?: boolean)=> null)

        if (apiResponse.ResponseCode === HttpStatusCode.OK) {
            this.SessionStorage = this.sessionStorageFactory(apiResponse.ResponseData);
            this.Token = {
                access_token: apiResponse.ResponseData["access_token"],
                expires_after: (Math.floor(Date.now() / 1000)) + (apiResponse.ResponseData["expires_in"])
            };
        }

        return this.Token.access_token;
    }

    private sessionStorageFactory(sessionStorage: ISessionStorage): ISessionStorage {
        return {
            expires_in: (Math.floor(Date.now() / 1000)) + (sessionStorage.expires_in),
            project_code: sessionStorage.project_code,
            refresh_token: sessionStorage.refresh_token,
            scope: sessionStorage.scope,
            token_type: sessionStorage.token_type
        }
    }
}