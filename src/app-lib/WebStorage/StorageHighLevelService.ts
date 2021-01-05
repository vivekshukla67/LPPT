import { IStorageHelper, StorageStrategyEnum } from "./Helpers/IStorageHelper";
import { StorageHelper } from "./Helpers/StorageHelper";

export class StorageHighLevelService {

    private static _instance = new StorageHighLevelService();

    private _storageHelper: IStorageHelper;

    private _userInfo: IUserInfo;

    private _sessionInfo: ISessionStorage;

    private _createPasswordUrl: ICreatepasswordUrl;

    private _username: IUsername;

    private _recent: IRecent;

    constructor() {
        this._storageHelper = new StorageHelper();
        StorageHighLevelService._instance = this;
    }

    public static GetInstance() {
        return this._instance;
    }

    /**
    * Get data from localStorage if exists
    */
    get UserInfo(): IUserInfo {
        if (!this._userInfo)
            this._userInfo = this._storageHelper.Read("uPd", null, StorageStrategyEnum.LocalStorage);

        return this._userInfo;
    }
    set UserInfo(value: IUserInfo) {
        this._storageHelper.Write("uPd", value, StorageStrategyEnum.LocalStorage);
    }

    /**
     * Get Session Storage
     */
    get SessionStorage(): ISessionStorage {
        if (!this._sessionInfo)
            this._sessionInfo = this._storageHelper.Read("sSt", null, StorageStrategyEnum.LocalStorage);

        return this._sessionInfo;
    }

    get Username(): IUsername {
        if (!this._username)
            this._username = this._storageHelper.Read("uN", null, StorageStrategyEnum.LocalStorage);

        return this._username;
    }
    set Username(value: IUsername) {
        this._storageHelper.Write("uN", value, StorageStrategyEnum.LocalStorage);
    }

 /**
    * Get Recents from localStorage if exists
    */
    get Recent(): IRecent {
        if (!this._recent)
            this._recent = this._storageHelper.Read("rec", null, StorageStrategyEnum.LocalStorage);

        return this._recent;
    }
    set Recent(value: IRecent) {
        this._storageHelper.Write("rec", value, StorageStrategyEnum.LocalStorage);
    }

}

export interface IUserInfo {
    UserId: string;
    Username: string;
    Name: string
    ProfilePicture: string;
    Email: string;
    PhoneNumber: string;
    Gender: string;
    UserImage: string;
    AccountId: string;
    AccountName: string;
    RoleName: string;
    FeatureSet: Array<string>;
    AllowedFeatures: Array<string>;
    DeniedFeatures: Array<string>;
}

export interface ISessionStorage {
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    project_code: string;
}

export interface ICreatepasswordUrl {
    url: string;
}

export interface IUsername {
    username: string;
}

export interface IRecent{
    recent: string;
}