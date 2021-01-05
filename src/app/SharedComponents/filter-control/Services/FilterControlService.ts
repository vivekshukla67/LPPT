import { ServiceResponse } from "src/app/shared/Model/APIResponses";
import { BaseErrorHandler } from "src/app-lib/Helpers/Utility/BaseErrorHandler";
import { Orchestrator } from "src/app-lib/config/Orchestrator";
import { IHttpRequest } from "src/lib/APIService/Shared/Utility/ComponentModels";
import { RequestType, HttpStatusCode } from "src/lib/APIService/Shared/Utility/Enums";
import { FilterSuggestionModel } from "../Models/FilterSuggestionModel";

export interface IFilterService {
    /**
    * search header API
    * @param url 
    * @param query 
    */
    Search(url: string, query: string, subFilterParams: string): Promise<Array<FilterSuggestionModel>>;

    SearchLocal(possibleValues: Array<string | object>, query: string): Array<FilterSuggestionModel>;

}

export class FilterService extends BaseErrorHandler implements IFilterService {

    private orchestrator: Orchestrator;

    constructor() { super(); this.orchestrator = Orchestrator.GetInstance(); }


    async Search(url: string, query: string, subFilterParams: string): Promise<Array<FilterSuggestionModel>> {

        if (subFilterParams == null || subFilterParams == undefined)
            subFilterParams = '';

        let splitURL: string[] = url.split('?')

        let paramString = splitURL.length == 2 ? splitURL[1] : ''
        paramString = paramString.length == 0 ? subFilterParams : paramString + '&' + subFilterParams;
        paramString = paramString.replace("query=", "query=" + encodeURI(query))

        if (!paramString.includes("query"))
            paramString = paramString + "&query=" + encodeURI(query)



        let request: IHttpRequest = {
            RequestedURL: splitURL[0] + '?' + paramString,
            RequestedMethod: RequestType.GET,
        }
        console.log(request)
        try {
            let response = await this.orchestrator.defaultProcessRequest(request, true);

            if (response.ResponseCode === HttpStatusCode.OK) {
                return response.ResponseData.response;
            }
            if (response.ResponseCode === HttpStatusCode.NoContent) {
                return null
            }
        }
        catch (Error) {
            return null;
        }
    }

    SearchLocal(possibleValues: Array<string | object>, query: string): Array<FilterSuggestionModel> {

        let searchResult: Array<string | object> = possibleValues;

        if (query != null && query != undefined && query != '')
            searchResult = possibleValues.filter((x) =>
                x['entityName'] ? x['entityName'].toLowerCase().startsWith(query.toLowerCase()) :
                    x.toString().toLowerCase().startsWith(query.toLowerCase()));

        let returnable: Array<FilterSuggestionModel> = new Array()
        if (searchResult)
            for (let value of searchResult) {
                returnable.push(new FilterSuggestionModel(value));
            }

        return returnable;
    }
}