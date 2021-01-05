import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IReportService, ReportService } from '../Service/ReportService';
import { ToastTypeEnum, NotificationHandler, ViewStateEnum } from 'src/app/shared/Enums/Enums';
import { NotificationService } from 'src/app/shared/Services/Notification/NotificationService';
import { AlertNotificationService } from 'src/app/alert/alertNotification.service';
import { NotificationType } from 'src/app/alert';
import { AlertType } from 'src/app/alert/alert.model';

@Injectable({
    providedIn: 'root',
})
export class ReportFormViewmodel {
    [x: string]: any;
    private reportService: IReportService;
    constructor(private notification: NotificationService, private alertNotification :AlertNotificationService) {
        this.reportService = new ReportService();
    }

    public get ViewStateEnum() {
        return ViewStateEnum;
    }
    public formDataState: BehaviorSubject<ViewStateEnum> = new BehaviorSubject<ViewStateEnum>(null);
    public get FormDataState(): BehaviorSubject<ViewStateEnum> {
        return this.formDataState;
    }
    public formErrMsg: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public get FormErrMsg(): BehaviorSubject<string> {
        return this.formErrMsg;
    }
  
    private reportObject: BehaviorSubject<object> = new BehaviorSubject<object>(undefined);
    private formPrefilled: BehaviorSubject<object> = new BehaviorSubject<object>(undefined);
    public get FormPrefilled(): BehaviorSubject<object> {
        return this.formPrefilled;
    }
    public set FormPrefilled(val: BehaviorSubject<object>) {
        this.formPrefilled.next(val.getValue());
    }
    public get ReportObject(): BehaviorSubject<object> {
        return this.reportObject;
    }
    public set ReportObject(value: BehaviorSubject<object>) {
        this.reportObject.next(value.getValue());
    }

    private dbname: string;
    public get dbName(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.dbname);
    }
    public set dbName(val: BehaviorSubject<string>) {
        this.dbname = val.getValue();
    }

    private dbtype: string;
    public get dbType(): BehaviorSubject<string> {
        return new BehaviorSubject<string>(this.dbtype);
    }
    public set dbType(val: BehaviorSubject<string>) {
        this.dbtype = val.getValue();
    }

    public async getForm(data: Object) {
        this.dbname = data['dbName'];
        this.dbtype = data['dbType'];
    }

    public async getReportDataById(id: string) {
        let apiResponse = await this.reportService.GetVisualizationFromServerAsync(id);
        if (!apiResponse.isError) {
            if (!apiResponse.content) {
                this.FormPrefilled.next(undefined);
                this.ReportObject.next(undefined);
            }
            else {
                this.FormPrefilled.next(apiResponse.content);
                this.ReportObject.next(apiResponse.content);
            }
        }
        if (apiResponse.isError) {
            this.FormPrefilled.next(undefined);
            this.ReportObject.next(undefined);
            this.notificationService.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
        }
        return apiResponse.content;
    }

    private createFormObj = new BehaviorSubject(Array<object>());
    formObject = this.createFormObj.asObservable();

    getObject(createFormObj: any) {
        this.createFormObj.next(createFormObj);
    }

    async submitForm(formData: any) {
        this.formDataState.next(ViewStateEnum.Loading);
        let apiResponse = await this.reportService.CreateReportFromServerAsync(formData);

        if (!apiResponse.isError) {
            this.formDataState.next(ViewStateEnum.Loaded);
            this.notification.Show(null, 'Form Successfully Created', ToastTypeEnum.Success, NotificationHandler.Toastr);
            this.alertNotification.notificationCaller(NotificationType.toaster,"Successfully Created !!",AlertType.success)
        }

        if (apiResponse.isError) {
            this.formDataState.next(apiResponse.statusCode);
            this.formErrMsg.next(apiResponse.errorMessage);
            this.notification.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
            this.alertNotification.notificationCaller(NotificationType.toaster,apiResponse.errorMessage,AlertType.error)
        }
        return apiResponse.isError;
    }

    public async updateForm(formUpdateData: any) {
        this.formDataState.next(ViewStateEnum.Loading);
        let apiResponse = await this.reportService.UpdateReportFromServerAsync(formUpdateData, this.reportId)

        if (!apiResponse.isError) {
            this.formDataState.next(ViewStateEnum.Loaded);
            this.notification.Show(null, 'Form Successfully Updated', ToastTypeEnum.Success, NotificationHandler.Toastr);
            this.alertNotification.notificationCaller(NotificationType.toaster,"Successfully Updated !!",AlertType.success)
        }

        if (apiResponse.isError) {
            this.formDataState.next(apiResponse.statusCode);
            this.formErrMsg.next(apiResponse.errorMessage);
            this.notification.Show(null, apiResponse.errorMessage, ToastTypeEnum.Error, NotificationHandler.Toastr);
            this.alertNotification.notificationCaller(NotificationType.toaster,apiResponse.errorMessage,AlertType.error)
        }
        return apiResponse.isError;
    }

}