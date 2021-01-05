import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Toast, ToastType, IconType, Position } from "../toast";
import { INotify } from "src/app/shared/Services/Notification/INotify";
import { ToastTypeEnum } from "src/app/shared/Enums/Enums";

@Injectable({
    providedIn: 'root'
})

export class ToastrService implements INotify {

    private static _instance = new ToastrService();
    public static GetInstance() {
        return this._instance
    }

    constructor() {
        ToastrService._instance = this;
    }

    private _idx = 0;
    private subject = new Subject<Toast>();


    Show(title: string, description: string, type: ToastTypeEnum) {

        switch (type) {
            case ToastTypeEnum.Success:
                this.success(title, description);
                break;
            case ToastTypeEnum.Info:
                this.info(title, description);
                break;
            case ToastTypeEnum.Warning:
                this.warning(title, description);
                break;
            case ToastTypeEnum.Error:
                this.error(title, description);
                break;
            default:
                throw Error("ToastTypeEnum not implemented !");
        }
    }


    onBehaviourChange(): Observable<Toast> {
        return this.subject.asObservable();
    }

    info(title: string, message: string, timeout = 5000) {
        this.subject.next(new Toast(this._idx++, ToastType.info, IconType.info, title, message, timeout, Position.TopRight));
    }

    success(title: string, message: string, timeout = 5000) {
        this.subject.next(new Toast(this._idx++, ToastType.success, IconType.success, title, message, timeout, Position.TopRight));
    }

    warning(title: string, message: string, timeout = 5000) {
        this.subject.next(new Toast(this._idx++, ToastType.warning, IconType.warning, title, message, timeout, Position.TopRight));
    }

    error(title: string, message: string, timeout = 5000) {
        this.subject.next(new Toast(this._idx++, ToastType.error, IconType.error, title, message, timeout, Position.TopRight));
    }

}