import { BehaviorSubject } from "rxjs";
import { HttpStatusCode } from "src/lib/APIService/Shared/Utility/Enums";
import * as CryptoJS from 'crypto-js';
import { ViewStateEnum } from "src/app/shared/Enums/Enums";

export abstract class BaseAppHandler {

    private rpSK: string = "3skGhse9q7GbXiRaoT34XA==";

    private defaultStatusCodeMap: Map<HttpStatusCode, Array<string>>;

    constructor() {
        this.defaultStatusCodeMap = new Map<HttpStatusCode, Array<string>>([
            [0, ["No Internet Connection", ""]],
            [204, ["No content found.", ""]],
            [400, ["The API request is invalid or improperly formed.", "401-403img.png"]],
            [401, ["The user is not authorized to make the request.", "401-403img.png"]],
            [403, ["The requested operation is forbidden and cannot be completed.", "401-403img.png"]],
            [404, ["The requested operation failed because a resource associated with the request could not be found.", "401-403img.png"]],
            [500, ["The request failed due to an internal error.", "500img.png"]]
        ]);

    }

    private isLoading = new BehaviorSubject<boolean>(false);
    public get IsLoading(): BehaviorSubject<boolean> {
        return this.isLoading;
    }
    public set IsLoading(isLoading: BehaviorSubject<boolean>) {
        this.isLoading = isLoading;
    }

    private statusCode = new BehaviorSubject<HttpStatusCode>(null);
    public get StatusCode(): BehaviorSubject<HttpStatusCode> {
        return this.statusCode;
    }
    public set StatusCode(value: BehaviorSubject<HttpStatusCode>) {
        this.statusCode = value;
    }

    private message = new BehaviorSubject<string>(null);
    public get Message(): BehaviorSubject<string> {
        return this.message;
    }
    public set Message(value: BehaviorSubject<string>) {
        this.message = value;
    }

    private isToLoadErrorContent = new BehaviorSubject<boolean>(false);
    public get IsToLoadErrorContent(): BehaviorSubject<boolean> {
        return this.isToLoadErrorContent;
    }
    public set IsToLoadErrorContent(value: BehaviorSubject<boolean>) {
        this.isToLoadErrorContent = value;
    }

    private errorImageName = new BehaviorSubject<string>(null);
    public get ErrorImageName(): BehaviorSubject<string> {
        return this.errorImageName;
    }
    public set ErrorImageName(value: BehaviorSubject<string>) {
        this.errorImageName = value;
    }

    /**
     * This function handle all success code.
     * @param successStatusCode It contains success status codes.
     * @param successMessage It contains success message if found.
     */
    protected handleSuccess(successStatusCode: HttpStatusCode,
        successMessage?: string): void {

        this.StatusCode.next(successStatusCode);

        this.IsToLoadErrorContent.next(true);

        let defaultValue: string = "Something's just not right.";
        let image: string;

        if (this.defaultStatusCodeMap.has(successStatusCode)) {
            defaultValue = this.defaultStatusCodeMap.get(successStatusCode)[0];
            image = this.defaultStatusCodeMap.get(successStatusCode)[1] ?
                this.defaultStatusCodeMap.get(successStatusCode)[1] : null;
        }
        let errMsg = defaultValue;
        if (successMessage)
            errMsg = CryptoJS.AES.decrypt(successMessage, this.rpSK).toString(CryptoJS.enc.Utf8);

        this.Message.next(errMsg);
        this.ErrorImageName.next(image);
    }

    /**
     * This function handle all error code.
     * @param errorStatusCode It contains status code
     * @param errorMessage It contains error message if found.
     * @param triggerToast This parameter decides whether to
     * show toast or not.
     */
    protected handleError(errorStatusCode: HttpStatusCode,
        errorMessage?: string,
        triggerToast: boolean = false): void {

        this.StatusCode.next(errorStatusCode);

        this.IsToLoadErrorContent.next(true);

        let defaultValue: string = "Something's just not right.";
        let image: string;

        if (this.defaultStatusCodeMap.has(errorStatusCode)) {
            defaultValue = this.defaultStatusCodeMap.get(errorStatusCode)[0];
            image = this.defaultStatusCodeMap.get(errorStatusCode)[1];
        }

        let errMsg = defaultValue;

        if (errorMessage)
            errMsg = CryptoJS.AES.decrypt(errorMessage, this.rpSK).toString(CryptoJS.enc.Utf8) ? CryptoJS.AES.decrypt(errorMessage, this.rpSK).toString(CryptoJS.enc.Utf8) : defaultValue;

        this.Message.next(errMsg);
        this.ErrorImageName.next(image);
    }

    protected parseError(errorStatusCode: HttpStatusCode, errorMessage?: string) {

        let defaultValue: string = "Something's just not right.";

        return { visualState: ViewStateEnum.Error, errorMessage: "" }

    }
}