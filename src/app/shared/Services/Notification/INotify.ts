import { ToastTypeEnum } from "../../Enums/Enums";

export interface INotify {

    /**
    * Trigger notification service.
    * 
    * @param icon icon for the notification.
    * @param title title for the notification.
    * @param description description of notification.
    * @param type type of notification ( Success, Info, Warning, Error).
    * @param templateRef type of custom template to be shown.
    */
    Show(title: string, description: string, type: ToastTypeEnum): void;

}