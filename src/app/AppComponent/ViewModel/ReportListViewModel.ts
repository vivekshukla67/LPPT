import { Injectable } from "@angular/core";
import { BaseAppHandler } from 'src/app-lib/shared/BaseViewModel';
import { IReportService, ReportService } from '../Service/ReportService';
import { ToastTypeEnum, NotificationHandler, ViewStateEnum } from 'src/app/shared/Enums/Enums';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/shared/Services/Notification/NotificationService';

@Injectable()
export class ReportListViewModel {
    private reportService: IReportService;

    constructor(public notificationService: NotificationService) {
        this.reportService = new ReportService();
    }
    get ViewStateEnum() {
        return ViewStateEnum;
    }

    public ReportList = new BehaviorSubject(Array<object>());
    public ShowReportList = new BehaviorSubject(Array<object>());

    public reportListViewState: BehaviorSubject<ViewStateEnum> = new BehaviorSubject<ViewStateEnum>(ViewStateEnum.Loading);
    public get ReportListViewState(): BehaviorSubject<ViewStateEnum> {
        return this.reportListViewState;
    }

    
    private reportListErrMsg: string;
    public get ReportListErrMsg(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.reportListErrMsg);
    }

    public async getReportList(page: number, perPage: number) {
        let apiResponse = await this.reportService.GetAllReportsFromServerAsync(page, perPage);
        this.reportListViewState.next(ViewStateEnum.Loading);
        if (!apiResponse.isError) {
            if (!apiResponse.content) {
                this.ReportList.next([]);
                this.ReportList = new BehaviorSubject<Array<object>>(null);
                this.reportListViewState.next(ViewStateEnum.NoContent);
                this.reportListErrMsg = apiResponse.errorMessage;
                document.getElementById("demo").innerHTML = "No Content Found";
                return;
            }
            else {
                this.ReportList.next(apiResponse.content['response']);
                this.ShowReportList.next(apiResponse.content['response']);
                this.filterReportGroup(this.ReportList.getValue())
                this.reportListViewState.next(ViewStateEnum.Loaded);
            }
        }
        else{
            this.ReportList.next([]);
            this.reportListViewState.next(apiResponse.statusCode);
            this.notificationService.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
            return false;
        }
    }

    public reportGroups: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    filterReportGroup(reportList: Array<object>) {
        let set = new Set();
        reportList.forEach(data => {
            set.add(data['reportGroup']);
        });
        this.reportGroups.next(Array.from(set));
    }

}