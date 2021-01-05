import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  private paramName: string;
  private maxDuration: number;
  private duration: number;
  private currentDate: Date;
  private endOfCurrentDate: number;

  constructor(
    public dialogRef: MatDialogRef<DateRangePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDateRangePicker,
    private datePipe: DatePipe, private dateFormBuilder: FormBuilder) {

    this.currentDate = new Date();

    this.endOfCurrentDate = new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth(), this.currentDate.getDate(), 23, 59, 59).getTime();

    this.maxDuration = data.maxDuration;
    this.paramName = data.paramName;
    this.startDate = data.startDate;
    this.endDate = data.endDate;

  }

  public dateForm: FormGroup;

  private startDate: Date = null;
  public get StartDate(): Date { return this.startDate; }
  public set StartDate(value: Date) {

    this.startDate = value;

    if (!value) { this.endDateDisabledSate.next(true); return; }

    if (value.getTime() < this.endOfCurrentDate) { this.endDateDisabledSate.next(false); }

    if (value.getTime() > this.endOfCurrentDate) { this.endDateDisabledSate.next(true); }

  }

  private endDate: Date = new Date(new Date().getTime());
  public get EndDate(): Date { return this.endDate; }
  public set EndDate(value: Date) {
    this.endDate = value;

    if (!this.endDate) { this.btnDisabledState.next(true); }

    if (this.endDate)
      this.btnDisabledState.next(false);

  }

  private endDateDisabledSate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public get EndDateDisabledSate(): BehaviorSubject<boolean> { return this.endDateDisabledSate; }

  private btnDisabledState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public get BtnDisabledState(): BehaviorSubject<boolean> { return this.btnDisabledState; }

  private dateRangeIsError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get DateRangeIsError(): BehaviorSubject<boolean> { return this.dateRangeIsError; }

  private dateRangeErrMsg: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public get DateRangeErrMsg(): BehaviorSubject<string> { return this.dateRangeErrMsg; }

  ngOnInit() {
    if(!this.StartDate && !this.EndDate){
      this.StartDate =  new Date(new Date().getTime());
      this.EndDate =  new Date(new Date().getTime());
    }
    this.dateForm = this.dateFormBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    }, { validator: this.mustValidateMaxDuration('startDate', 'endDate') });
  }

  mustValidateMaxDuration(startDateKey: string, endDateKey: string) {

    return (group: FormGroup) => {

      let _currentDateVal: number = Math.floor(new Date().getTime() / 1000);

      let _startDateVal: number = Math.floor(new Date(group.controls[startDateKey].value).getTime() / 1000);
      /**
       * check if `_startDateVal` is greater than `_currentDateVal`, than
       * raise an error `start date must not be greater than current date.`
       */
      if (_startDateVal > _currentDateVal) {
        this.triggerError(group, [startDateKey], true, "You have selected a future date.");
        return;
      }

      let _endDateVal: number = Math.floor(new Date(group.controls[endDateKey].value).getTime() / 1000);
      /**
       * check if `_endDateVal` is greater than `_currentDateVal`, than
       * raise an error `end date must not be greater than current date.`
       */
      if (_endDateVal > _currentDateVal) {
        this.triggerError(group, [endDateKey], true, "You have selected a future date.");
        return;
      }

      let _max: number = this.maxDuration;

      /**
       * validate that `endDateVal` must be greater than `startDateVal`, otherwise raise an 
       * error that `end date must not be less than the start date.`
       */
      if (_endDateVal > 0 && _endDateVal < _startDateVal) {
        this.triggerError(group, [startDateKey, endDateKey], true, "End date must not be less than the start date.");
        return;
      }

      /** calculate duration */
      let _duration: number = _endDateVal - _startDateVal;

      /**
       * validate that current calculated `_duration` must not be greater than `maxDuration`, otherwise 
       * raise an error that `you are allowed to see ${this.maxDuration / 86400} days of data.`
       */
      if (_duration > _max) {
        this.triggerError(group, [startDateKey, endDateKey], true,
          `you are allowed to see ${this.maxDuration / 86400} days of data.`);
        return;
      }
      this.triggerError(group, [startDateKey, endDateKey]);
      return null;
    }

  }

  /**
   * This function show error for the provided form `fieldKeys`.
   * 
   * @param group 
   * @param fieldKeys array of form field keys i.e formControl name.
   * @param isError holds boolean value `true` or `false`.
   * @param message message that to be displayed.
   */
  triggerError(group: FormGroup, fieldKeys: Array<string> = [],
    isError: boolean = false, message: string = null) {

    let _error: Object = isError ? { mustValidateMaxDuration: true } : null

    if (fieldKeys.length === 0)
      throw Error("No form fields key is passed.");

    for (var key of fieldKeys) { group.controls[key].setErrors(_error); }

    this.dateRangeErrMsg.next(message);
    this.dateRangeIsError.next(isError);

  }

  /** Reset date field */
  reset() { this.StartDate = new Date(new Date().getTime()); this.EndDate = new Date(new Date().getTime()); }

  /**
   * This function validate `duration` and build `paramString`
   */
  public async submit() {

    if (!this.dateForm.valid)
      return;

    let _startOfDate: number = Math.floor(new Date(this.StartDate.getFullYear(), this.StartDate.getMonth(),
      this.StartDate.getDate(), 0, 0, 0).getTime() / 1000);

    let _endOfDate: number = Math.floor(new Date(this.EndDate.getFullYear(), this.EndDate.getMonth(),
      this.EndDate.getDate(), 23, 59, 59).getTime() / 1000);

    this.duration = Math.floor(_endOfDate - _startOfDate);

    let FilterObject: Object = {
      paramString: `${this.paramName}=${_endOfDate}&startTimestamp=${_startOfDate}&duration=${this.duration}`,
      startDate: this.StartDate,
      endDate: this.EndDate
    };
    this.dialogRef.close(FilterObject);
  }

}

export interface IDateRangePicker { maxDuration: number, paramName: string, startDate: Date, endDate: Date }
