import { NotificationIcon, ToastTypeEnum, NotificationTemplate, NotificationHandler } from "../../Enums/Enums";
import { NotificationCR } from "./NotificationCR";
import { Type, Injectable } from "@angular/core";
import { INotify } from "./INotify";
import { NotificationDrawer } from "./NotificationDrawer";
import { ToastrService } from "src/app-lib/toastr/Service/toastr.service";

export interface INotificationOptions {

    TimeOut?: number;

    ExtendedTimeOut?: number;

    DisableTimeOuts?: boolean;

    MaximumToasts?: number;

    EaseTime?: number;

}

export interface INotificationService {

    /**
     * Trigger notification service.
     * 
     * @param icon icon for the notification.
     * @param title title for the notification.
     * @param description description of notification.
     * @param type type of notification ( Success, Info, Warning, Error).
     * @param template type of custom template to be shown.
     * @param showAs trigger notification as (PopUp, Drawable, Toastr).
     */
    Show(title: string,
        description: string, type: ToastTypeEnum, showAs: NotificationHandler): void;

}

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements INotificationService {

    constructor() { }

    async Show(title: string, description: string, type: ToastTypeEnum, showAs: NotificationHandler) {

        let notifier: INotify = null;
        switch (showAs) {

            case NotificationHandler.Toastr:
                notifier = ToastrService.GetInstance();
                break;
            case NotificationHandler.Drawable:
                notifier = new NotificationDrawer();
                break;
            default:
                throw new Error("Could not resolve the handler!");
        }

        notifier.Show(title, description, type);

    }

    /**
     * Resolve the customTemplate & return the component reference of passed template.
     * 
     * @param customTemplate custom template name.
     */
    private async NotificationTemplateResolver(customTemplate: string): Promise<Type<any>> {

        let componentRef: Type<any> = NotificationCR.GetInstance().GetComponentRef(customTemplate);

        return componentRef;

    }

}
