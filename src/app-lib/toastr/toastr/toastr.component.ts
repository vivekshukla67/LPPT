import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../Service/toastr.service';
import { Toast, ToastType } from '../toast';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  constructor(private toastService: ToastrService) { }

  /**
   * Subscribe the service on init. Works if any change occurs
   */
  ngOnInit() { this._subscription = this.toastService.onBehaviourChange().subscribe(toast => this._addToast(toast)); }

  mouseover(toast: Toast) {
    toast.timeout = 0;
    clearTimeout(this.timeout);
  }

  mouseout(toast: Toast) {
    setTimeout(() => {
      this.close(toast);
    }, 2000);
  }

  private timeout: any;

  /**
   * adds the Toast to the array.
   * 
   * @param toast It holds the modal given for the toasts and holds the value
   * and set the values through constructor.
   */
  _addToast(toast: Toast) {
    this.toasts.getValue().push(toast);
    if (toast.timeout !== 0) {
      this.timeout = setTimeout(() => {
        this.close(toast)
      }
        , toast.timeout);

    }

  }

  toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  private _subscription: Subscription;

  /**
   * Filters up the toasts array on the basis of toast Id.
   * 
   * @param toast It holds the modal given for the toasts and holds the value
   * and set the values through constructor.
   */
  close(toast: Toast) { this.toasts.next(this.toasts.getValue().filter(notif => notif.id !== toast.id)); }

  /**
   * add class in Html on the basis of toast type to be shown
   * 
   * @param toast It holds the modal given for the toasts and holds the value
   * and set the values through constructor.
   */
  className(toast: Toast): string { return toast.type; }

  /**
   * unsubscribe subscription on component Destroy
   */
  ngOnDestroy() { this._subscription.unsubscribe(); }

}
