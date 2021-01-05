import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class RegexUtil {
    constructor() { }

    public static get NAME_VALIDATION(): string { return "^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$"; };

    public static get ORGANISATION_NAME_VALIDATION(): string { return "^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$"; };

    public static get EMAIL_VALIDATION(): string { return "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"; };

    public static get VERSION_VALIDATION(): string { return "[v]*[0-9]+(\.[0-9])*"; };

    public static get PASSWORD_VALIDATION(): string { return "^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%_]).{6,20})"; };

    public static get USERNAME_VALIDATION(): string { return "^[A-Za-z0-9_.]{3,30}$"; };

    public static get PHONENUMBER_VALIDATION(): string { return "^[1-9][0-9]{9}$"; };

    public static get OTP_VALIDATION(): string { return "^[0-9]{6}$"; };

    public static get NUMBER_VALIDATION(): string { return "^[0-9]{1,10}$"; };

    public static get IPREGEX_VALIDATION(): string { return "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"; };

    public static get URL_VALIDATION(): string { return "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$"; };

    public static get URL_PARAM_VALIDATION(): string { return "^[A-Za-z0-9_]{2,10}$"; };

    public static get FLOATNUMBER_VALILDATION(): string { return "^[-+]?[0-9]+\.[0-9]+$"; };

    public static get UNIQUEID_VALIDATION(): string { return "^(([a-zA-Z]+))(([a-zA-Z]*\.)([a-zA-Z]+))*$" };

    public static get EMAIL_AND_PHONE_VALIDATION(): string { return "^([_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,}))|([1-9][0-9]{9})$" };

}