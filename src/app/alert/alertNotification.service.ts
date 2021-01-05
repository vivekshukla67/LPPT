import { Injectable } from '@angular/core';
import {AlertType, NotificationType } from './alert.model';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AlertNotificationService {
    constructor(private alertService : AlertService){}

    notificationCaller(notificationType: string, message: string, alertType:string) {
       if(notificationType === NotificationType.toaster){
           this.alertCaller(message, alertType);
       }
       else{
           this.pushCaller();
       }
    }

    alertCaller(message: string, alertType : string){
        switch(alertType) { 
            case AlertType.success: { 
             this.alertService.success(message,AlertType.success)
               break; 
            } 
            case AlertType.error: { 
               this.alertService.error(message,AlertType.error)
               break; 
            } 
            case AlertType.info: {
               this.alertService.info(message,AlertType.info)
               break;    
            } 
            default: { 
               this.alertService.warn(message,AlertType.warning);
               break;              
            } 
   }
}
    pushCaller(){
        return;
    }
}