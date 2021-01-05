import { Injectable } from '@angular/core';
import { BaseAppHandler } from 'src/app-lib/shared/BaseViewModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageHelper } from 'src/app-lib/WebStorage/Helpers/StorageHelper';
import { BehaviorSubject } from 'rxjs';
import { HttpStatusCode, ConnectionType, APIVersion, RequestType } from 'src/lib/APIService/Shared/Utility/Enums';
import { IStorageHelper, StorageStrategyEnum } from 'src/app-lib/WebStorage/Helpers/IStorageHelper';
import { IAccessCredentials } from 'src/lib/OAuthService/Service/OAuthService';
import { Orchestrator } from 'src/app-lib/config/Orchestrator';
import { IAPIOptions } from 'src/lib/APIService/Shared/Utility/ComponentModels';
import { ConcreteUserProfileBuilder, ConcreteUserAccountBuilder } from '../Builder/AppBuilder';
import { IUserInfo, StorageHighLevelService } from 'src/app-lib/WebStorage/StorageHighLevelService';
import { UserBasicInfoUIModel, AccountInformationUIModel, BaseAccountInformationUIModel } from '../Models/AppRootUIModel';

@Injectable({
    providedIn: 'root'
})
export class AppRootVM extends BaseAppHandler {

    public userProfile = new BehaviorSubject<any>(null);
    private token: string;
    public userProfileData: any;
    public userProfileCode = new BehaviorSubject(HttpStatusCode.OK);
    private storageHelper: IStorageHelper;
    private credentialsStore = {
        ClientID: 'A5TAhdihjT3vDZfjZqfhz9bgjA3ppCt1GP8bjC97oZNfx6eYefsYPtvXma1AZ0Zny8wdnNBVwJg=',
        ClientSecret: '7Gv2Lra5UJVgI1DcIT6XWtmgDhtJBe4M1HUz_LHkuBxbjMSxG3OhY0tk-_2kQccTG803B71XeVUx-Vq5GUH29g==',
        AuthBasic: 'Basic QTVUQWhkaWhqVDN2RFpmalpxZmh6OWJnakEzcHBDdDFHUDhiakM5N29aTmZ4NmVZZWZzWVB0dlhtYTFBWjBabnk4d2RuTkJWd0pnPTo3R3YyTHJhNVVKVmdJMURjSVQ2WFd0bWdEaHRKQmU0TTFIVXpfTEhrdUJ4YmpNU3hHM09oWTB0ay1fMmtRY2NURzgwM0I3MVhlVlV4LVZxNUdVSDI5Zz09',
    }

    constructor(private httpClient: HttpClient,
        private router: Router) {
        super();
        this.storageHelper = new StorageHelper();
    }

    private selectedModuleNm: string;
    public get SelectedModuleNm(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.selectedModuleNm);
    }
    public set SelectedModuleNm(value: BehaviorSubject<string>) {
        this.selectedModuleNm = value.getValue();
    }

    private headerName: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public get HeaderName(): BehaviorSubject<boolean> {
        return this.headerName;
    }
    public set HeaderName(value: BehaviorSubject<boolean>) {
        this.headerName.next(value as any);
    }

    public async AppInitialization() {

        let accessCreds: IAccessCredentials = {
            ClientID: this.credentialsStore.ClientID,
            ClientSecret: this.credentialsStore.ClientSecret,
            AuthBasic: this.credentialsStore.AuthBasic,
        }

        let paramsString = window.location.href.split('?')[1];

        let params: URLSearchParams = paramsString ? new URLSearchParams(paramsString) : null;

        if (params && params.get("code")) {
            accessCreds.OAuthCode = params.get("code");
            accessCreds.RedirectUrl = this.returnRedirectURL();
        }

        try {
            Orchestrator.GetInstance().Initialize(this.httpClient, null, accessCreds, true, this.storageHelper);

            // throwing an exception just to maintain code flow for navigate to log-in
            // throw new Error();

        } catch (Error) {
            localStorage.clear();
            this.navigateToSingleLogin();
        }
    }

    public async navigateToSingleLogin() {
        let redirectURL: string = await this.returnRedirectURL();
        let url: string = "https://outpost.mapmyindia.com/api/security/v4.0.0/oauth/authorize?response_type=code&client_id="
            + this.credentialsStore.ClientID + "&redirect_uri=" + redirectURL;

        window.location.href = url;
    }

    private returnRedirectURL() {
        let baseURL: string = window.location.origin;
        let pathName: string = window.location.pathname.replace(/\/$/, "");

        let url: string = baseURL + pathName;
        return url;
    }
}