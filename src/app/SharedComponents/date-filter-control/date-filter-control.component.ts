import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { DateFilter } from './Models/FilterModel';
import { Filters } from '../filter-control/Models/FilterModel';

@Component({
  selector: 'app-date-filter-control',
  templateUrl: './date-filter-control.component.html',
  styleUrls: ['./date-filter-control.component.scss']
})
export class DateFilterControlComponent implements OnInit {

  @Output() filterValueChanged: EventEmitter<Map<string, string>>;

  constructor(public dialog: MatDialog) { this.filterValueChanged = new EventEmitter(); }

  private filterContext: Filters;
  public get FilterContext(): Filters { return this.filterContext; }

  private startDate: Date;
  public get StartDate(): Date { return this.startDate; }
  public set StartDate(value: Date) { this.startDate = value; }

  private endDate: Date;
  public get EndDate(): Date { return this.endDate; }
  public set EndDate(value: Date) { this.endDate = value; }

  @Input() public set FilterContext(value: Filters) { this.filterContext = Object.assign(new DateFilter(), value); }

  ngOnInit() { }

  openDateRangePicker() {

    let _data: IDateRangePicker = {
      maxDuration: this.FilterContext.MaxDuration,
      paramName: this.FilterContext.ParamName,
      startDate: this.StartDate,
      endDate: this.EndDate
    }

    const dateRangeRef = this.dialog.open(DateRangePickerComponent, { width: '300px', data: _data });

    dateRangeRef.afterClosed().subscribe(result => {
      if (result) {
        let obj: Map<string, string> = new Map<string, string>();
        obj.set("key", this.FilterContext.ParamName)
        obj.set("value", result.paramString)

        this.filterValueChanged.emit(obj);
        this.StartDate = result.startDate;
        this.EndDate = result.endDate;
      }
    });
  }

}

export interface IDateRangePicker { maxDuration: number, paramName: string, startDate: Date, endDate: Date }

