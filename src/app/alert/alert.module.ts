import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { AlertNotificationService } from './alertNotification.service';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponent],
    exports: [AlertComponent, ]
})
export class AlertModule { }