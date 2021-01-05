import { Orchestrator } from "src/app-lib/config/Orchestrator";

export class AccountInformationUIModel {
    AccountId: string;
    AccountName: string;
    RoleId: string;
    RoleName: string;
    FeatureSet: Array<string>;
    AllowedFeatures: Array<string>;
    DeniedFeatures: Array<string>;

    private accountIconName: string;
    public set AccountIconName(value: string) {

        if (!value) {
            this.accountIconName = 'AC'
            return;
        }

        let arr = value.split(" ");
        var str: string;
        if (arr.length > 1) {
            str = arr[0][0] + arr[1][0];
        }
        else if (arr.length == 1) {
            str = arr[0][0] + arr[0][1];
        }
        this.accountIconName = str.toUpperCase();
    }
    public get AccountIconName(): string {
        return this.accountIconName;
    }

    constructor(data: any) {
        this.AccountId = data.accountId;
        this.AccountName = data.accountName;
        this.AccountIconName = data.accountName;
        this.RoleId = data.roles[0].entityId;
        this.RoleName = data.roles[0].entityName;
        this.FeatureSet = data.featureSet;
        this.AllowedFeatures = data.allowedFeatures;
        this.DeniedFeatures = data.deniedFeatures;
    }
}

export class BaseAccountInformationUIModel {
    AccountList: AccountInformationUIModel[];
    constructor(data: any) {
        this.AccountList = [];
        data.forEach(element => {
            this.AccountList.push(new AccountInformationUIModel(element));
        });
    }
}

export class UserBasicInfoUIModel {
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

    constructor(data: any, selectedAccountObj: any) {
        this.UserId = data.userId
        this.Username = data.username;
        this.Name = data.name;
        this.IconName = data.name;
        this.ProfilePicture = data.profilePicture;
        this.UserImage = data.profilePicture + '&default=transparent&size=medium';
        this.Email = data.email;
        this.PhoneNumber = data.phoneNumber;
        this.Gender = data.gender;

        this.AccountId = selectedAccountObj.AccountId;
        this.AccountName = selectedAccountObj.AccountName;
        this.RoleName = selectedAccountObj.RoleName;
        this.FeatureSet = selectedAccountObj.FeatureSet;
        this.AllowedFeatures = selectedAccountObj.AllowedFeatures;
        this.DeniedFeatures = selectedAccountObj.DeniedFeatures;
    }

    public iconName: string;
    public set IconName(value: string) {
        let arr = value.split(" ");
        var str: string;
        if (arr.length > 1) {
            str = arr[0][0] + arr[1][0];
        }
        else if (arr.length == 1) {
            str = arr[0][0] + arr[0][1];
        }
        this.iconName = str.toUpperCase();
    }
    public get IconName(): string {
        return this.iconName;
    }
}