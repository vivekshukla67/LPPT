export class BaseAPIResponse<T> {

    public ResponseCode?: number;
    public ResponseMessage?: string;
    public ResponseData?: any;
    public ResourceLocation?: string;
    public UserProfile?: string;

    constructor(responseCode: number, responseData: any, responseMessage?: string, resourceLocation?: string, userProfile?: string) { 

        this.ResponseCode = responseCode;
        this.ResponseData = responseData;
        this.ResponseMessage = responseMessage;
        this.ResourceLocation = resourceLocation;
        this.UserProfile = userProfile;
    }
}