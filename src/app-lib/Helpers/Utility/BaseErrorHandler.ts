import * as CryptoJS from 'crypto-js';

export abstract class BaseErrorHandler {
    private static rpSK: string = "3skGhse9q7GbXiRaoT34XA==";
    private static defaultStatusCodeMap: Map<number, Array<string>>;

    constructor() {
        BaseErrorHandler.defaultStatusCodeMap = new Map<number, Array<string>>([
            [0, ["No Internet Connection", ""]],
            [204, ["No content found.", ""]],
            [400, ["The API request is invalid or improperly formed.", "401-403img.png"]],
            [401, ["The user is not authorized to make the request.", "401-403img.png"]],
            [403, ["The requested operation is forbidden and cannot be completed.", "401-403img.png"]],
            [404, ["The requested operation failed because a resource associated with the request could not be found.", "401-403img.png"]],
            [500, ["The request failed due to an internal error.", "500img.png"]]
        ]);
    }

    protected static parseError(errorStatusCode: number, errorMessage?: string) {

        let defaultValue: string = "Something's just not right.";

        if (this.defaultStatusCodeMap.has(errorStatusCode)) {
            defaultValue = this.defaultStatusCodeMap.get(errorStatusCode)[0];
        }

        let errMsg = defaultValue;
        if (errorMessage && CryptoJS.AES.decrypt(errorMessage, this.rpSK).toString(CryptoJS.enc.Utf8))
            errMsg = CryptoJS.AES.decrypt(errorMessage, this.rpSK).toString(CryptoJS.enc.Utf8);

        return { errorMessage: errMsg }
    }

    protected static parseErrorImage(errStatusCode: number) {

        let defaultImg: string = null;

        if (this.defaultStatusCodeMap.has(errStatusCode))
            defaultImg = this.defaultStatusCodeMap.get(errStatusCode)[1];

        return { img: defaultImg };
    }

}