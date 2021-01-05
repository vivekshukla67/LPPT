import { Injectable } from '@angular/core';
import { ReportService, IReportService } from '../Service/ReportService';
import { BehaviorSubject, empty } from 'rxjs';
import { NotificationService } from 'src/app/shared/Services/Notification/NotificationService';
import { ToastTypeEnum, NotificationHandler, ViewStateEnum } from 'src/app/shared/Enums/Enums';
import { Orchestrator } from 'src/app-lib/config/Orchestrator';
import * as mapChartControl from 'pranjali';
import { DummyData } from 'src/assets/dummyData';
import * as _ from 'lodash';
import { Theme } from 'src/app-lib/themes/theme';
import { utf8Encode } from '@angular/compiler/src/util';

@Injectable()

export class VisualizationViewModel {
    private visualizationService: IReportService;
    public reportId: string;
    public vType: string;
    // public queryFilters: string;
    public FilterList: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
    public visualizationDetail: BehaviorSubject<object> = new BehaviorSubject<Array<object>>([]);
    public chartType: BehaviorSubject<object> = new BehaviorSubject<object>(undefined);
    public visualType: BehaviorSubject<object> = new BehaviorSubject<object>(undefined);

    public visualisationType
    
    constructor(public notificationService: NotificationService, private dummyData: DummyData) {
        this.visualizationService = new ReportService();
    }

    get ViewStateEnum() {
        return ViewStateEnum;
    }

    private elementReference: string = "map";
    public get ElementReference(): string {
        return this.elementReference;
    }
    public set ElementReference(value: string) {
        this.elementReference = value;
    }

    private queryFilters: string;
    public get QueryFilters(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.queryFilters);
    }

    private visualizationViewState: BehaviorSubject<ViewStateEnum> = new BehaviorSubject<ViewStateEnum>(ViewStateEnum.Loading);
    public get VisualizationViewState(): BehaviorSubject<ViewStateEnum> {
        return this.visualizationViewState;
    }

    private viewsualizationErrMsg: string;
    public get ViewsualizationErrMsg(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.viewsualizationErrMsg);
    }

    private supportedVisuals: Array<string> = new Array<string>();
    public get SupportedVisuals(): BehaviorSubject<Array<string>> {
        return new BehaviorSubject<Array<string>>(this.supportedVisuals);
    }

    private downloadLink: string = null;
    public get DownloadLink(): string {
        return this.downloadLink;
    }

    public paramStore: Map<string, string> = new Map<string, string>();

    private paginationNumber= new BehaviorSubject<number>(null);
    public get PaginationNumber(): BehaviorSubject<number> {
        return this.paginationNumber;
    }

    private pageVisual: string = null;
    public get PageVisual(): string {
        return this.pageVisual;
    }

    async getVisualizationById(reportId: string) {
        let apiResponse = await this.visualizationService.GetVisualizationFromServerAsync(reportId);
        if (!apiResponse.isError) {
            if (!apiResponse.content) {
                this.visualizationDetail = new BehaviorSubject<Array<object>>(null);
                return;
            }
            else {
                this.visualizationDetail.next(apiResponse.content);
                this.FilterList.next(apiResponse.content['reportFilters']);
            }
        }
        if (apiResponse.isError) {
            this.visualizationDetail.next([])
            this.notificationService.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
            return false;
        }
    }

    async getVisualizationRecordById(reportId: string, vType?: string, filtersQuery ?: string, pageNo?: number, perPage?: number) {
        this.queryFilters = filtersQuery
        document.getElementById("map").innerHTML = " ";
        this.paramStore = new Map<string, string>();
        let apiResponse = await this.visualizationService.GetVisualizationRecordFromServerAsync(reportId, vType, filtersQuery, pageNo ,perPage);
        this.visualizationViewState.next(ViewStateEnum.Loading);
        if (!apiResponse.isError) {
            if (!apiResponse.content) {
                this.visualType = new BehaviorSubject<Array<object>>(null);
                this.visualizationViewState.next(ViewStateEnum.NoContent);
                this.viewsualizationErrMsg = apiResponse.errorMessage;
                this.visualizationViewState.next(ViewStateEnum.Error);
            }
            else {
                this.visualizationViewState.next(ViewStateEnum.Loaded);
                this.visualType.next(apiResponse.content)
                document.getElementById("map").innerHTML = " ";
                this.chartType = this.visualType.getValue()["supportedVisuals"].filter(x => x != this.visualType.getValue()["visualization"]);
                this.paginationNumber.next(apiResponse.content['pagination']);
                this.pageVisual = apiResponse.content['visualization']
                await this.mapChartControl();
                return apiResponse.content;
            }
        }
        if (apiResponse.isError) {
            this.visualType.next([]);
            this.visualizationViewState.next(apiResponse.statusCode);
            this.viewsualizationErrMsg = apiResponse.errorMessage;
            this.notificationService.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
            if (this.visualizationViewState.getValue() == 0) {
                document.getElementById("disconnect").innerHTML = "No Internet Connection";
            }
            else {
                document.getElementById("something").innerHTML = "Something is not Right";
            }
            return;
        }
    }

    private async mapChartControl() {
        var mapData = this.dummyData.dummyDataCovid.dataPoints[0]
        // var mapArray = ["Map","HeatMap","MapCluster","State","District"," GeoAnalytics","Line","DataGrid","VBar","HBar","Pie"];
    if(this.visualType.getValue()["visualization"] == "Map"){
                let access_token;
                await Orchestrator.GetInstance().attachToken("a").then((res => {
                  access_token = res.replace('a?access_token=', '');
                }));
                let params = {
                  elementRef: document.getElementById("map"),
                  MapData: this.dummyData.dummyDataCovid.dataPoints[0],
                  access_token: access_token,
                  heatmap: true,
                }
                new mapChartControl.InitialiseControl('Map', params)
    }
    else {
        let params;
        if (this.visualisationType.name === 'light') {
            params = {
                elementRef: document.getElementById('map'),
                chartType: this.visualType.getValue()["visualization"],
                ChartData: this.visualType.getValue(),
                chartOptions: {
                    BgColor: 'white',
                    HAxisGridlineColor: 'black',
                    HAxisTextColor: 'black',
                    HAxisTitleColor: 'black',
                    LegendTextColor: 'black',
                    VAxisGridlineColor: 'black',
                    VAxisTextColor: 'black',
                    VAxisTitleColor: 'black',
                    crosshairColor: 'black'
                }
            }
        }
        else{
            params = {
                elementRef: document.getElementById('map'),
                chartType: this.visualType.getValue()["visualization"],
                ChartData: this.visualType.getValue(),
                chartOptions: {
                    BgColor: '#2a3142',
                    HAxisGridlineColor: 'white',
                    HAxisTextColor: 'white',
                    HAxisTitleColor: 'white',
                    LegendTextColor: 'white',
                    VAxisGridlineColor: 'white',
                    VAxisTextColor: 'white',
                    VAxisTitleColor: 'white',
                    crosshairColor: 'white'
                }
            }
        }

        new mapChartControl.InitialiseControl('Chart', params)
    }
}
}
