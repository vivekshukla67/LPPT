import { ServiceResponse } from "src/app/shared/Model/APIResponses";
import { Orchestrator } from "src/app-lib/config/Orchestrator";
import { RequestType, HttpStatusCode, ConnectionType, APIVersion } from "src/lib/APIService/Shared/Utility/Enums";
import { BaseErrorHandler } from "src/app-lib/Helpers/Utility/BaseErrorHandler";
import { IAPIOptions } from "src/lib/APIService/Shared/Utility/ComponentModels";
import { StorageHighLevelService } from "src/app-lib/WebStorage/StorageHighLevelService";
import { reportsConcreteBuilder, reportsRegionsConcreteBuilder } from '../Builder/ReportBuilder';

export interface IReportService {

    /**
     * Fetch all projects
     * @param page page index to be query for.
     * @param perPage limit per page data.
     */
    GetAllReportsFromServerAsync(page: number, perPage: number): Promise<ServiceResponse<Array<object>>>;

    /**
     * Create Report
     * @param details 
     */
    CreateReportFromServerAsync(details: Array<object>): Promise<ServiceResponse<Array<object>>>;
    /**
     * Fetch  report by id
    * @param reportId
     */
    UpdateReportFromServerAsync(details: Array<object>, reportId: string): Promise<ServiceResponse<Array<object>>>;
    /**
    * Fetch  report by id
   * @param reportId
    */
    GetVisualizationFromServerAsync(reportId): Promise<ServiceResponse<Array<object>>>;
    /**
     * Fetch reports
    * @param reportId
     */
    GetVisualizationRecordFromServerAsync(reportId: string, vType?: string, filtersQuery?: string, pageNo?: number, perPage?: number): Promise<ServiceResponse<Array<object>>>

}

export class ReportService extends BaseErrorHandler implements IReportService {

    private orchestrator: Orchestrator;
    private accountId: string;
    constructor() {
        super();
        this.orchestrator = Orchestrator.GetInstance();
        // this.accountId = StorageHighLevelService.GetInstance().UserInfo.AccountId;
    }


    async GetAllReportsFromServerAsync(page: number, perPage: number): Promise<ServiceResponse<object[]>> {
        try {
            let apiOptions: IAPIOptions = {
                Parameters: new Map([
                    ['pageNo', page.toString()],
                    ['perPage', perPage.toString()],
                ])
            }
            let apiResponse = await this.orchestrator.processRequest(new reportsConcreteBuilder(),
                apiOptions, RequestType.GET);

            if (apiResponse.ResponseCode === HttpStatusCode.OK)
                return { content: apiResponse.ResponseData, errorMessage: null, isError: false }

            if (apiResponse.ResponseCode === HttpStatusCode.NoContent) {
                let errorData = BaseErrorHandler.parseError(HttpStatusCode.NoContent);
                return {
                    content: null, isError: false, errorMessage: errorData.errorMessage,
                    statusCode: HttpStatusCode.NoContent
                };
            }
        } catch (Error) {
            let errorData = BaseErrorHandler.parseError(Error.status, Error.error);
            return { isError: true, errorMessage: errorData.errorMessage, statusCode: Error.status }
        }
    }

    async GetVisualizationFromServerAsync(reportId: string): Promise<ServiceResponse<Array<object>>> {
        try {
            let apiOptions: IAPIOptions = {
                ResourceID: reportId
            }
            let apiResponse = await this.orchestrator.processRequest(new reportsConcreteBuilder(),
                apiOptions, RequestType.GET);

            if (apiResponse.ResponseCode === HttpStatusCode.OK)
                return { content: apiResponse.ResponseData, errorMessage: null, isError: false }

            if (apiResponse.ResponseCode === HttpStatusCode.NoContent) {
                let errorData = BaseErrorHandler.parseError(HttpStatusCode.NoContent);
                return {
                    content: null, isError: false, errorMessage: errorData.errorMessage,
                    statusCode: HttpStatusCode.NoContent
                };
            }
        } catch (Error) {
            let errorData = BaseErrorHandler.parseError(Error.status, Error.error);
            return { isError: true, errorMessage: errorData.errorMessage, statusCode: Error.status }
        }
    }

    async GetVisualizationRecordFromServerAsync(reportId?: string, vType?: string, filtersQuery?: string, pageNo: number = 1, perPage: number = 10): Promise<ServiceResponse<Array<object>>> {
        try {
            let apiOptions: IAPIOptions = {
                ResourceID: reportId,
        //         Parameters: (vType === 'DataGrid' && filtersQuery) ? new Map([
        //             ['vType', vType],
        //             ['filter', filtersQuery],
        //             ['pageNo', pageNo.toString()],
        //             ['perPage', perPage.toString()]
        //         ]) : (
        //             (filtersQuery) ? new Map([
        //                 ['filter', filtersQuery],
        //                 ['vType',vType],
        //             ]) : new Map([
        //                 ['vType',vType]
        //             ])
        //         )
        //    }
        Parameters: (vType === 'DataGrid' && filtersQuery) ? new Map([
                        ['vType', vType],
                        ['filter', filtersQuery],
                        ['pageNo', pageNo.toString()],
                        ['perPage', perPage.toString()]
                    ]) : (
                        (filtersQuery) ? new Map([
                            ['filter', filtersQuery],
                            ['vType',vType],
                        ]) :(vType == 'DataGrid') ? new Map([
                            ['vType',vType],
                            ['pageNo', pageNo.toString()],
                            ['perPage', perPage.toString()]
                        ]) : new Map([
                            ['vType',vType]
                        ])
                    )
               }
            let apiResponse = await this.orchestrator.processRequest(new reportsRegionsConcreteBuilder(),
                apiOptions, RequestType.GET);

            if (apiResponse.ResponseCode === HttpStatusCode.OK)
                return { content: apiResponse.ResponseData, errorMessage: null, isError: false }

            if (apiResponse.ResponseCode === HttpStatusCode.NoContent) {
                let errorData = BaseErrorHandler.parseError(HttpStatusCode.NoContent);
                return {
                    content: null, isError: false, errorMessage: errorData.errorMessage,
                    statusCode: HttpStatusCode.NoContent
                };
            }

        } catch (Error) {
            let errorData = BaseErrorHandler.parseError(Error.status, Error.error);
            return { isError: true, errorMessage: errorData.errorMessage, statusCode: Error.status }
        }
    }

    async CreateReportFromServerAsync(details: object[]): Promise<ServiceResponse<object[]>> {

        let apiOptions: IAPIOptions = {
            ConnectionType: ConnectionType.https,
            APIVersion: APIVersion.LatestStable,
            Headers: new Map([
                ['Content-Type', 'application/json']
            ]),
            Body: JSON.stringify(details)
        }
        try {
            let apiResponse = await this.orchestrator.processRequest(new reportsConcreteBuilder(),
                apiOptions, RequestType.POST);

            if (apiResponse.ResponseCode === HttpStatusCode.Created)
                return { content: apiResponse.ResponseData, errorMessage: null, isError: false }
        }

        catch (Error) {
            let errorData = BaseErrorHandler.parseError(Error.status, Error.error);
            return { isError: true, errorMessage: errorData.errorMessage, statusCode: Error.status }
        }
    }

    async UpdateReportFromServerAsync(details: object[], reportId: string): Promise<ServiceResponse<object[]>> {

        let apiOptions: IAPIOptions = {
            ResourceID: reportId,
            Headers: new Map([
                ['Content-Type', 'application/json']
            ]),
            Body: JSON.stringify(details)
        }
        try {
            let apiResponse = await this.orchestrator.processRequest(new reportsConcreteBuilder(),
                apiOptions, RequestType.PUT);

            if (apiResponse.ResponseCode === HttpStatusCode.OK)
                return { content: apiResponse.ResponseData, errorMessage: null, isError: false }
        }
        catch (Error) {
            let errorData = BaseErrorHandler.parseError(Error.status, Error.error);
            return { isError: true, errorMessage: errorData.errorMessage, statusCode: Error.status }
        }
    }

}